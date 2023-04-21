export interface ICity {
  id: number;
  name: string;
  country: string;
  [key: string]: unknown;
}

export interface ICityWeather {
  name: string;
  id: number;
  sys: {
    country: string;
  };
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