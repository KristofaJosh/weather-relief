import { combineReducers } from "@reduxjs/toolkit";
import weatherReducer from "./weather/weather.reducer";
import favouriteReducer from "./favourites/fav.reducer";
import noteReducer from "./notes/notes.reducer";

export const rootReducer = combineReducers({
  favourites: favouriteReducer,
  weather: weatherReducer,
  notes: noteReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
