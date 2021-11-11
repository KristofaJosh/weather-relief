export const generateRandomString = (size: number = 5) => {
  return Array(size < 1 ? 3 : size > 20 ? 20 : size)
    .fill("")
    .map(() =>
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".charAt(
        Math.random() * 62
      )
    )
    .join("");
};
