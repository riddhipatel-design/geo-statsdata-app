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
    <div className="flex gap-4 p-4">
      <ChartPanel data={data} />
      <DataPanel data={data} />
    </div>
  );
}