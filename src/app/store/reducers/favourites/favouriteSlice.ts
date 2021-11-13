import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import { locationType } from "../types";
import {largestCityType} from "../../../../utils/apis/types";
import api from "../../../../utils/apis";
import {filterLargestCities} from "../../../helpers/filterLargestCities";


export const setLargestCity = createAsyncThunk(
  "favourites/setLargestCity",
  async ({ size = 5, list }: { size?: number; list?: locationType[] }) => {
    const getCityList = async (): Promise<any> => {
      if (list && list.length) {
        return new Promise((resolve) => {
          const response = list.reduce((res: largestCityType[], cur) => {
            res.push({
              Name: cur.location.name,
              Country: cur.location.country,
              Population: cur.location.population,
            });
            return res;
          }, []);
          resolve({ data: { record: response } });
        });
      }
      return api.allCities();
    };

    try {
      const response = await getCityList();
      return await filterLargestCities(
        response.data.record,
        (list && list.length) || size,
        true
      ).then((result) => {
        return result;
      });
    } catch (error: any) {
      throw error;
    }
  }
);


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
