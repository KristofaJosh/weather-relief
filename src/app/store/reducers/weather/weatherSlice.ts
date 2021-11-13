import {createAsyncThunk, createSlice, isAnyOf, PayloadAction} from "@reduxjs/toolkit";
import api from "../../../../utils/apis";

export const refreshWeather = createAsyncThunk(
  "refresh",
  async (currentLoc: string) => {
    const [loc] = currentLoc.split(":");
    try {
      const response = await api.getCity(loc, true);
      return { ...response.data };
    } catch (error: any) {
      alert(error?.response?.message || error?.info || 'Something is not right!');
      throw error;
    }
  }
);

export const getSingleCity = createAsyncThunk(
  "getCity",
  async ({ location, refresh }: { location: string; refresh?: boolean }) => {
    try {
      const response = await api.getCity(location, refresh);
      return { ...response.data, query: location };
    } catch (error: any) {
      alert(error?.response?.message || error?.info || 'Something is not right!');
      throw error;
    }
  }
);

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
