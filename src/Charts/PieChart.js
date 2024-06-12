import React, { useState, useEffect } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const [chart, setChart] = useState({})
  var baseUrl = "https://api.coinranking.com/v2/coins/?limit=10";
  var proxyUrl = "https://cors-anywhere.herokuapp.com/";
  var apiKey = "coinrankingf892d37e4947153ce363ab00f5561b55a3d0abfe5b21ddd1";



  useEffect(() => {
    const fetchCoins = async () => {
      await fetch(`${proxyUrl}${baseUrl}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': `${apiKey}`,
          'Access-Control-Allow-Origin': "*"
        }
      })
        .then((response) => {
          if (response.ok) {
            response.json().then((json) => {
              console.log(json.data);
              setChart(json.data)
            });
          }
        }).catch((error) => {
          console.log(error);
        });
    };
    fetchCoins()
  }, [baseUrl, proxyUrl, apiKey])

  console.log("chart", chart);
  var data = {
    labels: chart?.coins?.map(x => x.name),
    datasets: [{
      label: `${chart?.coins?.length} Coins Available`,
      data: chart?.coins?.map(x => x.price),
      backgroundColor: [
        'rgba(255, 0, 0, 0.2)',
        'rgba(0, 0, 255, 0.2)',
        'rgba(255, 255, 0, 0.2)',
        'rgba(0, 128, 0, 0.2)',
        'rgba(128, 0, 128, 0.2)',
        'rgba(255, 165, 0, 0.2)',
        'rgba(255, 105, 180, 0.2)'
      ],
        borderColor: [
        'rgba(255, 0, 0, 1)',
        'rgba(0, 0, 255, 1)',
        'rgba(255, 255, 0, 1)',
        'rgba(0, 128, 0, 1)',
        'rgba(128, 0, 128, 1)',
        'rgba(255, 165, 0, 1)',
        'rgba(255, 105, 180, 1)'
      ],
      borderWidth: 1
    }]
  };
  var options = {
    maintainAspectRatio: false,
    scales: {
    },
    legend: {
      labels: {
        fontSize: 25,
      },
    },
  }
  return (
    <div>
      <Pie
        data={data}
        height={400}
        options={options}

      />
    </div>
  )
}
export default PieChart