'use client';

import { useWeatherForcastCtx } from '@/providers';
import { formatTime, getActiveHour } from '@/utils';
import { toZonedTime } from 'date-fns-tz';
import useEmblaCarousel from 'embla-carousel-react';
import { CloudRainIcon } from 'lucide-react';
import React from 'react';

interface HourlyForcastProps {}

const displayName = 'HourlyForcast';

export const HourlyForcast = (props: HourlyForcastProps) => {
  const {} = props;

  const {
    data: weatherData,
    loading,
    error,
  } = useWeatherForcastCtx(displayName);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    skipSnaps: true,
  });

  const modifiedData = React.useMemo(() => {
    const data = weatherData?.hourly;

    if (!data) return;

    const currentDate = toZonedTime(new Date(), weatherData.timezone);

    return Array.from({ length: 24 }).map((_, i) => {
      const date = new Date(data.time[i]);

      return {
        date,
        temp: data.temperature_2m[i],
        feels: data.apparent_temperature[i],
        rain: data.rain[i],
        isActive: getActiveHour(date, currentDate),
      };
    });

    //
  }, [weatherData]);

  React.useEffect(() => {
    const activeHourIndex = modifiedData?.findIndex(
      (ele) => ele.isActive,
    );

    if (!activeHourIndex) return;

    emblaApi?.scrollTo(+activeHourIndex, true);
  }, [emblaApi, modifiedData]);

  if (error) return;

  return (
    <div className="mt-5">
      <h2 className="text-lg font-medium capitalize">
        hourly forcast
      </h2>

      {/* TODO: update this with skeletons */}
      {loading && 'loading...'}

      {!loading && modifiedData && (
        <div ref={emblaRef} className="mt-3 overflow-hidden">
          <div className="flex gap-3">
            {modifiedData.map(
              ({ date, isActive, rain, temp, feels }) => (
                <div
                  key={date.toString()}
                  data-active={isActive}
                  className="flex w-36 shrink-0 select-none flex-col items-center rounded border border-transparent bg-muted-2 px-3 py-2 data-[active=true]:border-primary-7 data-[active=true]:bg-primary-3 data-[active=true]:text-primary-11"
                >
                  <span className="text-sm">{formatTime(date)}</span>

                  <span className="mt-3 text-xl font-semibold">
                    {temp}&deg;
                  </span>

                  <span className="flex items-center text-sm">
                    Feels like
                    <span className="ml-2 text-lg font-medium">
                      {feels}&deg;
                    </span>
                  </span>

                  <span className="mt-3 flex items-center gap-1">
                    <CloudRainIcon className="" />
                    <span className="ml-1 text-lg font-medium">
                      {rain}%
                    </span>
                  </span>
                </div>
              ),
            )}
          </div>
        </div>
      )}
    </div>
  );
};

HourlyForcast.displayName = displayName;
