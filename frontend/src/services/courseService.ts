import api from "./api";

export type EpisodeType = {
  id: number;
  name: string;
  synopsis: string;
  order: number;
  videoUrl: string;
  secondsLong: number;
};
export type CourseType = {
  id: number;
  name: string;
  thumbnailUrl: string;
  synopsis: string;
  episodes?: EpisodeType[];
};

const courseService = {
  getNewestCourses: async () => {
    try {
      const res = await api.get("/courses/newest");
      return res;
    } catch (error: any) {
      console.log(
        "Erro ao buscar cursos mais novos:",
        error.response?.data?.message || error.message
      );
      return {
        status: 500,
        data: [],
      };
    }
  },

  getFeaturedCourses: async () => {
    const res = await api.get("/courses/featured").catch((error) => {
      console.log(error.response.data.message);

      return error.response;
    });

    return res;
  },

  addToFav: async (courseId: number | string) => {
    const res = await api.post("/favorites", { courseId }).catch((error) => {
      console.log(error.response.data.message);

      return error.response;
    });

    return res;
  },

  removeFav: async (courseId: number | string) => {
    const res = await api.delete(`/favorites/${courseId}`).catch((error) => {
      console.log(error.response.data.message);

      return error.response;
    });

    return res;
  },

  getFavCourses: async () => {
    const res = await api.get("/favorites").catch((error) => {
      console.log(error.response.data.message);

      return error.response;
    });

    return res;
  },

  like: async (courseId: number | string) => {
    const res = await api.post("likes", { courseId }).catch((error) => {
      console.log(error.response.data.message);

      return error.response;
    });

    return res;
  },

  removeLike: async (courseId: number | string) => {
    const res = await api.delete(`/likes/${courseId}`).catch((error) => {
      console.log(error.response.data.message);

      return error.response;
    });

    return res;
  },

  getSearch: async (name: string) => {
    try {
      const res = await api.get(`/courses/search?name=${name}`);
      return res;
    } catch (error: any) {
      console.log(
        "Erro na busca:",
        error.response?.data?.message || error.message
      );
      return {
        data: {
          courses: [],
        },
      };
    }
  },
  getEpisodes: async (id: number | string) => {
    const res = await api.get(`/courses/${id}`).catch((error) => {
      console.log(error.response.data.message);

      return error.response;
    });

    return res;
  },
};

export default courseService;
