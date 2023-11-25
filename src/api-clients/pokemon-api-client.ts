const API_BASE_URL = "https://pokeapi.co/api/v2";

export function getPokemon(signal: AbortSignal, limit: number, offset: number) {
  const searchParams = new URLSearchParams({
    limit: limit.toString(),
    offset: offset.toString(),
  });

  return request(`pokemon?${searchParams.toString()}`, signal);
}

export function getPokemonDetails(signal: AbortSignal, idOrName: string) {
  return request(`pokemon/${idOrName}`, signal);
}
export function getPokemonTypes(signal: AbortSignal) {
  return request("type", signal);
}

export function getPokemonSpecies(signal: AbortSignal, id: string) {
  return request(`pokemon-species/${id}`, signal);
}

async function request(endpointUrl: string, signal: AbortSignal) {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpointUrl}`, {
      method: "GET",
      signal,
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
