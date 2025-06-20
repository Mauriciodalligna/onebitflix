import { Like } from "../models";

export const likeService = {
  create: async (userId: number, courseId: number) => {
    // Verifica se já existe um like
    const existingLike = await Like.findOne({
      where: {
        userId,
        courseId,
      },
    });

    if (existingLike) {
      throw new Error("Você já curtiu este curso");
    }

    const like = await Like.create({ userId, courseId });
    return like;
  },

  delete: async (userId: number, courseId: number) => {
    // Verifica se o like existe antes de tentar deletar
    const existingLike = await Like.findOne({
      where: {
        userId,
        courseId,
      },
    });

    if (!existingLike) {
      throw new Error("Like não encontrado");
    }

    await Like.destroy({
      where: {
        userId,
        courseId,
      },
    });
  },

  // Método para verificar se o usuário já curtiu o curso
  isLiked: async (userId: number, courseId: number) => {
    const like = await Like.findOne({
      where: {
        userId,
        courseId,
      },
    });
    return like !== null ? true : false;
  },
};
