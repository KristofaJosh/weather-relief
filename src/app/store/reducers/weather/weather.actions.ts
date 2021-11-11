import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../utils/apis";

const getWeatherReport = createAsyncThunk(
  "authentication/loginStatus",
  async (entry: any, { rejectWithValue }) => {
    try {
      const response = await api.all();
      return {
        ...response.data,
      };
    } catch (error: any) {
      if (error) {
        return rejectWithValue({
          message: `${error.response?.data?.error || error?.response?.message}`,
        });
      }
      throw error;
    }
  }
);

const refreshWeather = createAsyncThunk(
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

const getSingleCity = createAsyncThunk(
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

export { refreshWeather, getWeatherReport, getSingleCity };
