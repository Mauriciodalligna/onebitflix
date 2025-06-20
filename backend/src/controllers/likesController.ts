import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";
import { likeService } from "../services/likeService";

export const likesController = {
  //POST /likes
  save: async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id;
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({ message: "O ID do curso é obrigatório" });
    }

    try {
      const like = await likeService.create(userId, courseId);
      return res.status(201).json(like);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: "Erro ao salvar like" });
    }
  },

  //DELETE /likes/:id
  delete: async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id;
    const courseId = req.params.id;

    if (!courseId) {
      return res.status(400).json({ message: "O ID do curso é obrigatório" });
    }

    try {
      await likeService.delete(userId, Number(courseId));
      return res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: "Erro ao deletar like" });
    }
  },
};
