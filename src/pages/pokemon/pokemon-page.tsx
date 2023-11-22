import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { usePokemon } from "../../queries/usePokemon";
import { usePokemonTypes } from "../../queries/usePokemonTypes";
import { LoadingIcon } from "../../components/LoadingIcon/LoadingIcon";
import { PokemonCard } from "../../components/PokemonCard/PokemonCard";
import { SearchIcon } from "../../components/Icons/SearchIcon";

import classes from "./pokemon-page.module.css";

export function PokemonPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const timeoutRef = useRef<number | null>(null);

  const [showShiny, setShowShiny] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [search, setSearch] = useState(searchParams.get("search") || "");

  const { data: pokemonTypes = [] } = usePokemonTypes();
  const {
    data: pokemon = { pages: [], pageParams: 0 },
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
  } = usePokemon(search);

  const onSearchChange = (newSearchValue: string) => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      timeoutRef.current = null;
      setSearch(newSearchValue);

      searchParams.set("search", newSearchValue);
      setSearchParams(searchParams);
    }, 500);
  };

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  const filteredPokemon = !selectedType
    ? pokemon.pages.flat()
    : pokemon.pages
        .flat()
        .filter((pokemon) => pokemon.types.includes(selectedType));

  return (
    <>
      <div className={classes.inputContainer}>
        <select onChange={(event) => setSelectedType(event.target.value)}>
          <option value="">--Please choose an option</option>
          {pokemonTypes.map((type) => (
            <option value={type}> {type} </option>
          ))}
        </select>
        <div className={classes.searchBarContainer}>
          <input
            className={classes.searchBar}
            type="text"
            placeholder="Search for Pokémon"
            defaultValue={search}
            onChange={(event) => onSearchChange(event.target.value)}
          />
          <SearchIcon className={classes.searchIcon} />
        </div>

        <label className={classes.shinyCheckbox}>
          Show shiny Pokémon
          <input
            type="checkbox"
            onChange={(event) => setShowShiny(event.target.checked)}
          />
        </label>
      </div>

      {!isLoading && filteredPokemon.length > 0 && (
        <>
          <div className={classes.pokedexGrid}>
            {filteredPokemon.map((pokemon) => (
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
