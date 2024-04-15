// app/charts
"use client";
import Navbar from "../Navbar";
import { useState, useEffect } from "react";
import { Chart } from "chart.js/auto";
import { actors, directors } from "../search/constants";

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

  // useEffect to fetch data when dropdown options change
  useEffect(() => {
    fetchData();
  }, [comparisonType, entity1, entity2, comparisonParameter]);

  // Function to fetch data from backend
  const fetchData = async () => {
    try {
      const response = await fetch(`BACKEND/${comparisonType}`, {
        method: "POST",
        body: JSON.stringify({ entity1, entity2, comparisonParameter }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      renderChart(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Function to render the chart
  const renderChart = (data: any) => {
    // Use Chart.js to render the chart
    const chartData = {
      labels: data.labels,
      datasets: [
        {
          label: entity1,
          data: data.entity1Data,
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
        {
          label: entity2,
          data: data.entity2Data,
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    };

    // Example chart options
    const chartOptions = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };

    // Render the chart
    const ctx = document.getElementById("myChart") as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: "line",
        data: chartData,
      });
    }
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
              <option value="production-houses">Production Houses</option>
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
              id="entity1"
              className="mt-1 block w-full border-gray-300 dark:border-gray-700 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white rounded-md shadow-sm"
              value={entity1}
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

        <div className="flex flex-col items-center justify-center dark:bg-gray-900">
          <div className="max-w-lg p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <canvas id="myChart" className="mt-4"></canvas>
          </div>
        </div>
      </div>
    </main>
  );
}
