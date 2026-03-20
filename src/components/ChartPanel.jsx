import React, { useState, useMemo } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedEarthquake, setHoveredEarthquake } from "../redux/store";
import Dropdown from "./Dropdown";

export default function ChartPanel({ data }) {
  const dispatch = useDispatch();
  const selected = useSelector((state) => state.earthquake.selectedEarthquake);
  const hovered = useSelector((state) => state.earthquake.hoveredEarthquake);
  const search = useSelector((state) => state.earthquake.search);

  const [xKey, setXKey] = useState("mag");
  const [yKey, setYKey] = useState("depth");

  const numericOptions = [
    { label: "Magnitude", value: "mag" },
    { label: "Depth", value: "depth" },
    { label: "Latitude", value: "latitude" },
    { label: "Longitude", value: "longitude" },
  ];

  const filteredData = useMemo(
    () =>
      data.filter((row) =>
        row.place?.toLowerCase().includes((search || "").toLowerCase())
      ),
    [data, search]
  );

  const handleClick = (point) => {
    if (point?.payload) dispatch(setSelectedEarthquake(point.payload));
  };
  const handleHover = (point) => {
    if (point?.payload) dispatch(setHoveredEarthquake(point.payload));
  };
  const handleLeave = () => dispatch(setHoveredEarthquake(null));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg text-sm space-y-1 border border-gray-200">
          <p className="font-semibold text-blue-600">{d.place}</p>
          <p>Mag: {d.mag}</p>
          <p>Depth: {d.depth}</p>
          <p className="text-gray-500 text-xs">{new Date(d.time).toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  const getNiceMax = (value) => {
    const step = 20;
    return Math.ceil((value + 20) / step) * step;
  };
  const maxY = Math.max(...filteredData.map((d) => Number(d[yKey]) || 0));
  const niceMax = getNiceMax(maxY);
  const ticks = Array.from({ length: niceMax / 20 + 1 }, (_, i) => i * 20);

  return (
    <div className="bg-white rounded-xl shadow-lg flex flex-col p-4 h-full">
      {/* Axis Controls */}
      <div className="mb-4 flex flex-col sm:flex-row gap-4 items-center">
        <Dropdown label="X-Axis" value={xKey} options={numericOptions} onChange={setXKey} />
        <Dropdown label="Y-Axis" value={yKey} options={numericOptions} onChange={setYKey} />
      </div>

      {/* Chart */}
      <div className="w-full flex-1 min-h-[600px]">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart>
            <CartesianGrid strokeDasharray="2 2" />
            <XAxis dataKey={xKey} />
            <YAxis dataKey={yKey} domain={[0, niceMax]} ticks={ticks} />
            <Tooltip content={<CustomTooltip />} />

            <Scatter
              data={filteredData}
              onClick={handleClick}
              onMouseEnter={handleHover}
              onMouseLeave={handleLeave}
              shape={({ cx, cy, payload }) => {
                const isSelected = selected?.id === payload?.id;
                const isHovered = hovered?.id === payload?.id;
                return (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isSelected ? 8 : isHovered ? 6 : 5}
                    fill={isSelected ? "red" : isHovered ? "orange" : "#8884d8"}
                  />
                );
              }}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <p className="text-sm text-gray-500 mt-2">
        {search
          ? `Showing ${filteredData.length} of ${data.length} results`
          : `Total: ${data.length} records`}
      </p>
    </div>
  );
}