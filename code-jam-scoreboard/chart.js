let ctx = document.getElementById('myChart').getContext('2d');
let chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [],
  },
});

export default chart;
