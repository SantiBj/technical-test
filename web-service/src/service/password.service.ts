import * as bcrypt from "bcrypt";
import * as dotenv from "dotenv";

dotenv.config();
const NUMBER_TURNS: number = parseInt(process.env.NUMBER_TURNS!);

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, NUMBER_TURNS);
};

export const passwordValidation = async (
  passwordRequest: string,
  passwordUser: string
): Promise<boolean> => {
  return bcrypt.compare(passwordRequest, passwordUser);
};
