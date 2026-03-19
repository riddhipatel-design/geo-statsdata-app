import React from "react";
import { useEarthquakes } from "./hooks/useEarthquakes";
import ChartPanel from "./components/ChartPanel";
import DataPanel from "./components/DataPanel";

export default function App() {
  const { data, isLoading } = useEarthquakes();

 if (isLoading) return <div className="p-4">Loading...</div>;

if (!data || data.length === 0) {
  return <div className="p-4">No data found</div>;
}

  return (
   <div className="flex flex-col md:flex-row gap-4 p-4">
  {/* Chart Panel */}
  <div className="md:w-1/2 w-full min-h-[600px]">
    <ChartPanel data={data} />
  </div>

  {/* Data Panel */}
  <div className="md:w-1/2 w-full min-h-[600px]">
    <DataPanel data={data} />
  </div>
</div>
  );
}