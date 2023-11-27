import { useInfiniteQuery } from "@tanstack/react-query";
import { getItems } from "../api-clients/pokemon-api-client";
import { ItemsResponse, ItemDetailsResponse } from "./types";

async function listItemWithSearch(signal: AbortSignal, search: string) {
  // The API does not support pagination with a search term.
  const pageSize = 10_000;

  const { results }: ItemsResponse = await getItems(signal, pageSize, 0);

  return results.filter((item) => item.name.includes(search));
}

async function listItem(signal: AbortSignal, pageParam: number) {
  const pageSize = 24;

  const { results }: ItemsResponse = await getItems(
    signal,
    pageSize,
    pageSize * pageParam
  );

  return results;
}

export function useItems(search: string) {
  return useInfiniteQuery({
    queryKey: ["item", search],
    queryFn: async ({ signal, pageParam }) => {
      const results =
        search.length === 0
          ? await listItem(signal, pageParam)
          : await listItemWithSearch(signal, search);

      const itemDetails: ItemDetailsResponse[] = await Promise.all(
        results.map((item) => {
          return fetch(item.url, { signal }).then((response) =>
            response.json()
          );
        })
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
    getNextPageParam: (_lastPage, pages) => pages.length,
  });
}
