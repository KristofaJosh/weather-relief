export const greeting = (hour = new Date().getHours()) => {
  let period;

  if (hour >= 0 && hour < 12) {
    period = "good morning";
  } else if (hour >= 12 && hour < 16) {
    period = "good afternoon";
  } else if (hour >= 16 && hour < 21) {
    period = "good evening";
  } else if (hour >= 21 && hour < 24) {
    period = "good night";
  } else {
    period = "good day";
  }
  return period;
};
