export interface Pokemon {
  id: number;
  name: string;
  image: string;
  oldSchoolImage: string;
  types: string[];
  height: number;
  weight: number;
  abilities: string[];
  stats: Array<{
    name: string;
    value: number;
  }>;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
}

export interface PokemonDetailsResponse {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;
  height: number;
  weight: number;
  abilities: Array<{
    ability: {
      name: string;
    };
  }>;
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
}
export interface PokemonTypesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
}

export interface PokemonSpeciesResponse {
  evolution_chain: {
    url: string;
  };
}

export interface PokemonEvolutionChainResponse {
  chain: PokemonEvolutionChain;
}

interface PokemonEvolutionChain {
  evolves_to: PokemonEvolutionChain[];
  species: {
    name: string;
    url: string;
  };
}

export interface ItemsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
}

export interface ItemDetailsResponse {
  id: number;
  name: string;
  sprites: {
    default: string;
  };
  category: {
    name: string;
    url: string;
  };
  cost: number;
  effect_entries: Array<{
    short_effect: string;
  }>;
}

export interface Item {
  id: number;
  name: string;
  image: string;
  cost: number;
  category: string;
  effect: string;
}
