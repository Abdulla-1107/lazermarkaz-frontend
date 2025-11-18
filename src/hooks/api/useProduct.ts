import { useQuery } from "@tanstack/react-query";
import api from "./api";

interface ProductProps {
  categoryId?: string;
}

export const useProduct = () => {
  const getProduct = (props: ProductProps) =>
    useQuery({
      queryKey: ["product", props],
      queryFn: () =>
        api.get("/products", { params: props }).then((res) => res.data),
    });

  const getOneProduct = (id: string) => {
    return useQuery({
      queryKey: ["product", id],
      queryFn: () => api.get(`/products/${id}`).then((res) => res.data),
    });
  };

  return { getProduct, getOneProduct };
};
