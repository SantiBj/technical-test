import { APICheck, APICheckConfig, APICheckResult } from "itrm-tools";
import { Request } from "express";

export interface CheckerConfig extends APICheckConfig {
  email: RegExp;
  password: number;
}

export class SignInValidations implements APICheck {
  getConfig(): CheckerConfig {
    return {
      check: "",
      email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      password: 8,
    };
  }

  public async apply(
    config: CheckerConfig,
    req: Request
  ): Promise<APICheckResult> {
    const { email, password } = req.body;

    if (!email || !password) {
      return {
        approved: false,
        rejection: {
          code: 402,
          payload: { message: "email and username is required" },
        },
      };
    }
    if (!config.email.test(email)) {
      return {
        approved: false,
        rejection: {
          code: 402,
          payload: {
            message: "enter a valid email.",
          },
        },
      };
    }
    if (password.trim().length < config.password) {
      return {
        approved: false,
        rejection: {
          code: 402,
          payload: {
            message: "the password must contain at least 8 characters",
          },
        },
      };
    }
    return {
      approved: true,
      payload: "the password and usury email meet the validations",
    };
  }
}

export const signInValidations = new SignInValidations();
