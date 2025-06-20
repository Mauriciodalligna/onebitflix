import api from "./api";
import { CourseType } from "./courseService";
import { AxiosError } from "axios";

export type CategoryType = {
  id: number;
  name: string;
  position: number;
  courses?: CourseType[];
};

interface AxiosErrorResponse {
  message: string;
  status: number;
  data: {
    message: string;
    courses?: CourseType[];
  };
}

const categoriesService = {
  getCategories: async () => {
    const token = sessionStorage.getItem("onebitflix-token");
    console.log("Token para categorias:", token ? "Presente" : "Ausente");

    const res = await api
      .get("/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        console.log(
          "Erro ao buscar categorias:",
          error.response?.data?.message || error.message
        );
        return error.response;
      });

    return res;
  },

  getCourses: async (id: number) => {
    const token = sessionStorage.getItem("onebitflix-token");
    console.log(
      "Token para cursos da categoria:",
      token ? "Presente" : "Ausente"
    );
    console.log("Buscando cursos para categoria ID:", id);

    try {
      const res = await api.get(`/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<AxiosErrorResponse>;
      console.log(
        "Erro ao buscar cursos da categoria:",
        axiosError.response?.data?.message || axiosError.message
      );

      // Se o erro for 400 (Bad Request) com a mensagem específica sobre a associação,
      // retornamos um objeto com status 400 para que o componente possa lidar com isso
      if (
        axiosError.response?.status === 400 &&
        typeof axiosError.response?.data === "object" &&
        axiosError.response?.data !== null &&
        "message" in axiosError.response.data &&
        typeof axiosError.response.data.message === "string" &&
        axiosError.response.data.message.includes("Association with alias")
      ) {
        return {
          status: 400,
          data: {
            message: axiosError.response.data.message,
            courses: [],
          },
        };
      }

      return axiosError.response;
    }
  },
};

export default categoriesService;
