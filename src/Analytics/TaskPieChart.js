import React, {useState} from "react";
import Chart from "react-google-charts";

const pieOptions = {
    title: "",
    pieHole: 0.6,
    slices: [
        {
            color: "#007fad"
        },
        {
            color: "#e9a227"
        }
    ],
    legend: {
        position: "bottom",
        alignment: "center",
        textStyle: {
            color: "233238",
            fontSize: 14
        }
    },
    tooltip: {
        showColorCode: true
    },
    chartArea: {
        left: 0,
        top: 0,
        width: "100%",
        height: "80%"
    },
    fontName: "Roboto"
};

export default function TaskPieChart() {
    const [chartImageURI, setChartImageURI] = useState("");
    return (
        <div className="App">
            <Chart
                chartType="PieChart"
                data={[["Completed", "Pending"], ["Completed", 12], ["Pending", 5.5]]}
                options={pieOptions}
                graph_id="PieChart"
                width={"100%"}
                height={"42vh"}
                legend_toggle
                style={{marginTop:'1%'}}
            />
        </div>
    );
}