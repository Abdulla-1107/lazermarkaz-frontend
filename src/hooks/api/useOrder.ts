import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./api"; // bu send request qilingan instance (axios yoki fetch wrapper)

interface OrderItem {
  productId: string;
  quantity: number;
}

interface CreateOrderPayload {
  fullName: string;
  phone: string;
  address: string;
  email?: string; // optional
  oferta: boolean;
  totalPrice?: number; // optional
  items: OrderItem[];
}

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateOrderPayload) => {
      const { data } = await api.post("/order", payload);
      return data;
    },
    onSuccess: () => {
      // Agar istasang cart yoki orders query-ni invalidate qilish mumkin
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};
