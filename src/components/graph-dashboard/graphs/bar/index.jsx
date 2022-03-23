import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { fetchR } from "../../../utlis";

const Bar1 = () => {
  const [data, setdata] = useState([]);
  useEffect(() => {
    const DayGetter = async () => {
      let y = [];
      y.push({
        day: "Mon",
        count: +(await fetchR(
          "https://freeskout-analytic-v2-backend.herokuapp.com/user/DayC/Mon,"
        )),
      });
      y.push({
        day: "Tue",
        count: +(await fetchR(
          "https://freeskout-analytic-v2-backend.herokuapp.com/user/DayC/Tue,"
        )),
      });
      y.push({
        day: "Wed",
        count: +(await fetchR(
          "https://freeskout-analytic-v2-backend.herokuapp.com/user/DayC/Wed,"
        )),
      });
      y.push({
        day: "Thu",
        count: +(await fetchR(
          "https://freeskout-analytic-v2-backend.herokuapp.com/user/DayC/Thu,"
        )),
      });
      y.push({
        day: "Fri",
        count: +(await fetchR(
          "https://freeskout-analytic-v2-backend.herokuapp.com/user/DayC/Fri,"
        )),
      });
      y.push({
        day: "Sat",
        count: +(await fetchR(
          "https://freeskout-analytic-v2-backend.herokuapp.com/user/DayC/Sat,"
        )),
      });
      y.push({
        day: "Sun",
        count: +(await fetchR(
          "https://freeskout-analytic-v2-backend.herokuapp.com/user/DayC/Sun,"
        )),
      });
      console.log(y);
      setdata(y);
    };
    DayGetter();
  }, []);

  //   if (dayData.temp === 0) {
  //     DayGetter();
  //   }

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
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              // width={500}
              // height={300}
              data={data}
              margin={{
                top: 20,
                right: 10,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              {/* <Legend /> */}
              <Bar dataKey="count" fill="#8884d8" />
              {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <h1>loading...</h1>
      )}
    </React.Fragment>
  );
};

export default Bar1;
