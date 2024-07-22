'use client';

import { weatherCodes } from '@/constants';
import { useWeatherForcastCtx } from '@/providers';
import { MapPinIcon } from 'lucide-react';
import React from 'react';
import { InfoCard } from './info-card';

interface TodayForcastProps {}

const displayName = 'TodayForcast';

const formatDateTimeString = "yyyy-MM-dd'T'HH':'mm";

export const TodayForcast = (props: TodayForcastProps) => {
  const {} = props;

  const { data, error, geoCode, loading } =
    useWeatherForcastCtx(displayName);

  if (error === 'accessDenied') {
    return (
      <main className="px-5">
        <InfoCard>
          We couldn&apos;t find your location. Search by city or zip
          code.
        </InfoCard>
      </main>
    );
  }

  if (error === 'invalidPlace') {
    return (
      <main className="px-5">
        <InfoCard>
          Selected place does not exist in google maps.
        </InfoCard>
      </main>
    );
  }

  // TODO: update this errors

  if (error === 'unknown')
    return 'something went wrong. please wait...';

  return (
    <>
      <h1 className="mt-5 text-lg font-medium capitalize">
        Today forcast
      </h1>

      {/* TODO: update this with skeletons */}
      {loading && 'loading...'}

      {!loading && data && geoCode && (
        <article className="mt-2 rounded bg-muted-2 p-4">
          <h2 className="flex items-center text-lg font-medium text-muted-12">
            <MapPinIcon size={22} className="mr-2" />
            <span className="capitalize">{geoCode.address}</span>
          </h2>

          <div className="my-10 flex flex-col items-center justify-center space-y-3">
            <span className="relative flex items-start text-7xl font-bold text-muted-12">
              {data.current.temperature_2m}
              <span className="absolute left-full top-0">&deg;</span>
            </span>

            <span className="flex items-center text-lg text-muted-12">
              Feels like
              <span className="ml-2 text-2xl font-medium">
                {data.current.apparent_temperature}&deg;
              </span>
            </span>

            <div className="flex justify-center gap-7 text-sm">
              <span className="font-medium capitalize">
                humidity
                <span className="ml-2 font-normal">
                  {data.current.relative_humidity_2m}%
                </span>
              </span>

              <span className="font-medium capitalize">
                wind
                <span className="ml-2 font-normal">
                  {data.current.wind_speed_10m}km/h
                </span>
              </span>
            </div>

            <span className="text-center">
              {weatherCodes[data.current.weather_code]}
            </span>
          </div>
        </article>
      )}
    </>
  );
};

TodayForcast.displayName = displayName;
