import Chart from 'chart.js/auto';

const ctxTemp = document.getElementById('myChartTemp');
const ctxHumi = document.getElementById('myChartHumi');
const ctxTime = document.getElementById('myChartTime');

//TEMPERATURE
let myChartTemp = new Chart(ctxTemp, {
  type: 'bar',
  data: {
    labels: ['temperature °C'],
    datasets: [{
      label: 'temperature °C',
      data: [0],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});


//HUMIDITY
let myChartHumi = new Chart(ctxHumi, {
  type: 'bar',
  data: {
    labels: ['humidity %'],
    datasets: [{
      label: 'humidity %',
      data: [0],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        suggestedMin: 0,
        suggestedMax: 100
      }
    }
  }
})


let timeLabels = [];
let timeDatas = [];

//TIME
const chartTime = new Chart(ctxTime, {
  type: 'line',
  data: {
    labels: timeLabels,
    datasets: [
      {
        label: `temperature in days, D:day of month, H:hour`,
        data: timeDatas,
        fill: false,
        cubicInterpolationMode: 'monotone',
        tension: 0.4
      },
  ]},
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true
      },
    },
    interaction: {
      intersect: false,
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true
        }
      },
      y: {
        display: true,
      }
    }
  },
});


//FUNCTIONS
function renderChartTime (givenName, tempValue) {
  timeLabels.splice(0, timeLabels.length);
  timeDatas.splice(0, timeDatas.length); // didnt work with let so i have to delete all from arrays

  const data = JSON.parse(localStorage.getItem(givenName)) || [];
  const curHour = new Date().getHours();
  const curDay = new Date().getDate();
  console.log(curDay);
  const curSecs = Math.round(Date.now() / 1000) + 8*24*60*60;
  const time7Days = 7*24*60*60; //7 days in seconds
  const time24Hours = 24*60*60; //24 hours in seconds

  // CHECKING IF THE CURRENT HOUR IS DIFFERENT THAT THE LAST IN THE ARRAY, OR THE DAY IS DIFFERENT
  // CAUSE WE DONT WANT TO HAVE A VALUE FOR SAME HOUR PER DAY EVERY TIME
  if (curHour !== data[data.length-1]?.hour || ((data[data.length-1]?.time + time24Hours) < curSecs)) {
    const details = {
      hour: curHour,
      day: curDay,
      value: Number(tempValue),
      time: curSecs
    }
    data.push(details);
  }

  // CHECKING IF ANY ELEMENT IS IN ARRAY LONGER THAT A WEEK IN ARRAY
  let index =0;
  data.forEach((el, i) => {
    if ((el.time + time7Days) < curSecs) {
      index = i+1;
    }
  });
  // REMOVE THOSE ITEMS
  data.splice(0, index);
  
  localStorage.setItem(givenName, JSON.stringify(data));
  
  //REPAINT THE CHART
  data.forEach(el => {
    const curDate = `D:${curDay}.H:${curHour}`
    timeLabels.push(curDate);
    timeDatas.push(el.value);
  });
  
  chartTime.update();
  // localStorage.removeItem(givenName);
  // kinda pround about this one
}


function renderChartTemp (tempValue) {
  myChartTemp.data.datasets[0].data[0] = tempValue;
  myChartTemp.update();
}

function renderChartHumi (humiValue) {
  myChartHumi.data.datasets[0].data[0] = humiValue;
  myChartHumi.update();
}

const renderChart = {renderChartTemp, renderChartHumi, renderChartTime} 
export default renderChart;