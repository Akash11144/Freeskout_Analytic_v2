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
import { perDay, perDayOS } from "../graph-utils";

const MainGraph = (props) => {
  const [data, setdata] = useState([]);
  useEffect(() => {
    console.log("checking props", props.length);
    for (let i = 0; i < props.length; i++) console.log(props[i]);
    let r = perDayOS(props);
    setdata(r);
  }, []);

  //njn
  return (
    <React.Fragment>
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
