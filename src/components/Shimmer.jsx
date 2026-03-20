// src/components/Shimmer.jsx
import React from "react";

export default function Shimmer({ type = "chart", rows = 6 }) {
  if (type === "chart") {
    return (
      <div className="bg-white rounded-xl shadow-lg p-4 animate-pulse flex flex-col gap-4 h-full">
        <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
        <div className="flex-1 bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (type === "table") {
    return (
      <div className="bg-white rounded-xl shadow-lg p-4 animate-pulse flex flex-col gap-2 h-full overflow-hidden">
        <div className="h-6 bg-gray-300 rounded w-1/3 mb-2"></div>
        <div className="flex-1 overflow-auto">
          {[...Array(rows)].map((_, idx) => (
            <div
              key={idx}
              className="h-6 bg-gray-200 rounded mb-2 w-full"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}