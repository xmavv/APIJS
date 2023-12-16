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


const timeLabels = [];
const timeDatas = [];

//TIME
const chartTime = new Chart(ctxTime, {
  type: 'line',
  data: {
    labels: timeLabels,
    datasets: [
      {
        label: 'temperature in days',
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
        suggestedMin: -1,
        suggestedMax: 1
      }
    }
  },
});


//FUNCTIONS
const data = JSON.parse(localStorage.getItem('data')) || [];

function getChartTime (name) {
  const element = data.find(e => e.name === name);
}

function renderChartTime (givenName, tempValue) {
  const curHour = new Date().getHours();
  
  const details = {
    hour: curHour,
    value: tempValue
  }

  //CURRENT ELEMENT
  const element = data.find(e => e.name === givenName);
  
  //IF ELEMENT ALREADY EXISTS
  if(element){
    element.info.push(details);
    localStorage.setItem('data', JSON.stringify(data));

    //SHALLOW COPY JUST FOR LENGTH
    const info = [...element.info];

    if(curHour === element.info[info.length-1].hour) return;

    timeLabels.name.push(element.info[info.length-1].hour);
    timeDatas.push(element.info[info.length-1].value);
    chartTime.update();

    return;
  }

  //IF ELEMENT DOES NOT EXIST
  const item = {
    name: givenName,
    info: [{
      hour: curHour,
      value: tempValue
    }]
  }

  data.push(item);
  localStorage.setItem('data', JSON.stringify(data));

  timeLabels.push(data[0].info[0].hour);
  timeDatas.push(data[0].info[0].value);
  chartTime.update();
}

// localStorage.removeItem('data');

function renderChartTemp (tempValue) {
  myChartTemp.data.datasets[0].data[0] = tempValue;
  myChartTemp.update();
}

function renderChartHumi (humiValue) {
  myChartHumi.data.datasets[0].data[0] = humiValue;
  myChartHumi.update();
}

export default renderChart = {renderChartTemp, renderChartHumi, renderChartTime, getChartTime};