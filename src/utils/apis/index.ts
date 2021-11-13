import weatherRequest from "./request";

const api = {
  getCity: (location: string, hardRefresh?: boolean) =>
    weatherRequest(
      { url: "/current", params: { query: location } },
      hardRefresh
    ),
  allCities: (refresh?: boolean) => {
    return weatherRequest(
      {
        baseURL: "https://api.jsonbin.io/v3/b/",
        url: "6186b35a820eda3cc818c27a",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key":
            ("$2b$10$j9xK9su3od8tZqSglBb0SOM7Tb6hPkNoK1ftyTOa2q4cCl" +
              process.env.REACT_APP_CITIES_KEY) as string,
        },
      },
      refresh
    );
  },
};

export default api;
