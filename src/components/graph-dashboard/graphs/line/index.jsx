import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { perDay } from "../../graph-utils";

const Line1 = (props) => {
  const [data, setdata] = useState([]);
  useEffect(() => setdata(perDay(props)), []);

  return (
    <React.Fragment>
      {data.length ? (
        <div
          style={{
            width: "98%",
            boxShadow: "0 0 5px black",
            margin: "20px auto",
          }}
        >
          <ResponsiveContainer width="100%" height={250}>
            <LineChart
              data={data}
              margin={{
                top: 20,
                right: 10,
                left: 0,
                bottom: 0,
              }}
            >
              <Line type="monotone" dataKey="count" stroke="#8884d8" />
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              {/* <Legend /> */}
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </React.Fragment>
  );
};

export default Line1;