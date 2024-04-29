import { sign } from "jsonwebtoken"
import * as dotenv from "dotenv";



dotenv.config();
export const SECRET_KEY: string = process.env.SECRET_KEY!;
const TOKEN_EXPIRATION:string = process.env.TOKEN_EXPIRATION!

export const createToken = (userId:number):string=>{
    return sign({ userId },SECRET_KEY,{
        expiresIn:TOKEN_EXPIRATION
    })
}


