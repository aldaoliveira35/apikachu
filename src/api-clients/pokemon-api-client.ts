const API_BASE_URL = "https://pokeapi.co/api/v2";

export function getPokemon(signal: AbortSignal) {
  // The API does not support pagination with a search term so we filter locally.
  const searchParams = new URLSearchParams({
    limit: "10000",
  });

  return request(`pokemon?${searchParams.toString()}`, signal);
}

export function getPokemonDetails(signal: AbortSignal, idOrName: string) {
  return request(`pokemon/${idOrName}`, signal);
}

export function getPokemonTypes(signal: AbortSignal) {
  return request("type", signal);
}

export function getPokemonTypeDetails(signal: AbortSignal, idOrName: string) {
  return request(`type/${idOrName}`, signal);
}

export function getPokemonSpecies(signal: AbortSignal, id: string) {
  return request(`pokemon-species/${id}`, signal);
}

export function getItems(signal: AbortSignal) {
  // The API does not support pagination with a search term so we filter locally.
  const searchParams = new URLSearchParams({
    limit: "10000",
  });

  return request(`item?${searchParams.toString()}`, signal);
}

async function request(endpointUrl: string, signal: AbortSignal) {
  const response = await fetch(`${API_BASE_URL}/${endpointUrl}`, {
    method: "GET",
    signal,
  });

  if (response.ok) {
    return await response.json();
  }

  throw new Error();
}
