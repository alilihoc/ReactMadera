export default {
  lastMonthsLineChartData: {
    labels: ["March", "April", "May", "June", "July", "August"],
    datasets: [
      {
        data: [165000, 110000, 85000, 50000, 130000, 200000],
      },
    ],
  },

  lastMonthsPieChartData: [
    {
      name: "March",
      accessor: 165000,
      color: "#40315c",
      legendFontColor: "#40315c",
      legendFontSize: 15,
    },
    {
      name: "April",
      accessor: 110000,
      color: "#78396f",
      legendFontColor: "#78396f",
      legendFontSize: 15,
    },
    {
      name: "May",
      accessor: 85000,
      color: "#b1406f",
      legendFontColor: "#b1406f",
      legendFontSize: 15,
    },
    {
      name: "June",
      accessor: 50000,
      color: "#e0515d",
      legendFontColor: "#e0515d",
      legendFontSize: 15,
    },
    {
      name: "July",
      accessor: 130000,
      color: "#fc763e",
      legendFontColor: "#fc763e",
      legendFontSize: 15,
    },
    {
      name: "August",
      accessor: 200000,
      color: "#ffa600",
      legendFontColor: "#ffa600",
      legendFontSize: 15,
    },
  ],

  lastYearsBarChartData: [
    [
      {
        v: 49,
        name: "apple",
      },
      {
        v: 42,
        name: "apple",
      },
    ],
    [
      {
        v: 69,
        name: "banana",
      },
      {
        v: 62,
        name: "banana",
      },
    ],
    [
      {
        v: 29,
        name: "grape",
      },
      {
        v: 15,
        name: "grape",
      },
    ],
  ],
};
