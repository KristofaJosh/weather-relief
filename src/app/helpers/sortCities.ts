import { locationType } from "../store/reducers/types";

export const sortCities = (
  cityList: locationType[] = [],
  orderBy: "a-z" | "population" = "a-z"
) => {
  const cityListCopy = [...cityList];
  if (orderBy === "population") {
    return cityListCopy.sort(
      (a, b) => b.location.population - a.location.population
    );
  } else if (orderBy === "a-z") {
    return cityListCopy.sort((a, b) => {
      const aField = a.location.name.toLowerCase();
      const bField = b.location.name.toLowerCase();
      if (aField > bField) return 1;
      else if (aField < bField) return -1;
      return 0;
    });
  }
  return cityList
};
