import React from "react";

export default function Dropdown({ label, value, options, onChange }) {
  return (
    <div className="flex flex-col">
      {label && (
        <label className="text-sm font-medium mb-1 text-gray-600">
          {label}
        </label>
      )}

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}