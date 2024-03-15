import React, { useState } from "react";
import Chart from "react-apexcharts";
import RequestApi from "./utils/getRequestApi";
import './App.css'

function App() {
  const [chartData, setChartData] = useState({
    categories: [],
    series: [{
      name: "Number of Requests",
      data: [],
    }]
  });

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
        <h3 >Requests per Hotel</h3>
          <Chart
            options={{
              chart: {
                id: "basic-bar",
              },
              xaxis: {
                categories: chartData.categories,
              },
              yaxis: {
                min: 0,
                tickAmount: 5,
              },
            }}
            series={chartData.series}
            type="line"
            width="700"
            height="300"
          />
          <RequestApi setChartData={setChartData} />
        </div>
      </div>
    </div>
  );
}

export default App;
