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

  const [showOldSchoolImage, setShowOldSchoolImage] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [search, setSearch] = useState(searchParams.get("search") || "");

  const { data: pokemonTypes = [] } = usePokemonTypes();
  const {
    data: pokemon = { pages: [], pageParams: 0 },
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = usePokemon(search, selectedType);

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

  return (
    <>
      <div className={classes.inputContainer}>
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
        <select
          onChange={(event) => setSelectedType(event.target.value)}
          className={classes.selectType}
        >
          <option value="">Filter by type</option>
          {pokemonTypes.map((type) => (
            <option value={type} key={type}>
              {type}
            </option>
          ))}
        </select>
        <label className={classes.shinyCheckbox}>
          Click here for nostalgia
          <input
            type="checkbox"
            onChange={(event) => setShowOldSchoolImage(event.target.checked)}
          />
        </label>
      </div>

      {!isLoading && pokemon.pages.length > 0 && (
        <>
          <div className={classes.pokedexGrid}>
            {pokemon.pages.flat().map((pokemon) => (
              <PokemonCard
                key={pokemon.name}
                pokemon={pokemon}
                showOldSchoolImage={showOldSchoolImage}
              />
            ))}
          </div>

          <button
            disabled={isFetchingNextPage || !hasNextPage}
            className={classes.fetchMoreButton}
            onClick={() => fetchNextPage()}
          >
            Fetch more Pokémon
          </button>
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
