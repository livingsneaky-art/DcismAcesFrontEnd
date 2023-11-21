import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

import "./index.scss";

const COLORS = ["#5164de", "#5A6ACF", "#8593ED", "#C7CEFF"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PieGraphBox = ({ data }) => {
  return (
    <div className="pieGraphBox">
      <div className="infoBox">
        <div className="charts">
          <h1 className="text-3xl">Employment Rate</h1>
          <div className="chart">
            <ResponsiveContainer width="99%" height={300}>
              <PieChart>
                <Tooltip
                  contentStyle={{ background: "white", borderRadius: "5px" }}
                />
                <Pie
                  data={data}
                  labelLine={false}
                  label={renderCustomizedLabel}
                  fill="#8884d8"
                  dataKey="employmentRate"
                  legendType="circle"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="labels">
          <h1 className="text-xl"> Legends</h1>
          {data.map((item, index) => (
            <div className="label" key={item.course}>
              <div className="title">
                <div
                  className="dot"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span>{item.course}</span>
              </div>
              <span>{item.employmentRate}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="description">
        <p>
          This shows the employment rate of each program offered by the
          department
        </p>
      </div>
    </div>
  );
};

export default PieGraphBox;
