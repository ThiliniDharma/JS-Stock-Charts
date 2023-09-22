async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

    const response = await fetch(
        `https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1day&apikey=7939f60eb4d54ad784f308a8cfb972ac`
      );
      const result = await response.json();  
    //   let GME = result.GME
    //   let MSFT = result.MSFT
    //   let DIS = result.DIS
    //   let BNTX = result.BTNX
    
/*     
      const stocks = [GME, MSFT, DIS, BNTX]; */
      
      // Bonus Note: 
      // Another way to write the above lines would to refactor it as:
         // const {GME, MSFT, DIS, BTNX} = result 
      // This is an example of "destructuring" an object
      // "Destructuring" creates new variables from an object or an array
      

      const { GME, MSFT, DIS, BNTX } = mockData;

      const stocks = [GME, MSFT, DIS, BNTX];
      

      console.log(stocks[0].values);                                                  

    //   new Chart(timeChartCanvas.getContext('2d'), {
    //     type: 'line',
    //     data: {
    //         //labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    //         labels: stocks[0].values.map(value => value.datetime),
    //         datasets: [{
    //             label: '# of Votes',
    //             data: [12, 19, 3, 5, 2, 3],
    //             backgroundColor:  'rgba(255, 99, 132, 0.2)',
    //             borderColor: 'rgba(255, 99, 132, 1)'
    //         }]
    //     }
    // });

   stocks.forEach(stock => stock.values.reverse())

    //Stock Price over time chart
    new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.map(value => value.datetime),
            datasets: stocks.map( stock => ({
                label: stock.meta.symbol,
                data: stock.values.map(value => parseFloat(value.high)),
                backgroundColor:  getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol),
            }))
        }
    });
    
    //Highest Stock Price chart
    new Chart(highestPriceChartCanvas.getContext('2d'), {
        type: 'bar',
        data: {
        //    labels: [stocks[0].meta.symbol, stocks[1].meta.symbol,  stocks[2].meta.symbol ,stocks[3].meta.symbol],
        //    label: 'Highest',
        //    data: stocks.values.map(value => parseFloat(value.high)),
        //    backgroundColor:  getColor(stocks.meta.symbol),
        //    borderColor: getColor(stocks.meta.symbol),
       
            


           labels: stocks.map(stock => stock.meta.symbol),
           datasets:  [{
               label: 'Highest',
               backgroundColor: stocks.map(stock => (
               getColor(stock.meta.symbol)
               )),
               borderColor:  stocks.map(stock => (
               getColor(stock.meta.symbol)
               )),
               data: stocks.map(stock => (
                getHighestval(stock.values)
               )) 
           }]
       }
   });

    //Average Stock Price chart
    new Chart(averagePriceChartCanvas.getContext('2d'), {
        type: 'pie',
        data: {
            labels: stocks.map(stock => stock.meta.symbol),
            datasets:  [{
                label: 'Average',
                backgroundColor: stocks.map(stock => (
                getColor(stock.meta.symbol)
                )),
                borderColor:  stocks.map(stock => (
                getColor(stock.meta.symbol)
                )),
                data: stocks.map(stock => (
                calcAverage(stock.values)
                )) 
            }]
        }
    });

}

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

function getHighestval(values)
{
let Highest = 0;
    const Values =  values.map(value => parseFloat(value.high))
    let sortedValues  = Values.sort(function(a, b){return b - a});
    Highest = sortedValues[0];

    return Highest;
}

function calcAverage(values)
{

}
main()