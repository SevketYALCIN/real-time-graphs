Small project displaying a graph using data fetched with useQuery, updated in real time with websocket messages by invalidating queries.

- bootstrapped with [cra](https://github.com/facebook/create-react-app)
- [React Query](https://github.com/TanStack/query)
- [react-chart-js-2](https://github.com/reactchartjs/react-chartjs-2) for a simple vertical bar chart
- [json-server](https://github.com/typicode/json-server) for a quick API

To run the app, `npm i` then `npm start` to start the websocket server (localhost:3001), API (localhost:3002) and SPA (localhost:3000) concurrently.
Open the SPA on 2 split windows and click on one's `Edit random product sales`, both should be updated by sending the `queryKeys` to invalidate via WebSocket messages.