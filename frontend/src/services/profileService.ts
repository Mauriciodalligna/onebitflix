import api from "./api";

interface UserParams {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  birth: string;
}

interface PasswordParams {
  currentPassword: string;
  newPassword: string;
}

const profileService = {
  getProfile: async () => {
    const token = sessionStorage.getItem("onebitflix-token");

    const res = await api
      .get("/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        console.log(error.response.data.message);
        return error.response;
      });

    return res;
  },

  updateProfile: async (data: any) => {
    const token = sessionStorage.getItem("onebitflix-token");

    const res = await api
      .put("/users/profile", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        console.log(error.response.data.message);
        return error.response;
      });

    return res;
  },

  updatePassword: async (data: any) => {
    const token = sessionStorage.getItem("onebitflix-token");

    const res = await api
      .put("/users/profile/password", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        console.log(error.response.data.message);
        return error.response;
      });

    return res;
  },

  fetchCurrent: async () => {
    const token = sessionStorage.getItem("onebitflix-token");

    try {
      const res = await api.get("/users/current", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Verificar se a data de criação está presente e formatá-la se necessário
      if (res.data && res.data.createdAt) {
        // Garantir que a data esteja em um formato válido
        const date = new Date(res.data.createdAt);
        if (!isNaN(date.getTime())) {
          res.data.createdAt = date.toISOString();
        }
      }

      return res;
    } catch (error: any) {
      return {
        data: {
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          birth: new Date().toISOString(), // Usar a data atual como fallback
          createdAt: new Date().toISOString(), // Usar a data atual como fallback
        },
      };
    }
  },

  userUpdate: async (params: UserParams) => {
    const token = sessionStorage.getItem("onebitflix-token");

    try {
      const res = await api.put("/users/current", params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.status;
    } catch (error: any) {
      if (error.response?.status === 400 || error.response?.status === 401) {
        return error.response.status;
      }
      throw error;
    }
  },

  passwordUpdate: async (params: PasswordParams) => {
    const token = sessionStorage.getItem("onebitflix-token");

    const res = await api
      .put("/users/current/password", params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        if (error.response.status === 400 || error.response.status === 401) {
          return error.response;
        }

        return error;
      });

    return res.status;
  },
};

export default profileService;
