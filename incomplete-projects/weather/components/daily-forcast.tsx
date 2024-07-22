'use client';

import { weekdays } from '@/constants/week-days';
import { useWeatherForcastCtx } from '@/providers';
import { formatTime, getActiveHour } from '@/utils';
import { toZonedTime } from 'date-fns-tz';
import useEmblaCarousel from 'embla-carousel-react';
import { CloudRainIcon } from 'lucide-react';
import React from 'react';

interface DailyForcastProps {}

const displayName = 'DailyForcast';

export const DailyForcast = (props: DailyForcastProps) => {
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
    const data = weatherData?.daily;

    if (!data) return;

    const currentDate = toZonedTime(new Date(), weatherData.timezone);

    // i rely on data.time to determine the number of days included in the weather data. This is because data.time contains days time
    return data.time.map((_, i) => {
      const date = new Date(data.time[i]);

      return {
        temp: data.temperature_2m_max[i],
        feels: data.apparent_temperature_max[i],
        rain: data.rain_sum[i],
        date,
        isActive: date.getDate() === currentDate.getDate(),
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
        7 days forcast
      </h2>

      {/* TODO: update this with skeletons */}
      {loading && 'loading...'}

      {!loading && modifiedData && (
        <div ref={emblaRef} className="mt-3 overflow-hidden">
          <div className="flex gap-3">
            {modifiedData.map(
              ({ date, isActive, rain, feels, temp }) => (
                <span
                  key={date.toString()}
                  data-active={isActive}
                  className="flex w-36 shrink-0 select-none flex-col items-center rounded border border-transparent bg-muted-2 px-3 py-2 data-[active=true]:border-primary-7 data-[active=true]:bg-primary-3 data-[active=true]:text-primary-11"
                >
                  <span className="text-sm">
                    {weekdays[date.getDay()]}
                  </span>

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
                </span>
              ),
            )}
          </div>
        </div>
      )}
    </div>
  );
};

DailyForcast.displayName = displayName;
