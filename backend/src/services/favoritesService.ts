// src/services/favoriteService.ts

import { Favorite } from "../models/Favorite";

export const favoriteService = {
  findByUserId: async (userId: number) => {
    const favorites = await Favorite.findAll({
      attributes: [["user_id", "userId"]],
      where: { userId },
      include: {
        association: "Course",
        attributes: [
          "id",
          "name",
          "synopsis",
          ["thumbnail_url", "thumbnailUrl"],
        ],
      },
    });

    return {
      userId,
      courses: favorites.map((favorite) => favorite.Course),
    };
  },

  create: async (userId: number, courseId: number) => {
    const favorite = await Favorite.create({
      userId,
      courseId,
    });

    return favorite;
  },

  delete: async (userId: number, courseId: number) => {
    await Favorite.destroy({
      where: { userId, courseId },
    });
  },

  isFavorited: async (userId: number, courseId: number) => {
    const favorite = await Favorite.findOne({
      where: {
        userId,
        courseId,
      },
    });

    return favorite !== null;
  },
};
