"use client"

import { DailyStepsChart } from "./charts/DailyStepsChart";
import { HeartRateChart } from "./charts/HeartRateChart";
import { ProgressChart } from "./charts/ProgressChart";
import { WalkingDistanceChart } from "./charts/WalkingDistanceChart";
import { ActivityChart } from "./charts/ActivityChart";
import { RadialBarChartComponent } from "./charts/RadialBarChartComponent";
import { ActiveEnergyChart } from "./charts/ActiveEnergyChart";
import { TimeInBedChart } from "./charts/TimeInBedChart";

export function Dashboard() {
  return (
    <div className="chart-wrapper mx-auto flex max-w-6xl flex-col flex-wrap items-start justify-center gap-6 p-6 sm:flex-row sm:p-8">
      <div className="grid w-full gap-6 sm:grid-cols-2 lg:max-w-[22rem] lg:grid-cols-1 xl:max-w-[25rem]">
        <DailyStepsChart />
        <HeartRateChart />
      </div>
      <div className="grid w-full flex-1 gap-6 lg:max-w-[20rem]">
        <ProgressChart />
        <WalkingDistanceChart />
        <ActivityChart />
      </div>
      <div className="grid w-full flex-1 gap-6">
        <RadialBarChartComponent />
        <ActiveEnergyChart />
        <TimeInBedChart />
      </div>
    </div>
  );
}
