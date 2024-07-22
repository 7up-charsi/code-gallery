export type WeatherForcast = {
  timezone: string;
  current: {
    time: string;
    interval: number;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    is_day: number;
    precipitation: number;
    rain: number;
    showers: number;
    snowfall: number;
    weather_code: number;
    cloud_cover: number;
    pressure_msl: number;
    surface_pressure: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    wind_gusts_10m: number;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    apparent_temperature: number[];
    rain: number[];
  };
  daily: {
    time: string[]; // 2024-07-08
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    apparent_temperature_max: number[];
    apparent_temperature_min: number[];
    sunrise: string[]; // 2024-07-02T00:01
    sunset: string[]; // 2024-07-02T14:16
    daylight_duration: number[];
    sunshine_duration: number[];
    uv_index_max: number[];
    uv_index_clear_sky_max: number[];
    precipitation_sum: number[];
    rain_sum: number[];
    showers_sum: number[];
    snowfall_sum: number[];
    precipitation_hours: number[];
    precipitation_probability_max: number[];
    wind_speed_10m_max: number[];
    wind_gusts_10m_max: number[];
    wind_direction_10m_dominant: number[];
    shortwave_radiation_sum: number[];
    et0_fao_evapotranspiration: number[];
  };
};

export type GeoCodeResponse =
  | {
      status: 'ZERO_RESULTS';
    }
  | {
      results: {
        address_components: {
          long_name: string;
          short_name: string;
          types: (
            | 'postal_code_suffix'
            | 'street_number'
            | 'route'
            | 'locality'
            | 'political'
            | 'administrative_area_level_2'
            | 'political'
            | 'administrative_area_level_1'
            | 'political'
            | 'country'
            | 'political'
            | 'postal_code'
          )[];
        }[];
        formatted_address: string;
        geometry: {
          location: { lat: number; lng: number };
          location_type: string;
          viewport: {
            northeast: {
              lat: number;
              lng: number;
            };
            southwest: {
              lat: number;
              lng: number;
            };
          };
        };
        place_id: string;
        plus_code: {
          compound_code: string;
          global_code: string;
        };
        types: string[];
      }[];
      status: 'OK';
    };

export type GeoCode = {
  address: string;
  lat: number;
  lng: number;
};
