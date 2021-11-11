import { locationType } from "../store/reducers/types";

/**
 * Exclude list from original Array
 * @param originalArr
 * @param excludeArr
 */
export const excludeFromList = (
  originalArr: locationType[],
  excludeArr: locationType[],
) => {
  if (!excludeArr.length) {
    return originalArr;
  }
  const copyExArr = [...excludeArr];
  const result =  originalArr.filter((cur) => {
    for (let x = 0; x < copyExArr.length; x++) {
      if (cur.request.query === copyExArr[x].request.query) {
        copyExArr.splice(x, 1);
        return null
      }
    }
    return cur;
  });
  return result;
};
