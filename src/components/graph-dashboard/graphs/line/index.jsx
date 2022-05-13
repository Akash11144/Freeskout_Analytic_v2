import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  ReferenceLine,
  Label,
} from "recharts";
import LoaderAnmation from "../../../loadingAnimation";
import { perDay } from "../../graph-utils";

const Line1 = (props) => {
  const [data, setdata] = useState([]);
  useEffect(() => {
    console.log("inside line graph");
    setdata(perDay(props));
  }, []);

  return (
    <React.Fragment>
      {console.log("inside line page return")}
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
            <LineChart
              data={data}
              margin={{
                top: 10,
                right: 5,
                left: 0,
                bottom: 3,
              }}
            >
              <Line
                type="monotoneX"
                dataKey="count"
                stroke="#1adb80"
                activeDot={{ r: 10, color: "red" }}
                strokeWidth={2}
              />
              <CartesianGrid strokeDasharray="5 5" stroke={"rgba(0,0,0,0.2)"} />
              <XAxis
                dataKey="name"
                padding={{ left: 30, right: 30 }}
                stroke={"rgba(0,0,0,0.8)"}
                label={{
                  value: "Date",
                  position: "bottom",
                  stroke: "#fff",
                  letterSpacing: "2px",
                  fontWeight: "100",
                }}
              />
              <YAxis
                stroke={"rgba(0,0,0,0.8)"}
                padding={{ top: 30, bottom: 0 }}
                label={{
                  value: "Users",
                  angle: -90,
                  position: "insideLeft",
                  stroke: "#fff",
                  letterSpacing: "2px",
                }}
              ></YAxis>
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div>
          <LoaderAnmation></LoaderAnmation>
        </div>
      )}
    </React.Fragment>
  );
};

export default Line1;
