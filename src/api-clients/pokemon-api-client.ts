const API_BASE_URL = "https://pokeapi.co/api/v2";

export function getPokemon(signal: AbortSignal) {
  const searchParams = new URLSearchParams({
    limit: "30",
  });

  return request(`pokemon?${searchParams.toString()}`, signal);
}

export function getPokemons(signal: AbortSignal) {
  const searchParams = new URLSearchParams({
    limit: "30",
  });

  return request(`pokemon?${searchParams.toString()}`, signal);
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
