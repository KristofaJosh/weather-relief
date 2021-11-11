import { AxiosResponse } from "axios";

class CacheRequest {
  private storage: {};
  private readonly key: string;

  constructor(key?: string) {
    this.key = key || "weather-relief-cache";
    this.storage = {};
    if (!localStorage.getItem(this.key)) {
      localStorage.setItem(this.key, JSON.stringify({}));
    }
  }
  setData(response: AxiosResponse) {
    const data = JSON.parse(localStorage.getItem(this.key) as string);
    const cacheUrl = `${response.config.url}:${JSON.stringify(
      response.config.params
    )}`;
    const newData = {
      ...data,
      [cacheUrl]: {
        timeStamp: new Date().getTime(),
        response,
      },
    };
    localStorage.setItem(this.key, JSON.stringify(newData));
  }
  getData(ref: string) {
    try {
      const data = JSON.parse(localStorage.getItem(this.key) as string);
      if (data[ref]) {
        const _d = data[ref];
        const timePast30min = new Date(_d.timeStamp);
        timePast30min.setMinutes(timePast30min.getMinutes() + 30);
        // compare saved time + 30minutes > current time
        if (timePast30min.getTime() > new Date().getTime()) {
          return _d.response;
        }
      }
      return null;
    } catch (e) {
      return null;
    }
  }
}

export default CacheRequest;
