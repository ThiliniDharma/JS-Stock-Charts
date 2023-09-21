import Chart from 'chart.js/auto';

async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');
   
    const response = await fetch(
        `https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1day&apikey=7939f60eb4d54ad784f308a8cfb972ac`
      );
      const result = await response.json();  
    
        // let response = await fetch("https://api.twelvedata.com/complex_data?apikey=7939f60eb4d54ad784f308a8cfb972ac",{
        //     method: "POST",
        //     body: {
        //         symbols: ["GME", "MSTF", "DIS","BNTX"],
                // intervals: ["5min", "1day"],
                // outputsize: 25,
                // methods: [
                //     time_series,
                //     {
                //     name: "ema",
                //     time_period: 12
                //     },
                //     quote,
                //     {
                //     name: "adx",
                //     order: "ASC"
                //     }
                // ]
//             }
//         })
        
       
//             console.log(response.json())

const Chart=new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
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
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
 }

// let GME = result.GME
// let MSFT = result.MSFT
// let DIS = result.DIS
// let BTNX = result.BTNX

const { GME, MSFT, DIS, BNTX } = mockData;
const stocks = [GME, MSFT, DIS, BNTX];

// Bonus Note: 
// Another way to write the above lines would to refactor it as:
   // const {GME, MSFT, DIS, BTNX} = result 
// This is an example of "destructuring" an object
// "Destructuring" creates new variables from an object or an array
console.log(stocks);
stocks.forEach( stock => stock.values.reverse())

function getColor(stock){
    if(stock === "GME"){
        return 'rgba(61, 161, 61, 0.7)'
    }
    if(stock === "MSFT"){
        return 'rgba(209, 4, 25, 0.7)'
    }
    if(stock === "DIS"){
        return 'rgba(18, 4, 209, 0.7)'
    }
    if(stock === "BNTX"){
        return 'rgba(166, 43, 158, 0.7)'
    }
}

// Time Chart
new Chart(timeChartCanvas.getContext("2d"), {
    type: "line",
    data: {
      labels: stocks[0].values.map((value) => value.datetime),
      datasets: stocks.map((stock) => ({
        label: stock.meta.symbol,
        data: stock.values.map((value) => parseFloat(value.high)),
        backgroundColor: getColor(stock.meta.symbol),
        borderColor: getColor(stock.meta.symbol),
      })),
    },
  });

main()