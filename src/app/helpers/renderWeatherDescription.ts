import {IconCloudy, IconCloudyDay, IconDay, IconPatchyRain, IconSnowy, IconThunder} from "../assets/icons";

export const renderWeatherDescription = (weatherDescription: string) => {
  switch (weatherDescription?.toLowerCase() || '') {
    case "cloudy":
      return IconCloudy;
    case "patchy rain possible":
      return IconPatchyRain;
    case "thunderstorm":
      return IconThunder;
      case "haze":
      return IconCloudyDay;
    case "sunny":
      return IconDay
    case "snowy":
      return IconSnowy
    default:
      return IconCloudy;
  }
};
