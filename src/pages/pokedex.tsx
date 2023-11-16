import { usePokemon } from "../queries/usePokemons";

export function Pokedex() {
  const { data, error, isLoading, isFetchingNextPage, fetchNextPage } =
    usePokemon();

  return (
    <>
      {isLoading && <p>Loading Pokemons...</p>}
      {error && <p>Something occurred</p>}
      {!isLoading && data && data.pages.length > 0 && (
        <ul style={{ display: "flex", flexWrap: "wrap" }}>
          {data.pages.flat().map((pokemon) => (
            <li key={pokemon.name}>
              <img src={pokemon.sprites.front_default} />
              <p>
                #{pokemon.id.toString().padStart(4, "0")} - {pokemon.name}
              </p>
            </li>
          ))}
        </ul>
      )}
      {isFetchingNextPage && <p>Loading more pokemon</p>}
      <button
        onClick={() => fetchNextPage()}
        style={{ backgroundColor: "red", width: "fit-content" }}
      >
        Fetch more Pokemon
      </button>
    </>
  );
}
