import { useInfiniteQuery } from "@tanstack/react-query";
import { getItems } from "../api-clients/pokemon-api-client-vercel";
import type { ItemsResponse } from "../types/types-vercel";

const PAGE_SIZE = 24;

export function useItems(search: string) {
  return useInfiniteQuery({
    queryKey: ["item", search],
    queryFn: async ({ signal, pageParam }) => {
      const itemDetails: ItemsResponse[] = await getItems(
        signal,
        search,
        pageParam,
        PAGE_SIZE
      );

      return itemDetails;
    },
    staleTime: Infinity,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < PAGE_SIZE) return;

      return pages.length;
    },
  });
}
