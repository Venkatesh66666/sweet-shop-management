import api from "../api/api";

export const registerUser = (email: string, password: string) => {
  return api.post("/auth/register", { email, password });
};

export const loginUser = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password });
  localStorage.setItem("token", res.data.token);
};
