import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setLargestCity } from "./fav.actions";
import { locationType } from "../types";

export const favouriteSlice = createSlice({
  name: "favourites",
  initialState: {
    favList: [] as locationType[],
    largestCitiesList: [] as locationType[],
    error: null,
  },

  reducers: {
    addToFavourites: (state, action: PayloadAction<{ data: locationType }>) => {
      state.favList = state.favList.concat(action.payload.data);
    },
    removeFromFavourites: (
      state,
      action: PayloadAction<{ data: locationType }>
    ) => {
      state.favList = state.favList.filter(
        (el) => el.request.query !== action.payload.data.request.query
      );
    },
    addToLargestCity: (state, action: PayloadAction<{ data: any[] }>) => {
      state.largestCitiesList = state.largestCitiesList.concat(
        action.payload.data
      );
    },
    removeFromLargestCity: (
      state,
      action: PayloadAction<{ data: locationType }>
    ) => {
      state.largestCitiesList = state.largestCitiesList.filter(
        (el) => el.request.query !== action.payload.data.request.query
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setLargestCity.fulfilled, (state, action: any) => {
      state.largestCitiesList = action.payload || [];
    });
  },
});

export const {
  addToFavourites,
  removeFromFavourites,
  addToLargestCity,
  removeFromLargestCity,
} = favouriteSlice.actions;

export default favouriteSlice.reducer;
