import { useQuery } from "@tanstack/react-query";
import Papa from "papaparse";

export function useEarthquakes() {
  return useQuery({
    queryKey: ["earthquakes"],
    queryFn: async () => {
      const res = await fetch(
        "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv"
      );

      const text = await res.text();

      const parsed = Papa.parse(text, {
        header: true,
        skipEmptyLines: true
      });

      return parsed.data
  .filter(row => row.mag && row.depth)
  .slice(0, 200) //  LIMIT rows
  .map(row => ({
    ...row,
    mag: Number(row.mag),
    depth: Number(row.depth),
    latitude: Number(row.latitude),
    longitude: Number(row.longitude)
  }));
    }
  });
}