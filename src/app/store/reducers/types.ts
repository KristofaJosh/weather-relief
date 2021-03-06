export type locationType = {
  request: {
    type: string;
    query: string;
    language: string;
    unit: string;
  };
  location: {
    country: string;
    name: string;
    region: string;
    localtime: string;
    utc_offset: string;
    population: number;
  };
  current: {
    is_day: string | boolean;
    feelslike: string;
    humidity: string;
    temperature: string;
    weather_descriptions: string[];
    cloudcover: string;
    pressure: string;
    precip: string;
    uv_index: string;
    wind_degree: string;
    wind_dir: string;
    wind_speed: string;
  };
};

export type noteTypeBody = { title: string; description: string }
export type noteType = {
  [k in string]: {
    idx: string;
    body: noteTypeBody;
  }[];
};
