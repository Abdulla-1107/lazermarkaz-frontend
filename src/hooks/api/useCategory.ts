import { useQuery } from "@tanstack/react-query";
import api from "./api";

export const useCategory = () => {
  const getCategory = (props: any) =>
    useQuery({
      queryKey: ["category", props],
      queryFn: () =>
        api.get("/category", { params: props }).then((res) => res.data),
    });

  const getOneCategory = (id: string) => {
    return useQuery({
      queryKey: ["category", id],
      queryFn: () => api.get(`/category/${id}`).then((res) => res.data),
    });
  };

  return { getCategory, getOneCategory };
};
