// src/controllers/authController.ts

import { Request, Response } from "express";
import { userService } from "../services/userService";
import { jwtService } from "../services/jwtService";

export const authController = {
  // POST /auth/register
  register: async (req: Request, res: Response) => {
    const { first_name, last_name, phone, birth, email, password } = req.body;

    try {
      const userAlreadyExists = await userService.findByEmail(email);

      if (userAlreadyExists) {
        throw new Error("Este e-mail já está cadastrado.");
      }

      const user = await userService.create({
        firstName: first_name,
        lastName: last_name,
        phone,
        birth,
        email,
        password,
        role: "user",
      });

      return res.status(201).json(user);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },

  //POST/auth/login
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const user = await userService.findByEmail(email);
      if (!user)
        return res.status(404).json({ message: "Usuário não encontrado." });

      user.checkPassword(password, (err, isSame) => {
        if (err)
          return res.status(400).json({ message: "Erro ao verificar senha." });
        if (!isSame)
          return res
            .status(401)
            .json({ message: "E-mail ou senha inválidos." });

        const payload = {
          id: user.id,
          firstName: user.firstName,
          email: user.email,
        };

        const token = jwtService.signToken(payload);

        return res.status(200).json({ authenticated: true, ...payload, token });
      });
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },
};
