export const getLocation = new Promise(
  (resolve: (res: GeolocationPosition) => void, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (res) => {
          resolve(res);
        },
        () => {
          reject("failed");
        }
      );
    } else {
      reject("failed");
    }
  }
);
