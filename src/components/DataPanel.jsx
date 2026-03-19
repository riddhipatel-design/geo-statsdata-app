import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedEarthquake, setSearch } from "../redux/store";

export default function DataPanel({ data }) {
  const dispatch = useDispatch();
  const selected = useSelector(state => state.earthquake.selectedEarthquake);
  const search = useSelector(state => state.earthquake.search);

  const columns = ["time", "latitude", "longitude", "depth", "mag", "place"];

 const filteredData = data.filter(row =>
  row.place?.toLowerCase().includes((search || "").toLowerCase())
);

  return (
    <div className="overflow-auto max-h-[600px] p-2 mt-5 ml-2 bg-white shadow rounded">
      
      <input
        type="text"
        placeholder="Search location..."
        className="mb-2 p-2 border rounded w-full"
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
      />

      <table className="w-full text-sm border-collapse border border-gray-200">
        
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col} className="border p-2">{col}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {filteredData.map((row, idx) => (
            <tr
              key={idx}
              onClick={() => dispatch(setSelectedEarthquake(row))}
              className={selected === row ? "bg-yellow-200" : "hover:bg-gray-100"}
            >
              {columns.map((col) => (
                <td key={col} className="border p-2">
                  {col === "place" && search
  ? row[col].replace(
      new RegExp(search, "gi"),
      (match) => `🔍${match}`
    )
  : col === "time"
  ? new Date(row[col]).toLocaleString()
  : row[col]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}