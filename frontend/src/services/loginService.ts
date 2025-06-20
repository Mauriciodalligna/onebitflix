import api from "./api";

interface LoginParams {
  email: string;
  password: string;
}

const loginService = {
  login: async (params: LoginParams) => {
    const res = await api.post("/auth/login", params).catch((error) => {
      console.log(error.response.data.message);
      return error.response;
    });

    if (res.status === 200) {
      sessionStorage.setItem("onebitflix-token", res.data.token);
    }

    return res;
  },

  getToken: () => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("onebitflix-token");
    }
    return null;
  },
};

export { loginService };
