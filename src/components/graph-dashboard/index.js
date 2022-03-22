import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { fetchR } from "../utlis";

const GraphDashboard = () => {
  const [data, setdata] = useState([]);
  const [dayData, setdayData] = useState({ temp: 0, dta: [] });
  useEffect(async () => {
    let link =
      "https://freeskout-analytic-v2-backend.herokuapp.com/user/getAll";
    let r = await fetchR(link);
    setdata(r);
  }, []);

  const ff = (a) => {
    let perDayUser = [];
    for (let i = 0; i < a.length; i++) {
      let b = a[i].time.split(" ")[1];
      let d = {
        name: 0,
        count: 0,
        data2: [],
      };
      d.name = b;
      d.count = d.count + 1;
      d.data2.push(a[i]);
      if (i == a.length - 1) {
        perDayUser.push(d);
        break;
      }
      for (let j = i + 1; j < a.length; j++) {
        let c = a[j].time.split(" ")[1];
        if (b === c) {
          d.count = d.count + 1;
          d.data2.push(a[j]);
          if (j === a.length - 1) {
            i = a.length;
            perDayUser.push(d);
            break;
          }
        } else {
          perDayUser.push(d);
          i = j - 1;
          break;
        }
      }
    }
    console.log("done", perDayUser);
    return perDayUser;
  };

  let y = [];
  const DayGetter = async () => {
    y.push({
      day: "Mon",
      count: +(await fetchR("https://freeskout-analytic-v2-backend.herokuapp.com/user/DayC/Mon,")),
    });
    y.push({
      day: "Tue",
      count: +(await fetchR("https://freeskout-analytic-v2-backend.herokuapp.com/user/DayC/Tue,")),
    });
    y.push({
      day: "Wed",
      count: +(await fetchR("https://freeskout-analytic-v2-backend.herokuapp.com/user/DayC/Wed,")),
    });
    y.push({
      day: "Thu",
      count: +(await fetchR("https://freeskout-analytic-v2-backend.herokuapp.com/user/DayC/Thu,")),
    });
    y.push({
      day: "Fri",
      count: +(await fetchR("https://freeskout-analytic-v2-backend.herokuapp.com/user/DayC/Fri,")),
    });
    y.push({
      day: "Sat",
      count: +(await fetchR("https://freeskout-analytic-v2-backend.herokuapp.com/user/DayC/Sat,")),
    });
    y.push({
      day: "Sun",
      count: +(await fetchR("https://freeskout-analytic-v2-backend.herokuapp.com/user/DayC/Sun,")),
    });
    console.log(y);
    setdayData({
      temp: 1,
      dta: y,
    });
  };

  if (dayData.temp === 0) {
    DayGetter();
  }

  return (
    <div>
      <h1>Graph Dashboard</h1>
      {data.length ? (
        <div>
          <div
            style={{
              width: "98%",
              boxShadow: "0 0 5px black",
              margin: "20px auto",
            }}
          >
            <ResponsiveContainer width="100%" height={250}>
              <LineChart
                data={ff(data)}
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
        </div>
      ) : (
        <h1>Loading...</h1>
      )}


      {dayData.dta.length ? (
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
              data={dayData.dta}
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
    </div>
  );
};

export default GraphDashboard;
