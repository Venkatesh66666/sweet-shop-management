export type UserRole = "ADMIN" | "USER";

interface JwtPayload {
  id: number;
  role: UserRole;
  exp: number;
}

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const isLoggedIn = (): boolean => {
  return !!getToken();
};

export const getUserRole = (): UserRole | null => {
  const token = getToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1])) as JwtPayload;
    return payload.role;
  } catch {
    return null;
  }
};

export const isAdmin = (): boolean => {
  return getUserRole() === "ADMIN";
};

export const logout = () => {
  localStorage.removeItem("token");
};
