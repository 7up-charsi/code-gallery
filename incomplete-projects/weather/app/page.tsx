import React from 'react';
import { DailyForcast } from '@/components/daily-forcast';
import { HourlyForcast } from '@/components/hourly-forcast';
import { TodayForcast } from '@/components/today-forcast';

export default function Page() {
  return (
    <main className="px-5 pb-5">
      <TodayForcast />
      <HourlyForcast />
      <DailyForcast />
    </main>
  );
}

