import favouriteReducer, {
  addToFavourites,
  removeFromFavourites,
  addToLargestCity,
  removeFromLargestCity,
} from "./favouriteSlice";
import {locationType} from "../types";

const sampleLocationData = {
  request: {
    type: 'string',
    query: 'string',
    language: 'en',
    unit: 'm',
  },
  location: {
    country: 'Nigeria',
    name: 'Delta',
    region: 'Asaba',
    localtime: 'time',
    utc_offset: '9.0',
    population: 0
  },
  current: {
    is_day: 'yes',
    feelslike: "string",
    humidity: "string",
    temperature: "string",
    weather_descriptions: ["info"],
    cloudcover: "string",
    pressure: "string",
    precip: "string",
    uv_index: "string",
    wind_degree: "string",
    wind_dir: "string",
    wind_speed: "string"
  }
}

describe("favourite reducer", () => {
  const initialState = {
    favList: [] as locationType[],
    largestCitiesList: [] as locationType[],
    error: null,
  };

  it("should handle initial state", () => {
    expect(favouriteReducer(undefined, { type: "unknown" })).toEqual({
      favList: [],
      largestCitiesList: [],
      error: null,
    });
  });

  it("should handle add to largest city list", () => {
    const actual = favouriteReducer(initialState, addToLargestCity({data: [sampleLocationData, sampleLocationData]}));
    expect(actual.largestCitiesList).toEqual([sampleLocationData, sampleLocationData]);
  });

  it("should handle add to favourite city list", () => {
    const actual = favouriteReducer(initialState, addToFavourites({data: sampleLocationData}));
    expect(actual.favList).toEqual([sampleLocationData]);
  });

  it("should handle remove from largest city", () => {
    const actual = favouriteReducer(initialState, removeFromLargestCity({data: sampleLocationData}));
    expect(actual.largestCitiesList).toEqual([]);
  });

  it("should handle remove from favourite city", () => {
    const actual = favouriteReducer(initialState, removeFromFavourites({data: sampleLocationData}));
    expect(actual.favList).toEqual([]);
  });
});
