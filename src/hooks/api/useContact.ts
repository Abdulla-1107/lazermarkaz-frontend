import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./api"; // bu send request qilingan instance (axios yoki fetch wrapper)

export interface CreateContactPayload {
  name: string;
  email?: string; // optional
  message?: string;
}

export const createContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateContactPayload) => {
      const { data } = await api.post("/contact", payload);
      return data;
    },
    onSuccess: () => {
      // Agar istasang cart yoki orders query-ni invalidate qilish mumkin
      queryClient.invalidateQueries({ queryKey: ["contact"] });
    },
  });
};
