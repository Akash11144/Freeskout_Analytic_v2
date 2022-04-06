import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { fetchR } from "../utlis";
import CounterBanner from "./counter-banner";
import Bar1 from "./graphs/bar";
import Line1 from "./graphs/line";
import OSbased from "./graphs/os-based";
import { motion } from "framer-motion";

const GraphDashboard = () => {
  const navi1 = useNavigate();
  const [data, setdata] = useState([]);
  useEffect(async () => {
    if (JSON.parse(localStorage.getItem("Freeskout-session")) === null) {
      navi1("/");
    }
    let link =
      "https://freeskout-analytic-v2-backend.herokuapp.com/user/getAll";
    let r = await fetchR(link);
    setdata(r);
  }, []);

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth }}
    >
      <h1 className="text-center">Graph Dashboard</h1>
      {data.length ? <CounterBanner></CounterBanner> : <h1>Loading.....</h1>}
      {data.length ? <Line1 {...data}></Line1> : <h1>Loading....</h1>}
      <Bar1></Bar1>
      {data.length ? <OSbased {...data}></OSbased> : <h1>Loading.....</h1>}
    </motion.div>
  );
};

export default GraphDashboard;
