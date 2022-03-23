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
import Bar1 from "./graphs/bar";
import Line1 from "./graphs/line";

const GraphDashboard = () => {
  const [data, setdata] = useState([]);
  useEffect(async () => {
    let link =
      "https://freeskout-analytic-v2-backend.herokuapp.com/user/getAll";
    let r = await fetchR(link);
    setdata(r);
  }, []);

  return (
    <div>
      <h1>Graph Dashboard</h1>
      {data.length ? <Line1 {...data}></Line1> : <h1>Loading line.....</h1>}
      <Bar1></Bar1>
    </div>
  );
};

export default GraphDashboard;
