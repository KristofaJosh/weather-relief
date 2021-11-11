import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../utils/apis";
import { filterLargestCities } from "../../../helpers/filterLargestCities";
import { locationType } from "../types";
import { largestCityType } from "../../../../utils/apis/types";

export const setLargestCity = createAsyncThunk(
  "setLargestCity",
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
