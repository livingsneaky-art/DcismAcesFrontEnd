import React from "react";
import { useSelector } from "react-redux";
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  Line,
} from "recharts";

import "./index.scss";

const LineChartBox = () => {
  const {
    firstData,
    secondData,
    thirdData,
    fourthData,
    fifthData,
    sixData,
    sevenData,
  } = useSelector((state) => state.adminDashboard);

  const data = [
    {
      name: "2003",
      student: firstData,
    },
    {
      name: "2006",
      student: secondData,
    },
    {
      name: "2009",
      student: thirdData,
    },
    {
      name: "2012",
      student: fourthData,
    },
    {
      name: "2015",
      student: fifthData,
    },
    {
      name: "2018",
      student: sixData,
    },
    {
      name: "2021",
      student: sevenData,
    },
    {
      name: "2024",
      student: sevenData,
    },
    // {
    //   name: '2027',
    //   student: sevenData,
    // },
  ];
  return (
    <div className="lineChartBox">
      <h1 className="text-xl font-semibold">Alumni Report</h1>
      <p>Number of Graduates per 3 years</p>
      <div className="chart">
        <ResponsiveContainer width="99%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="student"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChartBox;
