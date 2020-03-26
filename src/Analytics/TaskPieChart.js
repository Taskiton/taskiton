import React, {useState, useEffect} from "react";
import Chart from "react-google-charts";
import { Bar , Doughnut } from 'react-chartjs-2';



export default function TaskPieChart() {
    const [percentage, setpercentage] = useState(1);
    const [data, setData] = useState([])
    
    useEffect(() => {
        const url = 'http://api.taskiton.wmdd.ca/tasks/analyze';
    fetch(url, {
        headers: { 'Content-Type': 'application/json' },

    }).then(function (response) {
        // console.log(response.status)
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        } 
        return response.json();
    }).then(function (result) {
        console.log(result)
      //  var taskArray = Object.values(result);
      //  console.log(taskArray)
       let taskUser = []
       let taskCount = []
        for(let i = 0; i<result.length; i++){
            
            taskUser.push(result[i].column_title)
            taskCount.push(result[i].task_count)
        }
        
    setpercentage(60);
    setData({
        labels: taskUser,
        datasets: [{
          label: '# of Votes',
          data: taskCount,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      })
        if(result.code === 204){
            alert(result.success);
        }else if (result.code === 200){
          
        }
    }).catch(function (err) {
        console.log(err)
    });
        
       
      
  
    }, [setpercentage, setData]);
    return (
        <div className="App">
        <div>
        <Doughnut data={data}>
        </Doughnut>
        </div>
      </div>
    );
}