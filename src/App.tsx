import { usePokemon } from "./queries/usePokemons";

export function App() {
  const { data, isLoading } = usePokemon();

  return (
    <>
      {isLoading && <p>Loading Pokemons...</p>}
      {!isLoading && data && data.length > 0 && (
        <ul>
          {data.map((pokemon) => (
            <li>
              <p>{pokemon.name}</p>
              <img src={pokemon.sprites.front_default} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
