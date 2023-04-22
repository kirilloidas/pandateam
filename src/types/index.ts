export interface ICity {
  id: number;
  name: string;
  country: string;
  [key: string]: unknown;
}

export interface IWeather {
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
    pressure: number;
  };
  wind: {
    speed: number;
  };
  weather: {
    description: string;
    icon: string;
    main: string;
  }[];
}

export interface ICityResponse {
  id: number;
  name: string;
  sys: {
    country: string;
  };
}

export interface ICityWeather extends IWeather, ICityResponse { }

export interface IHourlyWeather extends IWeather {
  dt: number;
  dt_txt: string;
}