import api from "./api";

interface RegisterParams {
  firstName: string;
  lastName: string;
  phone: string;
  birth: string;
  email: string;
  password: string;
}

interface LoginParams {
  email: string;
  password: string;
}

const authService = {
  register: async (params: RegisterParams) => {
    try {
      const formattedParams = {
        first_name: params.firstName,
        last_name: params.lastName,
        phone: params.phone,
        birth: params.birth,
        email: params.email,
        password: params.password,
        role: "user",
      };
      const res = await api.post("/auth/register", formattedParams);
      return res;
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        return error.response;
      }
      return error;
    }
  },
  login: async (params: LoginParams) => {
    try {
      const res = await api.post("/auth/login", params);
      if (res.status === 200) {
        sessionStorage.setItem("onebitflix-token", res.data.token);
      }
      return res;
    } catch (error: any) {
      if (
        error.response &&
        (error.response.status === 400 || error.response.status === 401)
      ) {
        return error.response;
      }
      return error;
    }
  },
};

export default authService;
