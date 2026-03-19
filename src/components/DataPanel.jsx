import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedEarthquake, setSearch } from "../redux/store";

export default function DataPanel({ data }) {
  const dispatch = useDispatch();
  const selected = useSelector(state => state.earthquake.selectedEarthquake);
  const search = useSelector(state => state.earthquake.search);

  const columns = ["time", "latitude", "longitude", "depth", "mag", "place"];
  const rowRefs = useRef({});
  const [animateId, setAnimateId] = useState(null);
 useEffect(() => {
  if (selected?.id && rowRefs.current[selected.id]) {
    rowRefs.current[selected.id].scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

    setAnimateId(selected.id);

    setTimeout(() => {
      setAnimateId(null);
    }, 2000);
  }
}, [selected]);

 const filteredData = data.filter(row =>
  row.place?.toLowerCase().includes((search || "").toLowerCase())
);

const totalCount = data.length;
const filteredCount = filteredData.length;
const safeSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  return (
    <div className="max-h-[600px] mt-5 ml-2 bg-white shadow rounded flex flex-col">
      <div className="sticky top-0 bg-white z-10 p-2 border-b">
     <div className="flex gap-6 items-center">
  <input
    type="text"
    placeholder="Search location..."
    className="p-2 border rounded w-3/4 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
    value={search}
    onChange={(e) => dispatch(setSearch(e.target.value))}
  />

  {search && (
    <button
      onClick={() => dispatch(setSearch(""))}
      className="px-3 bg-gray-200 rounded hover:bg-gray-300"
    >
      ✕
    </button>
  )}
 <div className="text-md text-gray-500 mt-1">
  {search ? (
    <>
      Showing <span className="font-medium">{filteredCount}</span> of{" "}
      <span className="font-medium">{totalCount}</span> results
    </>
  ) : (
    <>
      Total: <span className="font-medium">{totalCount}</span> records
    </>
  )}

  {search && filteredCount === 0 && (
    <div className="text-red-500 text-sm mt-1">
      No matching results found
    </div>
  )}
</div>
</div>
</div>
<div className="overflow-auto">
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
  key={row.id}
  ref={(el) => (rowRefs.current[row.id] = el)}
  onClick={() => dispatch(setSelectedEarthquake(row))}
 className={`cursor-pointer ${
  selected?.id === row.id
    ? `bg-yellow-200 ${
        animateId === row.id ? "highlight-animate" : ""
      }`
    : "hover:bg-gray-100"
}`}
>
              {columns.map((col) => (
                <td key={col} className="border p-2">
                  {col === "place" && search
  ? row[col].replace(
  new RegExp(safeSearch, "gi"),
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
    </div>
  );
}