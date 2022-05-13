import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Loader from "../../loadingAnimation";
import { perDay } from "../graph-utils";

const MainGraph = (props) => {
  const [data, setdata] = useState([]);
  useEffect(() => {
    let y = perDay(props);
    console.log("inside os based graph");
    const ff = () => {
      let obj = [];
      for (let i = 0; i < y.length; i++) {
        let { uData } = y[i];
        let u = uData.filter((a) => a.os_name === "iOS").length;
        let u1 = uData.filter((a) => a.os_name === "Windows").length;
        let u2 = uData.filter((a) => a.os_name === "Android").length;
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
      {console.log("inside os based page return")}
      {data.length ? (
        <div
          style={{
            background: "rgba(255, 255, 255, 0.3)",
            width: "98%",
            borderRadius: "50px",
            boxShadow: "0 0 5px black",
            margin: "20px auto",
            padding: "7% 6% 7% 0",
          }}
        >
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart
              width={100}
              height={300}
              data={data}
              margin={{
                top: 10,
                right: 5,
                left: 0,
                bottom: 3,
              }}
            >
              <Area type="monotone" dataKey="iOS" stroke="#8884d8" />
              <Area type="monotone" dataKey="Android" stroke="#db1840" />
              <Area type="monotone" dataKey="Windows" stroke="#248624" />
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              {/* <Legend /> */}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div>
          <Loader />
        </div>
      )}
    </React.Fragment>
  );
};

export default MainGraph;
