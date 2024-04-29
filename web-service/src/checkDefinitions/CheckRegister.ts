import { APICheck, APICheckConfig, APICheckResult } from "itrm-tools";
import { Request } from "express";

export interface CheckerConfig extends APICheckConfig {
  email: RegExp;
  password: RegExp;
}

export class RegistrationValidations implements APICheck {
  getConfig(): CheckerConfig {
    return {
      check: "",
      email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      password:
        /^(?=.*[A-Za-záéíóúÁÉÍÓÚüÜñÑ])(?=.*\d)[A-Za-z\dáéíóúÁÉÍÓÚüÜñÑ\s!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~]{8,}$/,
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
          payload: { error: "email and password is required" },
        },
      };
    }
    if (!config.email.test(email)) {
      return {
        approved: false,
        rejection: {
          code: 402,
          payload: {
            error: "enter a valid email.",
          },
        },
      };
    }
    if (!config.password.test(password)) {
      return {
        approved: false,
        rejection: {
          code: 402,
          payload: {
            message:
              "the password must be at least 8 characters and contain at least one letter and at least one digit",
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

export const registrationValidations = new RegistrationValidations();
