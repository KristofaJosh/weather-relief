import "@testing-library/jest-dom/extend-expect";
import { greeting } from "./greeting";

type time = "mornings" | "afternoons" | "evenings" | "nights";
type hoursType = {
  [k in time]: number[];
};

test("gets the time of the day", () => {
  const mornings = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const afternoons = [12, 13, 14, 15];
  const evenings = [16, 17, 18, 19, 20];
  const nights = [21, 22, 23];
  const hours = <hoursType>{ mornings, afternoons, evenings, nights };

  const resolve = () => {
    let result: any = {};
    for (let hour in hours) {
      if (hours.hasOwnProperty(hour)) {
        // @ts-ignore
        result[hour] = hours[hour].map((e: number) => {
          return greeting(e);
        });
      }
    }
    return result;
  };

  const expected = {
    mornings: Array(12).fill("good morning"),
    afternoons: Array(4).fill("good afternoon"),
    evenings: Array(5).fill("good evening"),
    nights: Array(3).fill("good night"),
  };

  expect(resolve()).toEqual(expected);
});
