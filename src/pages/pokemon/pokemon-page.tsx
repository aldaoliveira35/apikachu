import { useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";

import { usePokemon } from "../../queries/usePokemon";
import { LoadingIcon } from "../../components/LoadingIcon/LoadingIcon";
import { PokemonCard } from "../../components/PokemonCard/PokemonCard";

import classes from "./pokemon.module.css";

export function PokemonPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const timeoutRef = useRef<number | null>(null);
  const [showShiny, setShowShiny] = useState(false);
  const [search, setSearch] = useState(searchParams.get("q") || "");

  const { data, isLoading, isFetchingNextPage, fetchNextPage } =
    usePokemon(search);

  const onSearchChange = (newSearchValue: string) => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      timeoutRef.current = null;
      setSearch(newSearchValue);

      searchParams.set("q", newSearchValue);
      setSearchParams(searchParams);
    }, 250);
  };

  return (
    <>
      <div>
        <input
          type="checkbox"
          id="show-shiny-checkbox"
          onChange={(event) => setShowShiny(event.target.checked)}
        />

        <label htmlFor="show-shiny-checkbox">Show shiny Pokémon</label>

        <input
          type="text"
          placeholder="Search for Pokémon"
          defaultValue={search}
          onChange={(event) => onSearchChange(event.target.value)}
          style={{
            padding: "10px",
            border: "1px solid black",
          }}
        />
      </div>
      {!isLoading && data && data.pages.length > 0 && (
        <>
          <div className={classes.pokedexGrid}>
            {data.pages.flat().map((pokemon) => (
              <PokemonCard
                key={pokemon.name}
                pokemon={pokemon}
                showShinyImage={showShiny}
              />
            ))}
          </div>

          {search.length === 0 && (
            <button
              disabled={isFetchingNextPage}
              className={classes.fetchMoreButton}
              onClick={() => fetchNextPage()}
            >
              Fetch more Pokémon
            </button>
          )}
        </>
      )}

      {isLoading && (
        <div className={classes.loadingIconWrapper}>
          <LoadingIcon />
          <p className={classes.loadingParagraph}>Loading Pokémon...</p>
        </div>
      )}
    </>
  );
}
