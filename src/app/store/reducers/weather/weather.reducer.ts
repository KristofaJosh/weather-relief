import {createSlice, isAnyOf, PayloadAction} from "@reduxjs/toolkit";
import {
  getSingleCity,
  getWeatherReport,
  refreshWeather,
} from "./weather.actions";


export const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    lastQuery: "",
    defaultLoc: "Germany",
    currentLoc: "",
    myLocation: {
      request: {
        type: "",
        query: "",
        language: "",
        unit: "m",
      },
      location: {
        name: "",
        region: "",
        localtime: "",
      },
      current: {
        is_day: "yes",
        feelslike: "",
        humidity: "",
        temperature: "",
        weather_descriptions: [""],
      },
    },
    error: null,
  },
  reducers: {
    updateDefaultWeather: (state, action: PayloadAction<{name: string}>) => {
      state.defaultLoc = action.payload.name;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getWeatherReport.fulfilled, (state, action) => {
      state.defaultLoc = action.payload;
    });
    builder.addMatcher(
      isAnyOf(getSingleCity.fulfilled, refreshWeather.fulfilled),
      (state, action) => {
        state.lastQuery = action.payload.query;
        state.myLocation = action.payload;
        state.currentLoc = `${action.payload.location.name}:${action.payload.location.region}`;
      }
    );
    builder.addMatcher(
        isAnyOf(getSingleCity.rejected, refreshWeather.rejected),
        (state, action) => {
          state.error = action.payload as any;
        }
    );
  },
});

export const { updateDefaultWeather } = weatherSlice.actions;

export default weatherSlice.reducer;
