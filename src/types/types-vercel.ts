export interface PokemonDetailsResponse {
  id: number;
  name: string;
  description: string;
  height: number;
  weight: number;
  image: string;
  oldSchoolImage: string;
  types: string[];
  abilities: string[];
  stats: Array<{
    name: string;
    value: number;
  }>;
}

export type PokemonListResponse = Array<PokemonDetailsResponse>;

export interface ItemsResponse {
  id: number;
  name: string;
  cost: number;
  image: string;
  category: string;
  effect: string;
}

export type PokemonTypesResponse = string[];
