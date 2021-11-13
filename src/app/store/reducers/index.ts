import { combineReducers } from "@reduxjs/toolkit";
import weatherReducer from "./weather/weatherSlice";
import favouriteReducer from "./favourites/favouriteSlice";
import noteReducer from "./notes/notesSlice";

export const rootReducer = combineReducers({
  favourites: favouriteReducer,
  weather: weatherReducer,
  notes: noteReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
