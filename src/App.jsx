import React from "react";
import { useEarthquakes } from "./hooks/useEarthquakes";
import ChartPanel from "./components/ChartPanel";
import DataPanel from "./components/DataPanel";
import Shimmer from "./components/Shimmer";

export default function App() {
  const { data, isLoading } = useEarthquakes();

  if (isLoading) {
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 h-screen">
      <div className="md:w-1/2 w-full flex-1">
        <Shimmer type="chart" />
      </div>
      <div className="md:w-1/2 w-full flex-1">
        <Shimmer type="table" rows={8} />
      </div>
    </div>
  );
}
  if (!data || data.length === 0) return <div className="p-4">No data found</div>;

  return (
   <div className="flex flex-col lg:flex-row gap-4 p-4 h-screen">
  {/* Chart Panel */}
  <div className="w-full lg:w-1/2 flex-1">
    <ChartPanel data={data} />
  </div>

  {/* Data Panel */}
  <div className="w-full lg:w-1/2 flex-1">
    <DataPanel data={data} />
  </div>
</div>
  );
}