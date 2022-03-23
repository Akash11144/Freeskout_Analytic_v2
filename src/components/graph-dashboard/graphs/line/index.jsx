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

const Line1 = (props) => {
  const [data, setdata] = useState([]);
  useEffect(() => {
    const ff = (a) => {
      let perDayUser = [];
      let il = Object.keys(a).length;
      for (let i = 0; i < il; i++) {
        let b = a[i].date;
        let d = {
          name: 0,
          count: 0,
        };
        d.name = b;
        d.count = d.count + 1;
        if (i === il - 1) {
          perDayUser.push(d);
          break;
        }
        for (let j = i + 1; j < il; j++) {
          let c = a[j].date;
          if (b === c) {
            d.count = d.count + 1;
            if (j === il - 1) {
              i = il;
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
      setdata(perDayUser);
    };
    ff(props);
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
