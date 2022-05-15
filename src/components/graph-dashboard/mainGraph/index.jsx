import React, { useEffect, useState } from "react";
import Styles from "../mainGraph/index.module.css";
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
            background: "rgba(0, 0, 0, 0.3)",
            width: "98%",
            borderRadius: "50px",
            boxShadow: "0 0 5px black",
            margin: "20px auto",
            padding: "7% 6% 7% 0",
          }}
        >
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={data}
              margin={{
                top: 1,
                right: 5,
                left: 0,
                bottom: 3,
              }}
            >
              <Area type="monotone" dataKey="iOS" stroke="black" fill="grey" />
              <Area
                type="monotone"
                dataKey="Android"
                stroke="blue"
                fill="cadetblue"
              />
              <Area
                type="monotone"
                dataKey="Windows"
                stroke="red"
                fill="pink"
              />
              <CartesianGrid
                strokeDasharray="5 5"
                stroke="rgba(255,255,255,0.3)"
              />
              <XAxis dataKey="name" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />
              {/* <Legend /> */}
            </AreaChart>
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

export default MainGraph;

const LoaderAnmation = () => {
  return (
    <div className={Styles.mainCont}>
      <div className={Styles.spinnerBox}>
        <div className={Styles.circleBorder}>
          <div className={Styles.circleCore}></div>
        </div>
      </div>
    </div>
  );
};
