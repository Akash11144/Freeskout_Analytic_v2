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
} from "recharts";
import { fetchR } from "../utlis";


const GraphDashboard = () => {
  const [data, setdata] = useState([]);
  useEffect(async () => {
    console.log("inside ue1");
    let link = "https://freeskout-analytic-v2-backend.herokuapp.com/user/getC";
    let r = await fetchR(link);
    setdata(r);
  }, []);


  const ff = (a) => {
    let perDayUser = [];
    for (let i = 0; i < a.length; i++) {
      let b = a[i].time.split(" ")[1];
      let d = {
        count: 0,
        data2: [],
      };
      d.count = d.count + 1;
      d.data2.push(a[i]);
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


  return (
    <div>
      <h1>Graph Dashboard</h1>
      {data.length ? (
        <div>
          <LineChart width={350} height={280} data={ff(data)}>
            <Line type="monotone" dataKey="count" stroke="#8884d8" />
          </LineChart>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default GraphDashboard;
