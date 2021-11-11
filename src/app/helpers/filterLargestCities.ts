import { largestCityType } from "../../utils/apis/types";
import api from "../../utils/apis";
import { locationType } from "../store/reducers/types";

export const filterLargestCities = (
  cityList: largestCityType[],
  size: number = 5,
  refresh: boolean
): Promise<locationType[]> => {
  const largestCities: largestCityType[] = [];

  for (let count = 0; count !== size; count++) {
    largestCities.push(
      api.getCity(cityList[count].Name, refresh).then((res) => {
        return new Promise((resolve, reject) => {
          const checkErr: any = res.data;
          if (checkErr.hasOwnProperty("success") && !checkErr.success) {
            reject(res.data.error);
            return;
          }
          resolve({
            ...res.data,
            location: {
              ...res.data.location,
              population: cityList[count].Population,
            },
          });
        });
      }) as any
    );
  }
  return Promise.all(largestCities as any);
};
