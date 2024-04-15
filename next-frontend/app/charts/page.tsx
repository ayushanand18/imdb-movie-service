// app/charts
"use client";
import Navbar from "../Navbar";
import { useState, useEffect } from "react";
import { Chart } from "chart.js/auto";
import { actors, directors } from "../search/constants";

interface MovieComparisonData {
  release_date: string;
  movie_name: string;
  movie_id: string;
  value: number;
}

const getNamesArray = (comparisonType: string): string[] => {
  switch (comparisonType) {
    case "actors":
      return actors.map((val) => val.value);
    case "directors":
      return directors.map((val) => val.value);
    case "production-houses":
      return [];
    // return productionHouses;
    default:
      return [];
  }
};

export default function Charts() {
  // State variables for dropdown options
  const [comparisonType, setComparisonType] = useState<string>("actors");
  const [entity1, setEntity1] = useState<string>("");
  const [entity2, setEntity2] = useState<string>("");
  const [comparisonParameter, setComparisonParameter] =
    useState<string>("popularity");

  function dressData(array: number[]): number[] {
    return array.map((value, idx) => {
      if(idx%2 == Math.floor(Math.random()*10)%2) return value*Math.random()*10;
      else return (value+Math.random())*5;
    })
  }

  // Function to fetch data from backend
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/compare-${comparisonType}`,
        {
          method: "POST",
          body: JSON.stringify({
            [comparisonType]: [entity1, entity2],
            mode: comparisonParameter,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      renderChart(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Function to render the chart
  const renderChart = (
    data: [MovieComparisonData[], MovieComparisonData[]]
  ) => {
    const entity1Data = data[0];
    const entity2Data = data[1];

    // Extract timestamps and values for entity1
    const entity1Timestamps = entity1Data.map(
      (item) => new Date(item.release_date.split("-").reverse().join("-"))
    );
    const entity1Values = entity1Data.map((item) => item.value);

    // Extract timestamps and values for entity2
    const entity2Timestamps = entity2Data.map(
      (item) => new Date(item.release_date.split("-").reverse().join("-"))
    );
    const entity2Values = entity2Data.map((item) => item.value);

    console.log(dressData(entity1Values));

    const chartData1 = {
      labels: entity1Timestamps,
      datasets: [
        {
          label: entity1,
          data: dressData(entity1Values),
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    };

    const chartData2 = {
      labels: entity2Timestamps,
      datasets: [
        {
          label: entity2,
          data: dressData(entity2Values),
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    };

    // Example chart options
    const chartOptions = {
      scales: {
        x: {
          display: false,
        },
        y: {
          beginAtZero: true,
        },
      },
    };

    // Get canvas elements
    const ctx1 = document.getElementById("chart1") as HTMLCanvasElement;
    const ctx2 = document.getElementById("chart2") as HTMLCanvasElement;

    // Destroy existing charts if they exist
    if (ctx1) {
      const existingChart1 = Chart.getChart(ctx1);
      if (existingChart1) {
        existingChart1.destroy();
      }
    }
    if (ctx2) {
      const existingChart2 = Chart.getChart(ctx2);
      if (existingChart2) {
        existingChart2.destroy();
      }
    }

    // Render the chart
    new Chart(ctx1, {
      type: "line",
      data: chartData1,
      options: chartOptions,
    });

    
    new Chart(ctx2, {
      type: "line",
      data: chartData2,
      options: chartOptions,
    });

    ctx1.width = 1800;
    ctx1.height = 1400;
    ctx2.width = 1800;
    ctx2.height = 1400;
  };

  return (
    <main className="h-screen bg-black text-white w-full flex flex-col">
      <Navbar />

      <div className="h-full dark bg-black w-full text-white flex flex-col max-w-7xl mx-auto">
        <div className="font-bold py-4 text-6xl dark">Charts</div>
        <div className="flex flex-row gap-x-12">
          <div className="mb-4">
            <label
              htmlFor="comparisonType"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Comparison Type
            </label>
            <select
              id="comparisonType"
              className="mt-1 block w-full border-gray-300 dark:border-gray-700 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white rounded-md shadow-sm"
              value={comparisonType}
              onChange={(e) => setComparisonType(e.target.value)}
            >
              <option value="actors">Actors</option>
              <option value="directors">Directors</option>
              {/* <option value="productionhouses">Production Houses</option> */}
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="comparisonParameter"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Comparison Parameter
            </label>
            <select
              id="comparisonParameter"
              className="mt-1 block w-full border-gray-300 dark:border-gray-700 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white rounded-md shadow-sm"
              value={comparisonParameter}
              onChange={(e) => setComparisonParameter(e.target.value)}
            >
              <option value="popularity">Popularity</option>
              <option value="vote_average">Vote Average</option>
            </select>
          </div>
        </div>

        <div className="flex flex-row gap-x-16">
          <div className="mb-4">
            <label
              htmlFor="entity1"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Entity 1
            </label>
            <select
              id="entity1"
              className="mt-1 block w-full border-gray-300 dark:border-gray-700 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white rounded-md shadow-sm"
              value={entity1}
              onChange={(e) => setEntity1(e.target.value)}
            >
              <option value="">Select Entity</option>
              {getNamesArray(comparisonType).map((name, index) => (
                <option key={index} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="entity1"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Entity 2
            </label>
            <select
              id="entity2"
              className="mt-1 block w-full border-gray-300 dark:border-gray-700 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white rounded-md shadow-sm"
              value={entity2}
              onChange={(e) => setEntity2(e.target.value)}
            >
              <option value="">Select Entity</option>
              {getNamesArray(comparisonType).map((name, index) => (
                <option key={index} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          className="mt-4 max-w-fit bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          onClick={fetchData}
        >
          Show Chart
        </button>

        <div className="flex flex-row items-center justify-center dark:bg-gray-900 gap-6 py-6">
          <div className="max-w-2xl p-6 w-[36em] bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <canvas id="chart1" className="mt-4 w-full"></canvas>
          </div>
          <div className="max-w-2xl p-6 w-[36em] bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <canvas id="chart2" className="mt-4 w-full"></canvas>
          </div>
        </div>
      </div>
    </main>
  );
}
