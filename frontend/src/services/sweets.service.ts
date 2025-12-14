import api from "../api/api";

export interface Sweet {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

/* ===== COMMON ===== */

export const getSweets = async (): Promise<Sweet[]> => {
  const res = await api.get("/sweets");
  return res.data;
};

export const buySweet = async (id: number): Promise<void> => {
  await api.post(`/sweets/${id}/purchase`);
};

/* ===== ADMIN ONLY ===== */

export const addSweet = async (
  sweet: Omit<Sweet, "id">
): Promise<Sweet> => {
  const res = await api.post("/sweets", sweet);
  return res.data;
};

export const updateSweet = async (
  id: number,
  sweet: Partial<Omit<Sweet, "id">>
): Promise<Sweet> => {
  const res = await api.put(`/sweets/${id}`, sweet);
  return res.data;
};

export const deleteSweet = async (id: number): Promise<void> => {
  await api.delete(`/sweets/${id}`);
};
