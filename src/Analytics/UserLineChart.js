import React from 'react';
import Chart from "react-google-charts"

const data = [
    ["Date", "Arsh", "Yalcin"],
    ["Week1", 10, 4],
    ["Week2", 11, 16],
    ["Week3", 6, 2],
    ["Week4", 3, 5]
];
const options = {
    title: "House Performance",
    curveType: "function",
    legend: { position: "bottom" }
};

export default function UserLineChart() {

    return (
        <div className="App">
            <Chart
                chartType="LineChart"
                width="100%"
                height="500px"
                data={data}
                options={options}
            />
        </div>
    );
}