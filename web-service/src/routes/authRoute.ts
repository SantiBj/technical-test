import { Request, Response } from "express";
import {
  CheckablePostRequest,
  ITRMAPIServiceGlobal,
  RequestContext,
  RequestParameterType,
  SimpleCheckableAPIRouter,
} from "itrm-tools";
import { createToken } from "../service/jwt.service";
import { User, UserType } from "../../database/models";
import { hashPassword, passwordValidation } from "../service/password.service";
import { registrationValidations } from "../checkDefinitions/CheckRegister";
import { signInValidations } from "../checkDefinitions/CheckSignIn";
import { registerSamples, signInSamples } from "../documentation/auth";

class RegisterRequest extends CheckablePostRequest {
  constructor() {
    super({
      path: "/register",
      params: [
        {
          context: RequestContext.BODY,
          properties: [
            { name: "email", type: RequestParameterType.STRING },
            { name: "password", type: RequestParameterType.STRING },
          ],
        },
      ],
      details: {
        description: "user login",
        samples: registerSamples,
      },
    });
  }

  async apply(req: Request, res: Response): Promise<any> {
    try {
      const { email, password } = req.body;
      const existingUser: UserType[] = await User.findAll({
        where: { email },
      });

      if (existingUser.length > 0) {
        return res.status(400).json({
          error: "the user already exists.",
        });
      }

      const hashedPassword = await hashPassword(password);
      const newUser: UserType = await User.create({
        email,
        password: hashedPassword,
      });

      return res.status(201).json({
        message: "successful registered user.",
        token: createToken(newUser.userId!),
      });
    } catch (error) {
      console.error("error interno: ", error);
      res.status(500).json({
        error: "internal server error.",
      });
    }
  }
}

class SignInRequest extends CheckablePostRequest {
  constructor() {
    super({
      path: "/signIn",
      params: [
        {
          context: RequestContext.BODY,
          properties: [
            { name: "email", type: RequestParameterType.STRING },
            { name: "password", type: RequestParameterType.STRING },
          ],
        },
      ],
      details: {
        description: "user login",
        samples: signInSamples,
      },
    });
  }

  async apply(req: Request, res: Response): Promise<any> {
    const { email, password } = req.body;

    try {
      let users: UserType[] = await User.findAll({
        where: { email },
      });

      if (users.length == 0) {
        return res.status(400).json({
          error: "User not found",
        });
      }

      const user = users[0];

      const validPassword = await passwordValidation(password, user.password);
      if (!validPassword) {
        return res.status(401).json({
          error: "invalid credentials",
        });
      }

      return res.status(200).json({
        token: createToken(user.userId!),
      });
    } catch (error) {
      console.error("error interno: ", error);
      res.status(500).json({
        error: "internal server error.",
      });
    }
  }
}

export const authRouter = new SimpleCheckableAPIRouter("/auth");
authRouter.init();
const registerRoute = new RegisterRequest();
registerRoute.addCheck(registrationValidations);

const signInRoute = new SignInRequest();
signInRoute.addCheck(signInValidations);

authRouter.addRequest(registerRoute);
authRouter.addRequest(signInRoute);
