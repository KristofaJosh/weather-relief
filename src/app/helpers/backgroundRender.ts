export const backgroundRender = () => {
  const hour = new Date().getHours();
  if (hour > 3 && hour < 6) {
    return "./images/img_4.png";
  } else if (hour > 5 && hour < 8) {
    return "./images/img_6.png";
  } else if (hour > 7 && hour < 10) {
    return "./images/img_8.png";
  } else if (hour > 9 && hour < 12) {
    return "./images/img_10.png";
  } else if (hour > 11 && hour < 14) {
    return "./images/img_12.png";
  } else if (hour > 13 && hour < 16) {
    return "./images/img_14.png";
  } else if (hour > 15 && hour < 18) {
    return "./images/img_16.png";
  } else if (hour > 17 && hour < 20) {
    return "./images/img_18.png";
  } else if (hour > 19 && hour < 22) {
    return "./images/img_20.png";
  } else if (hour > 21 && hour < 24) {
    return "./images/img_22.png";
  } else if (hour >= 0 && hour < 4) {
    return "./images/img_24.png";
  }
};
