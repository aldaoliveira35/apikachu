import { useInfiniteQuery } from "@tanstack/react-query";
import { getItems } from "../api-clients/pokemon-api-client";
import type { ItemsResponse, ItemDetailsResponse } from "../types/types";

const PAGE_SIZE = 24;

async function listItems(
  signal: AbortSignal,
  pageParam: number,
  search: string
) {
  const sanitizedSearch = search.toLowerCase();

  const { results }: ItemsResponse = await getItems(signal);

  return results
    .filter((item) => item.name.toLowerCase().includes(sanitizedSearch))
    .slice(PAGE_SIZE * pageParam, PAGE_SIZE * pageParam + PAGE_SIZE)
    .map(({ url }) => url);
}

export function useItems(search: string) {
  return useInfiniteQuery({
    queryKey: ["item", search],
    queryFn: async ({ signal, pageParam }) => {
      const itemUrls = await listItems(signal, pageParam, search);

      const itemDetails: ItemDetailsResponse[] = await Promise.all(
        itemUrls.map((url) =>
          fetch(url, { signal }).then((response) => response.json())
        )
      );

      return itemDetails.map((item) => ({
        id: item.id,
        name: item.name,
        cost: item.cost,
        image: item.sprites.default,
        category: item.category.name,
        effect:
          item.effect_entries.length === 0
            ? "no effect available"
            : item.effect_entries[0].short_effect,
      }));
    },
    staleTime: Infinity,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < PAGE_SIZE) return;

      return pages.length;
    },
  });
}
