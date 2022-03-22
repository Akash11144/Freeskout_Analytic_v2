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
    let link = "https://freeskout-analytic-v2-backend.herokuapp.com/user/getAll";
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

  return (
    <div>
      <h1>Graph Dashboard</h1>
      {data.length ? (
        <div
          style={{ width: "90%", boxShadow: "0 0 5px black", margin: "0 auto" }}
        >
          <ResponsiveContainer width="90%" height={200}>
            <LineChart data={ff(data)}>
              <Line type="monotone" dataKey="count" stroke="#8884d8" />
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default GraphDashboard;
