# Geo Stats Data App

A React + Vite web application to visualize earthquake data from the USGS CSV feed.  
The app provides **interactive scatter charts** and a **dynamic data table** to explore recent earthquakes with clickable and hoverable points, search functionality, responsive design, and a shimmering loading UI.

---

## Features

- **Interactive Scatter Chart**  
  - Click a point to select and scroll to it in the table.  
  - Hover a point to highlight the corresponding row.  
  - X and Y axes are selectable (Magnitude, Depth, Latitude, Longitude).  
  - Tooltip shows earthquake details (place, magnitude, depth, date/time).  

- **Dynamic Data Table**  
  - Click rows to select corresponding points in the chart.  
  - Searchable by location (case-insensitive).  
  - Hover highlights rows.  
  - Formatted numbers:  
    - Latitude & Longitude → 4 decimals  
    - Magnitude & Depth → 2 decimals  
  - Fully responsive layout with sticky header.

- **Shimmer Loading UI**  
  - Shows a visual placeholder while data is loading.

- **Responsive Design**  
  - Desktop: chart and table side by side  
  - Tablets & Mobile: stacked layout  
  - Chart points and table rows scale appropriately

---

## Installation

### Prerequisites

- Node.js ≥ 18  
- npm ≥ 9 or yarn ≥ 1.22  

### Steps

1. Clone the repository:

```bash
git clone https://github.com/riddhipatel-design/geo-statsdata-app.git
cd geo-statsdata-app
 ```
2. Install dependencies:
```bash
npm install
# or
yarn install  
 ```
3. Start the development server:  
```bash
npm run dev
# or
yarn dev
 ```
4. Open your browser and navigate to `http://localhost:5173` to view the app.

5. To build for production:
```bash
npm run build
# or
yarn build
 ```

6. To preview the production build:
```bash
npm run preview
# or
yarn preview  
```

**Available Scripts**
- dev → Start development server
- build → Create production build
- preview → Preview production build
- lint → Run ESLint


**External Dependencies**

react – UI library

react-redux & @reduxjs/toolkit – State management

@tanstack/react-query – Data fetching & caching

recharts – Data visualization

papaparse – CSV parsing

tailwindcss – Styling

