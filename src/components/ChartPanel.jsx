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

  // Redux state
  const selected = useSelector((state) => state.earthquake.selectedEarthquake); // currently clicked point
  const hovered = useSelector((state) => state.earthquake.hoveredEarthquake);   // currently hovered point
  const search = useSelector((state) => state.earthquake.search);               // search filter text

  // Local state for dropdowns
  const [xKey, setXKey] = useState("mag");   // X-axis metric
  const [yKey, setYKey] = useState("depth"); // Y-axis metric

  // Options for dropdown selection
  const numericOptions = [
    { label: "Magnitude", value: "mag" },
    { label: "Depth", value: "depth" },
    { label: "Latitude", value: "latitude" },
    { label: "Longitude", value: "longitude" },
  ];

  // Filtered data based on search
  const filteredData = useMemo(
    () =>
      data.filter((row) =>
        row.place?.toLowerCase().includes((search || "").toLowerCase())
      ),
    [data, search]
  );

  // Click → select point
  const handleClick = (point) => {
    if (point?.payload) dispatch(setSelectedEarthquake(point.payload));
  };

  // Hover → highlight point
  const handleHover = (point) => {
    if (point?.payload) dispatch(setHoveredEarthquake(point.payload));
  };

  // Mouse leave → remove hover highlight
  const handleLeave = () => dispatch(setHoveredEarthquake(null));

  // Custom tooltip for scatter chart
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

  // Calculate "nice" max Y value for chart ticks
  const getNiceMax = (value) => {
    const step = 20;
    return Math.ceil((value + 20) / step) * step; // add offset so last point isn't cut off
  };
  const maxY = Math.max(...filteredData.map((d) => Number(d[yKey]) || 0));
  const niceMax = getNiceMax(maxY);

  // Generate ticks for Y-axis
  const ticks = Array.from({ length: niceMax / 20 + 1 }, (_, i) => i * 20);

  return (
    <div className="bg-white rounded-xl shadow-lg flex flex-col p-4 h-full">
      {/* Dropdown controls for selecting X/Y axis */}
      <div className="mb-4 flex flex-col sm:flex-row gap-4 items-center">
        <Dropdown label="X-Axis" value={xKey} options={numericOptions} onChange={setXKey} />
        <Dropdown label="Y-Axis" value={yKey} options={numericOptions} onChange={setYKey} />
      </div>

      {/* Chart */}
      <div className="w-full flex-1 min-h-[600px]"> {/* min-height ensures chart shows on small screens */}
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 5, right: 5, left: 5, bottom: 26 }}>
            <CartesianGrid strokeDasharray="2 2" />
            <XAxis dataKey={xKey} />
            <YAxis dataKey={yKey} domain={[0, niceMax]} ticks={ticks} />
            <Tooltip content={<CustomTooltip />} />

            {/* Scatter points */}
            <Scatter
              data={filteredData}
              onClick={handleClick}
              onMouseEnter={handleHover}
              onMouseLeave={handleLeave}
              shape={({ cx, cy, payload }) => {
                // Determine point size and color based on selection/hover
                const isSelected = selected?.id === payload?.id;
                const isHovered = hovered?.id === payload?.id;
                return (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isSelected ? 8 : isHovered ? 7 : 6}
                    fill={isSelected ? "red" : isHovered ? "orange" : "#8884d8"}
                  />
                );
              }}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Data count info */}
      <p className="text-sm text-gray-500 mt-2">
        {search
          ? `Showing ${filteredData.length} of ${data.length} results`
          : `Total: ${data.length} records`}
      </p>
    </div>
  );
}