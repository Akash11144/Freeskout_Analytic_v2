import { name } from "platform";
import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Legend,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { perDay } from "../../graph-utils";

const OSbased = (props) => {
  const [data, setdata] = useState([]);
  useEffect(() => {
    let y = perDay(props);
    console.log("inside os based graph");
    const ff = () => {
      let obj = [];
      const data01 = [
        { name: "Android", value: 400 },
        { name: "IOS", value: 300 },
        { name: "Windows", value: 300 },
      ];
      obj = data01;
      console.log(obj);
      return obj;
    };
    let r = ff();
    setdata(r);
  }, []);

  const COLORS = ["#0088FE", "#1adb80", "#FFBB28"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    name,
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
        letterSpacing={"2px"}
        fontSize="22px"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <React.Fragment>
      {console.log("inside os based page return")}
      {data.length ? (
        <div
          style={{
            background: "rgba(255, 255, 255, 0.3)",
            width: "98%",
            borderRadius: "10%",
            boxShadow: "0 0 5px black",
            margin: "20px auto",
            padding: "7% 6% 7% 0",
          }}
        >
          <ResponsiveContainer width="100%" height={350}>
            <PieChart width={400} height={400}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((name, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </React.Fragment>
  );
};

export default OSbased;
