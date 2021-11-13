import "@testing-library/jest-dom/extend-expect";
import {generateRandomString} from "./generateRandomString";

test("gets the time of the day", () => {
  const str1 = generateRandomString(10)
  const str2 = generateRandomString(10)
  expect(str1).not.toEqual(str2);
});
