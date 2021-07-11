const fetchAPI = async (url) => {
    const retrieve = await fetch(url);
    return await retrieve.json();
}
const updateChart = (coin, duration) => {
    if (duration == "1mo") {
        fetchAPI(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=30&interval=hourly`).then(data => {
            console.log(data);
            var timeArray = [];
            var priceArray = [];
            for (let i = 0; i < data.prices.length; i++) {
                timeArray.push(timeConverter(data.prices[i][0]));
                var price = data.prices[i][1];
                if (coin != "dogecoin") {
                    price = data.prices[i][1].toFixed(2);
                }
                priceArray.push(price);
            }
            createChart(timeArray, priceArray, coin);
        });
    }
    if (duration == "3mo") {
        fetchAPI(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=90&interval=daily`).then(data => {
            console.log(data);
            var timeArray = [];
            var priceArray = [];
            for (let i = 0; i < data.prices.length; i++) {
                timeArray.push(timeConverter(data.prices[i][0]));
                var price = data.prices[i][1];
                if (coin != "dogecoin") {
                    price = data.prices[i][1].toFixed(2);
                }
                priceArray.push(price);
            }
            createChart(timeArray, priceArray, coin);
        });
    }
    if (duration == "1d") {
        fetchAPI(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=1&interval=hourly`).then(data => {
            console.log(data);
            var timeArray = [];
            var priceArray = [];
            for (let i = 0; i < data.prices.length; i++) {
                timeArray.push(timeConverter(data.prices[i][0]));
                var price = data.prices[i][1];
                if (coin != "dogecoin") {
                    price = data.prices[i][1].toFixed(2);
                }
                priceArray.push(price);
            }
            createChart(timeArray, priceArray, coin);
        });
    }
    if (duration == "1yr") {
        fetchAPI(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=365&interval=daily`).then(data => {
            console.log(data);
            var timeArray = [];
            var priceArray = [];
            for (let i = 0; i < data.prices.length; i++) {
                timeArray.push(timeConverter(data.prices[i][0]));
                var price = data.prices[i][1];
                if (coin != "dogecoin") {
                    price = data.prices[i][1].toFixed(2);
                }
                priceArray.push(price);
            }
            createChart(timeArray, priceArray, coin);
        });
    }
}
const timeConverter = (time) => {
    // Convert UNIX time to Date
    let unix_timestamp = time;
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(unix_timestamp);
    var month = date.getMonth() + 1;
    var UTCDate = date.getUTCDate();
    var formattedTime = month + '/' + UTCDate;
    /*
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
*/
    return formattedTime;
}
coinSelect = () => {
    let coin = document.getElementById('coin-select').value;
    let duration = document.getElementById('duration-select').value;
    updateCardDivs(coin);
    updateChart(coin, duration);
    updatePrice(coin);
}
updateCardDivs = (coin) => {
    document.getElementById("coin-icon").src = `../images/coins/${coin}.png`;
}
updatePrice = (coin) => {
    fetchAPI(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd&include_market_cap=true`).then(data => {
        console.log(data);
        if (coin == "dogecoin" || coin == "bitcoin") {
            document.getElementById('current-price').innerHTML = '$' + (data[coin].usd);
        } else {
            document.getElementById('current-price').innerHTML = '$' + (data[coin].usd).toFixed(2);
        }
        document.getElementById('market-cap').innerHTML = '$' + parseInt(data[coin].usd_market_cap);
    });
}
coinSelect();