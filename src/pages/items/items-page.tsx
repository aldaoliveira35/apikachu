import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { useItems } from "../../queries/useItems";
import { SearchIcon } from "../../components/Icons/SearchIcon";
import { LoadingIcon } from "../../components/LoadingIcon/LoadingIcon";
import { ItemCard } from "../../components/ItemCard/ItemCard";

import classes from "./items-page.module.css";

export function ItemsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const timeoutRef = useRef<number | null>(null);

  const [search, setSearch] = useState(searchParams.get("search") || "");

  const {
    data: item = { pages: [], pageParams: 0 },
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useItems(search);

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
            placeholder="Search for Items"
            defaultValue={search}
            onChange={(event) => onSearchChange(event.target.value)}
          />
          <SearchIcon className={classes.searchIcon} />
        </div>
      </div>

      {!isLoading && (
        <>
          <div className={classes.itemGrid}>
            {item.pages.flat().map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
          <button
            disabled={isFetchingNextPage || !hasNextPage}
            className={classes.fetchMoreButton}
            onClick={() => fetchNextPage()}
          >
            Fetch more Items
          </button>
        </>
      )}

      {isLoading && (
        <div className={classes.loadingIconWrapper}>
          <LoadingIcon />
          <p className={classes.loadingParagraph}>Loading Item...</p>
        </div>
      )}
    </>
  );
}
