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

const OSbased = (props) => {
  const [data, setdata] = useState([]);
  useEffect(() => {
    let y = perDay(props);
    const ff = () => {
      let obj = [];
      for (let i = 0; i < y.length; i++) {
        let u = y[i].uData.filter((a) => {
          return a.os_name === "iOS";
        }).length;
        let u1 = y[i].uData.filter((a) => {
          return a.os_name === "Windows";
        }).length;
        let u2 = y[i].uData.filter((a) => {
          return a.os_name === "Android";
        }).length;
        obj.push({ name: y[i].name, iOS: u, Android: u2, Windows: u1 });
      }
      console.log(obj);
      return obj;
    };
    let r = ff();
    setdata(r);
  }, []);

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
          <ResponsiveContainer width="100%" height={450}>
            <LineChart
              data={data}
              margin={{
                top: 20,
                right: 10,
                left: 0,
                bottom: 0,
              }}
            >
              <Line type="monotone" dataKey="iOS" stroke="#8884d8" />
              <Line type="monotone" dataKey="Android" stroke="#db1840" />
              <Line type="monotone" dataKey="Windows" stroke="#248624" />
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

export default OSbased;
