'use client';

import { openMeteoParams } from '@/constants';
import { GeoCode, GeoCodeResponse, WeatherForcast } from '@/types';
import React from 'react';
import { createContextScope } from '@typeweave/react';

type ErrorTypes = 'invalidPlace' | 'accessDenied' | 'unknown';

interface WeatherForcastProviderProps {
  children: React.ReactNode;
}

const displayName = 'WeatherForcastProvider';

type WeatherForcastCtxProps = {
  data: WeatherForcast | null;
  geoCode: GeoCode | null;
  loading: boolean;
  error: ErrorTypes | null;
  isCurrentCity: boolean;
  fetchOnPlaceSelect: (
    place_id: string,
    signal?: AbortSignal,
  ) => Promise<void>;
  fetchUsingUserCoords: () => Promise<void>;
};

const [WeatherForcastCtx, useWeatherForcastCtx] =
  createContextScope<WeatherForcastCtxProps>(displayName);

export { useWeatherForcastCtx };

export const WeatherForcastProvider = (
  props: WeatherForcastProviderProps,
) => {
  const { children } = props;

  const paramsRef = React.useRef(
    new URLSearchParams(openMeteoParams),
  ).current;

  const userPlaceIdRef = React.useRef('');

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<ErrorTypes | null>(null);
  const [data, setData] = React.useState<WeatherForcast | null>(null);
  const [geoCode, setGeoCode] = React.useState<GeoCode | null>(null);
  const [isCurrentCity, setIsCurrentCity] = React.useState(true);

  const getWeatherData = React.useCallback(async () => {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?${paramsRef}`,
    );

    const weatherData = await res.json();

    if (!weatherData) throw { status: 'unknown' };

    console.log(weatherData);

    return weatherData;
  }, [paramsRef]);

  const fetchOnPlaceSelect = React.useCallback(
    async (place_id: string, signal?: AbortSignal) => {
      paramsRef.delete('latitude');
      paramsRef.delete('longitude');
      setLoading(true);
      setData(null);
      setGeoCode(null);
      setError(null);

      try {
        const res = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?place_id=${place_id}&key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_KEY}`,
          { signal },
        );

        const geocodeData = (await res.json()) as GeoCodeResponse;

        if (geocodeData.status !== 'OK') throw geocodeData;

        const geoLocation = geocodeData.results[0];

        const latitude = geoLocation.geometry.location.lat;
        const longitude = geoLocation.geometry.location.lng;

        paramsRef.set('latitude', latitude.toString());
        paramsRef.set('longitude', longitude.toString());

        const weatherData = await getWeatherData();

        setIsCurrentCity(
          geoLocation.place_id === userPlaceIdRef.current,
        );

        setData(weatherData);

        setGeoCode({
          address: geoLocation.formatted_address,
          lat: geoLocation.geometry.location.lat,
          lng: geoLocation.geometry.location.lng,
        });

        setLoading(false);
      } catch (error) {
        const err = error as {
          name: string;
          status: 'DENIED' | 'ZERO_RESULTS';
        };

        if (err.name === 'AbortError') return;

        setLoading(false);
        setData(null);
        setGeoCode(null);

        if (err.status === 'DENIED') {
          setError('accessDenied');
          return;
        }

        if (err.status === 'ZERO_RESULTS') {
          setError('invalidPlace');
          return;
        }

        setError('unknown');
      }
    },
    [getWeatherData, paramsRef],
  );

  const fetchUsingUserCoords = React.useCallback(async () => {
    paramsRef.delete('latitude');
    paramsRef.delete('longitude');
    setLoading(true);
    setData(null);
    setGeoCode(null);
    setError(null);
    setIsCurrentCity(true);

    try {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          paramsRef.set('latitude', latitude.toString());
          paramsRef.set('longitude', longitude.toString());

          const res = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&result_type=locality&key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_KEY}`,
          );

          const geocodeData = (await res.json()) as GeoCodeResponse;

          if (geocodeData.status !== 'OK') throw geocodeData;

          const geoLocation = geocodeData.results[0];

          const weatherData = await getWeatherData();

          userPlaceIdRef.current = geoLocation.place_id;

          setData(weatherData);

          setGeoCode({
            address: geoLocation.formatted_address,
            lat: geoLocation.geometry.location.lat,
            lng: geoLocation.geometry.location.lng,
          });

          setLoading(false);
        },
        () => {
          throw { status: 'DENIED' };
        },
        { enableHighAccuracy: true },
      );
    } catch (error) {
      const err = error as {
        name: string;
        status: 'DENIED' | 'ZERO_RESULTS';
      };

      if (err.name === 'AbortError') return;

      setLoading(false);
      setData(null);
      setGeoCode(null);

      if (err.status === 'DENIED') {
        setError('accessDenied');
        return;
      }

      if (err.status === 'ZERO_RESULTS') {
        setError('invalidPlace');
        return;
      }

      setError('unknown');
    }
  }, [getWeatherData, paramsRef]);

  React.useEffect(() => {
    fetchUsingUserCoords();
  }, [fetchUsingUserCoords]);

  return (
    <WeatherForcastCtx
      data={data}
      geoCode={geoCode}
      error={error}
      loading={loading}
      fetchOnPlaceSelect={fetchOnPlaceSelect}
      fetchUsingUserCoords={fetchUsingUserCoords}
      isCurrentCity={isCurrentCity}
    >
      {children}
    </WeatherForcastCtx>
  );
};

WeatherForcastProvider.displayName = displayName;
