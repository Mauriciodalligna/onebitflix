import { NextFunction, Request, Response } from "express";
import { jwtService } from "../services/jwtService";
import { userService } from "../services/userService";
import { JwtPayload } from "jsonwebtoken";
import { UserInstance } from "../models/User";

export interface AuthenticatedRequest extends Request {
  user?: UserInstance | null;
}

export function ensureAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({ message: "Não autorizado." });
  }

  const token = authorizationHeader.replace(/Bearer\s/, "");

  jwtService.verifyToken(token, async (err, decoded) => {
    if (err || typeof decoded === "undefined") {
      return res
        .status(401)
        .json({ message: "Não autorizado: token invalido." });
    }

    try {
      const user = await userService.findByEmail((decoded as JwtPayload).email);
      if (!user) {
        return res.status(401).json({ message: "Usuário não encontrado." });
      }
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Erro ao verificar usuário." });
    }
  });
}
export function ensureAuthViaQuery(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { token } = req.query

  if (!token) {
    return res.status(401).json({ message: 'Não autorizado: nenhum token encontrado' })
  }

  if (typeof token !== 'string') {
    return res.status(400).json({ message: 'O parâmetro token deve ser do tipo string' })
  }

  jwtService.verifyToken(token, (err, decoded) => {
    if (err || typeof decoded === 'undefined') {
      return res.status(401).json({ message: 'Não autorizado: token inválido' })
    }

    userService.findByEmail((decoded as JwtPayload).email).then(user => {
      req.user = user
      next()
    })
  })
}