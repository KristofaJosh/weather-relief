import { locationType } from "../../../store/reducers/types";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { largestCityType } from "../../../../utils/apis/types";
import { useAppDispatch, useAppSelector } from "../../../store";
import api from "../../../../utils/apis";
import {
  addToFavourites,
  removeFromFavourites,
} from "../../../store/reducers/favourites/fav.reducer";
import style from "./menu.module.scss";
import {
  IconGlobe,
  IconHumidity,
  IconTemperature,
} from "../../../assets/icons";
import FrostCard from "../../elements/card";

let timeout: any = null;

export const SearchCity = ({
  onNavigate,
}: {
  onNavigate: (res: locationType) => () => void;
}) => {
  const { favList } = useAppSelector((state) => state.favourites);
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);
  const [suggestions, setSuggestions] = useState<largestCityType[]>([]);
  const [searchResult, setSearchResult] = useState<locationType>();
  const [favIsAdded, setFavIsAdded] = useState(false);
  const [disableAddFav, setDisableAddFav] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  const dispatch = useAppDispatch();

  const handleEntry = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    if (!value) {
      clearTimeout(timeout);
      setSuggestions([]);
      setLoadingSuggestions(false);
      return;
    }
    setLoadingSuggestions(true);

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      api
        .allCities()
        .then((res) => {
          setLoadingSuggestions(false);
          setSuggestions(
            res.data.record.filter(
              (el: { Name: string; Country: string }) =>
                el.Name.toLowerCase().includes(value.toLowerCase()) ||
                el.Country.toLowerCase().includes(value.toLowerCase())
            )
          );
        })
        .catch(() => setLoadingSuggestions(false));
    }, 500);
  };

  const handleSelect = (e: any) => {
    setSearch(e.target.id.trim());
    setSuggestions([]);
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      setSuggestions([]);
      setSearchResult(null as any);
      setSearching(true);
      api
        .getCity(search.trim(), true)
        .then((res) => {
          setSearch("");
          const exist = favList.findIndex(
            (el) =>
              el.location.name.toLowerCase() ===
              res.data.location.name.toLowerCase()
          );
          setFavIsAdded(exist >= 0);
          setSearchResult(res.data);
          setSearching(false);
        })
        .catch(() => {
          setSearching(false);
          alert("Nothing Found!");
        });
    }
  };

  const saveToFavourites =
    (data: locationType) => (e: ChangeEvent<HTMLInputElement>) => {
      setFavIsAdded(e.target.checked);
      if (e.target.checked) {
        dispatch(addToFavourites({ data }));
      } else {
        dispatch(removeFromFavourites({ data }));
      }
    };

  useEffect(() => {
    if (favList.length === 10) {
      setDisableAddFav(true);
    } else {
      setDisableAddFav(false);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className={style.search}>
      <h1>Search Cities</h1>
      <form className={style.search__input_container} onSubmit={handleSearch}>
        <p style={{ fontSize: 14, height: 25 }}>
          {loadingSuggestions ? "suggesting..." : ""}
        </p>
        <input
          className={style.search__search_input}
          type="search"
          value={search}
          onChange={handleEntry}
          placeholder={"Enter city name. Eg: Tokyo"}
        />
        <button type={"submit"}>
          {searching ? <IconGlobe className={"spin"} /> : "Search"}
        </button>
        <div
          className={`${style.search__results} ${
            suggestions.length ? style.search__results_hasResults : ""
          }`}
          onClick={handleSelect}
        >
          {suggestions.map((el, i) => (
            <li key={`${el.Name}_${i}`} id={el.Name}>
              {el.Country}, {el.Name}
            </li>
          ))}
        </div>
      </form>
      <>
        {searchResult && (
          <>
            <FrostCard
              className={style.response}
              onClick={onNavigate(searchResult)}
            >
              <div>
                <p>
                  {searchResult.location.country},{" "}
                  <span style={{ fontWeight: "lighter" }}>
                    {searchResult.location.name}
                  </span>
                </p>
                <div
                  title={"weather description"}
                  style={{ fontWeight: "lighter", fontSize: 14 }}
                >
                  {searchResult.current.weather_descriptions}
                </div>
              </div>
              <div className={style.response__summary}>
                <div title={"temperature"}>
                  <IconTemperature /> {searchResult.current.temperature}°
                </div>
                <div title={"humidity"}>
                  <IconHumidity /> {searchResult.current.humidity}%
                </div>
              </div>
            </FrostCard>
            <FrostCard className={`${style.response__actions}`}>
              <label htmlFor="fav">
                <input
                  id={"fav"}
                  disabled={disableAddFav}
                  type="checkbox"
                  checked={favIsAdded}
                  onChange={saveToFavourites(searchResult)}
                />
                Add to favourites
              </label>
              {favList.length === 10 ? (
                <p>You have used up all your save slots.</p>
              ) : (
                <p>
                  You can save <b>{10 - favList.length}</b> out of <b>10</b> cities
                </p>
              )}
            </FrostCard>
          </>
        )}
      </>
    </div>
  );
};
