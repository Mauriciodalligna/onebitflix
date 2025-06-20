import jwt from "jsonwebtoken";
import { JWT_KEY } from "../config/environment";

export const jwtService = {
  signToken: (payload: string | object | Buffer) => {
    return jwt.sign(payload, JWT_KEY, { expiresIn: "7d" });
  },

  verifyToken: (token: string, callbackfn: jwt.VerifyCallback) => {
    jwt.verify(token, JWT_KEY, callbackfn);
  },
};
