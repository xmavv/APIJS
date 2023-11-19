import Chart from 'chart.js/auto'

const ctxTemp = document.getElementById('myChartTemp');
const ctxHumi = document.getElementById('myChartHumi');

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
        beginAtZero: true
      },
      yAxes: [{
        ticks: {
          fontColor: "white",
        }
      }],
      xAxes: [{
        ticks: {
          fontColor: "white",
        }
      }]
    }
  }
});

function renderChartTemp (tempValue) {
  myChartTemp.data.datasets[0].data[0] = tempValue;
  myChartTemp.update();
}

function renderChartHumi (humiValue) {
  myChartHumi.data.datasets[0].data[0] = humiValue;
  myChartHumi.update();
}

export default renderChart = {renderChartTemp, renderChartHumi};