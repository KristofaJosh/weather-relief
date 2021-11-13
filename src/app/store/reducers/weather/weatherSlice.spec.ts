import weatherReducer, { updateDefaultWeather } from "./weatherSlice";

const sampleLocationData = {
  lastQuery: "",
  defaultLoc: "Germany",
  currentLoc: "",
  myLocation: {
    request: {
      type: "string",
      query: "string",
      language: "en",
      unit: "m",
    },
    location: {
      country: "Nigeria",
      name: "Delta",
      region: "Asaba",
      localtime: "time",
      utc_offset: "9.0",
      population: 0,
    },
    current: {
      is_day: "yes",
      feelslike: "string",
      humidity: "string",
      temperature: "string",
      weather_descriptions: ["info"],
      cloudcover: "string",
      pressure: "string",
      precip: "string",
      uv_index: "string",
      wind_degree: "string",
      wind_dir: "string",
      wind_speed: "string",
    },
  },
  error: null,
};

describe("favourite reducer", () => {
  const initialState = {
    lastQuery: "",
    defaultLoc: "Germany",
    currentLoc: "",
    myLocation: {
      request: {
        type: "",
        query: "",
        language: "",
        unit: "m",
      },
      location: {
        name: "",
        region: "",
        localtime: "",
      },
      current: {
        is_day: "yes",
        feelslike: "",
        humidity: "",
        temperature: "",
        weather_descriptions: [""],
      },
    },
    error: null,
  };

  it("should handle initial state", () => {
    expect(weatherReducer(undefined, { type: "unknown" })).toEqual({
      lastQuery: "",
      defaultLoc: "Germany",
      currentLoc: "",
      myLocation: {
        request: {
          type: "",
          query: "",
          language: "",
          unit: "m",
        },
        location: {
          name: "",
          region: "",
          localtime: "",
        },
        current: {
          is_day: "yes",
          feelslike: "",
          humidity: "",
          temperature: "",
          weather_descriptions: [""],
        },
      },
      error: null,
    });
  });

  it("should update preferred startup location", () => {
    const actual = weatherReducer(
      initialState,
      updateDefaultWeather({ name: "Frankfurt" })
    );
    expect(actual.defaultLoc).not.toEqual("Germany");
    expect(actual.defaultLoc).toEqual("Frankfurt");
  });
});
