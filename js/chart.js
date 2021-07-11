
// Plugin to offset the Y-axis
Chart.pluginService.register({
    beforeUpdate: function(chart) {
        var offset = chart.options.customOffset;
        if (!offset || offset < 0) return;
        var max = Number.MIN_VALUE;
        var min = Number.MAX_VALUE;
        chart.data.datasets.forEach(function(dataset) {
            var newMax = Math.max.apply(null, dataset.data);
            var newMin = Math.min.apply(null, dataset.data);
            max = newMax > max ? newMax : max;
            min = newMin > min ? min : newMin;
        });
        chart.options.scales.yAxes[0].ticks.max = max + offset;
        chart.options.scales.yAxes[0].ticks.min = min - offset;
    }
});


// Price Chart
var myChart;
const createChart = (time, price, coin) => {
    if (myChart) {
        myChart.destroy();
    }
    let ctx = document.getElementById('line-chart').getContext('2d');
    var gradient = ctx.createLinearGradient(0, 0, 0, 400);
    coinOffset = 0;
    if (coin == "dash") {
        lineColor = "rgb(46,93,220)";
        gradient.addColorStop(0, 'rgba(46,93,220,0.75)');
        gradient.addColorStop(1, 'rgba(46,93,220,0.1)');
        coinOffset = 10;
    }
    if (coin == "bitcoin") {
        lineColor = "orange";
        gradient.addColorStop(0, 'rgba(255,165,0,0.75)');
        gradient.addColorStop(1, 'rgba(255,165,0,0.1)');
        coinOffset = 1000;
    }
    if (coin == "ethereum") {
        lineColor = "rgb(178,168,236)";
        gradient.addColorStop(0, 'rgba(178,168,236,0.75)');
        gradient.addColorStop(1, 'rgba(178,168,236,0.1)');
        coinOffset = 100;
    }
    myChart = new Chart(ctx, {
        type: 'line',
        stepped: true,
        data: {
            labels: time,
            datasets: [{
                data: price,
                label: "$",
                borderColor: lineColor,
                backgroundColor: gradient,
                fill: true,
                borderJoinStyle: 'round',
                borderCapStyle: 'round',
                borderWidth: 3,
                pointRadius: 0,
                pointHitRadius: 10,
                lineTension: .2,
            }]
        },
        options: {
            customOffset: coinOffset,
            scales: {
                xAxes: [{
                    gridLines: {
                        drawOnChartArea: false
                    },
                    display: true,
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 30
                    }
                }],
                yAxes: [{
                    gridLines: {
                        drawOnChartArea: false,
                    },
                    display: true,
                    weight: 10,
                    position: 'right'
                }],
            },
            legend: {
                display: false
            },
            tooltips: {
                callbacks: {
                    //This removes the tooltip title
                    title: function() {}
                },
                //this removes legend color
                displayColors: false,
                yPadding: 10,
                xPadding: 10,
                position: 'nearest',
                caretSize: 10,
                backgroundColor: 'rgba(255,255,255,.9)',
                bodyFontSize: 15,
                bodyFontColor: '#303030'
            }
        }
    });
}