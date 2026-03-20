import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedEarthquake, setHoveredEarthquake, setSearch } from "../redux/store";

export default function DataPanel({ data }) {
  const dispatch = useDispatch();

  // Redux state
  const selected = useSelector((state) => state.earthquake.selectedEarthquake);
  const hovered = useSelector((state) => state.earthquake.hoveredEarthquake);
  const search = useSelector((state) => state.earthquake.search);

  const columns = ["time", "latitude", "longitude", "depth", "mag", "place"];
  const rowRefs = useRef({}); // For scrolling selected row into view

  // Scroll to the selected row when changed
  useEffect(() => {
    if (selected?.id && rowRefs.current[selected.id]) {
      rowRefs.current[selected.id].scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [selected]);

  // Filter rows based on search input
  const filteredData = data.filter((row) =>
    row.place?.toLowerCase().includes((search || "").toLowerCase())
  );

  const totalCount = data.length;
  const filteredCount = filteredData.length;

  // Safe regex for search highlighting
  const safeSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  return (
    <div className="flex flex-col bg-white rounded-xl shadow-lg p-4 h-full overflow-hidden">
      {/* Sticky search bar */}
      <div className="sticky top-0 bg-white z-10 px-4 py-3 border-b flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="flex w-full sm:w-2/3 items-center gap-2">
          <input
            type="text"
            placeholder="Search location..."
            className="w-full p-2.5 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            value={search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
          />
          {search && (
            <button
              onClick={() => dispatch(setSearch(""))}
              className="px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-sm"
            >
              ✕
            </button>
          )}
        </div>

        {/* Display count */}
        <div className="text-sm text-gray-500">
          {search
            ? <>Showing <span className="font-medium">{filteredCount}</span> of <span className="font-medium">{totalCount}</span></>
            : <>Total: <span className="font-medium">{totalCount}</span></>}
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-sm border-collapse">
          {/* Header */}
          <thead className="sticky top-0 bg-gray-50 z-[5]">
            <tr>
              {columns.map((col) => (
                <th key={col} className="text-left text-base px-3 py-2 border-b font-medium text-gray-600 whitespace-nowrap">
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table body */}
          <tbody>
            {filteredData.map((row) => {
              const isSelected = selected?.id === row.id;
              const isHovered = hovered?.id === row.id;

              return (
                <tr
                  key={row.id}
                  ref={(el) => (rowRefs.current[row.id] = el)}
                  onClick={() => dispatch(setSelectedEarthquake(row))}
                  onMouseEnter={() => dispatch(setHoveredEarthquake(row))}
                  onMouseLeave={() => dispatch(setHoveredEarthquake(null))}
                  className={`cursor-pointer transition-colors ${
                    isSelected ? "bg-yellow-200" : isHovered ? "bg-orange-200" : "hover:bg-gray-100"
                  }`}
                >
                  {columns.map((col) => (
                    <td key={col} className="px-3 py-2 border-b text-gray-700">
                      {col === "place" && search
                        ? row[col].replace(new RegExp(safeSearch, "gi"), (m) => `🔍${m}`)
                        : col === "time"
                          ? new Date(row[col]).toLocaleString()
                          : col === "latitude" || col === "longitude"
                            ? Number(row[col]).toFixed(4) // 4 decimal digits
                            : col === "mag" || col === "depth"
                              ? Number(row[col]).toFixed(2) // 2 decimal digits
                              : row[col]}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}