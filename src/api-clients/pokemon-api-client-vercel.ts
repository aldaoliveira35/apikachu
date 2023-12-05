const API_VERCEL_URL = " https://pokemon-api-blond.vercel.app/api";

export function getPokemon(
  signal: AbortSignal,
  type: string,
  search: string,
  page: number,
  pageSize: number
) {
  const searchParams = new URLSearchParams({
    type,
    search,
    page: page.toString(),
    pageSize: pageSize.toString(),
  });
  return request(`pokemon?${searchParams.toString()}`, signal);
}

export function getPokemonDetails(signal: AbortSignal, idOrName: string) {
  return request(`pokemon/${idOrName}`, signal);
}

export function getPokemonTypes(signal: AbortSignal) {
  return request("pokemon-types", signal);
}

export function getItems(
  signal: AbortSignal,
  search: string,
  page: number,
  pageSize: number
) {
  const searchParams = new URLSearchParams({
    search,
    page: page.toString(),
    pageSize: pageSize.toString(),
  });
  return request(`item?${searchParams.toString()}`, signal);
}

async function request(endpointURL: string, signal: AbortSignal) {
  try {
    const response = await fetch(`${API_VERCEL_URL}/${endpointURL}`, {
      method: "GET",
      signal,
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
