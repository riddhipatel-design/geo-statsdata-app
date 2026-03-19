import React, { useState, useMemo } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedEarthquake } from "../redux/store";
import Dropdown from "./Dropdown";

export default function ChartPanel({ data }) {
  const dispatch = useDispatch();

  const selected = useSelector(
    (state) => state.earthquake.selectedEarthquake
  );
  const search = useSelector((state) => state.earthquake.search);

  const [xKey, setXKey] = useState("mag");
  const [yKey, setYKey] = useState("depth");

  const numericOptions = [
    { label: "Magnitude", value: "mag" },
    { label: "Depth", value: "depth" },
    { label: "Latitude", value: "latitude" },
    { label: "Longitude", value: "longitude" }
  ];

  // ✅ Filter data based on search (memoized for performance)
  const filteredData = useMemo(() => {
    return data.filter((row) =>
      row.place?.toLowerCase().includes((search || "").toLowerCase())
    );
  }, [data, search]);

  // ✅ Correct click handler (important fix)
  const handleClick = (point) => {
    if (point && point.payload) {
      dispatch(setSelectedEarthquake(point.payload));
    }
  };

  // ✅ (Optional) Hover sync (can comment if too sensitive)
  const handleHover = (point) => {
    if (point && point.payload) {
      dispatch(setSelectedEarthquake(point.payload));
    }
  };

  // ✅ Custom Tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;

      return (
        <div className="bg-white p-3 border rounded shadow text-sm space-y-1">
          <p className="font-semibold text-blue-600">{d.place}</p>
          <p>Mag: {d.mag}</p>
          <p>Depth: {d.depth}</p>
          <p className="text-gray-500 text-xs">
            {new Date(d.time).toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-4 mt-5 ml-2 bg-white shadow rounded">
      
      {/* Dropdown Controls */}
      <div className="mb-4 flex gap-4">
        <Dropdown
          label="X-Axis"
          value={xKey}
          options={numericOptions}
          onChange={setXKey}
        />

        <Dropdown
          label="Y-Axis"
          value={yKey}
          options={numericOptions}
          onChange={setYKey}
        />
      </div>

      {/* Chart */}
      <ScatterChart width={600} height={500}>
        <CartesianGrid />
        <XAxis dataKey={xKey} />
        <YAxis dataKey={yKey} />

        {/* Custom Tooltip */}
        <Tooltip content={<CustomTooltip />} />

        <Scatter
          data={filteredData}
          onClick={handleClick}
          onMouseEnter={handleHover} // optional but powerful
          shape={(props) => {
            const { cx, cy, payload } = props;
            const isSelected = selected?.id === payload?.id;

            return (
              <circle
                cx={cx}
                cy={cy}
                r={isSelected ? 8 : 5}
                fill={isSelected ? "red" : "#8884d8"}
              />
            );
          }}
        />
      </ScatterChart>

      {/* Optional: show count */}
      <p className="text-sm text-gray-500 mt-2">
        {search
          ? `Showing ${filteredData.length} of ${data.length} results`
          : `Total: ${data.length} records`}
      </p>
    </div>
  );
}