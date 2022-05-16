import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { fetchR } from "../utlis";
import CounterBanner from "./counter-banner";
import Bar1 from "./graphs/bar";
import Line1 from "./graphs/line";
import OSbased from "./graphs/os-based";
import Topbar from "../topbar";
import Sidebar from "../sidebar";
import Loader from "../loadingAnimation";
import MainGraph from "../graph-dashboard/mainGraph";
import Styles from "../graph-dashboard/index.module.css";
import DivDivider from "../divDivider";

const GraphDashboard = () => {
  const navi1 = useNavigate();
  const [data, setdata] = useState([]);
  useEffect(() => {
    // console.log("inside graph main page");
    const fetchData = async () => {
      let y = JSON.parse(localStorage.getItem("Freeskout-session"));
      if (y === null) {
        // navi1("/");
      } else {
        const r = await fetch("http://localhost:8000/valoidate/persistLogin", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${y}`,
          },
        });
        console.log("persist 0 =>", r);
        let x = await r.json();
        console.log("persist data", x);
      }
      // let link =
      // "https://freeskout-analytic-v2-backend.herokuapp.com/user/getAll";
      let link = "http://localhost:8000/user/getAll";
      let r = await fetchR(link);
      console.log("main page", r);
      setdata(r);
    };
    fetchData();
  }, []);

  return (
    <div className={Styles.mainGcont}>
      <Topbar></Topbar>
      <div className={Styles.sidePlusMain}>
        <Sidebar {...data}></Sidebar>
        <div className={Styles.mainAppCont}>
          <div className={Styles.graphContainer}>
            <CounterBanner></CounterBanner>
            <div className={Styles.slectedgraphDiv}>
              <div className={Styles.slectedgraphLeftDiv}>
                {data.length ? <MainGraph {...data}></MainGraph> : <Loader />}
              </div>
              <div className={Styles.slectedgraphRightDiv}>
                <div className={Styles.graphNameNdetails}>
                  <h2 className={Styles.graphName}>Name & Type of Graph</h2>
                  <p className={Styles.axesDetails}>
                    x - "Hello", y - "Challo"
                  </p>
                </div>
                <div className={Styles.otherDetailsDiv}>
                  <p className={Styles.majorDetails}>
                    lorem ipsum dollar lorem ipsum dollar lorem ipsum dollar
                    lorem ipsum dollar lorem ipsum dollar lorem ipsum dollar
                    lorem ipsum dollar lorem ipsum dollar lorem ipsum dollar
                  </p>
                </div>
              </div>
            </div>
            <div className={Styles.dividerDiv}></div>
            <div className={Styles.nxtGraphsContDiv}>
              <h2 className={Styles.nxtGraphsHead}>Related Graphs</h2>
              <div className={Styles.nxtGraphsCont}>
                <div className={Styles.nextGraphSecCont}>
                  <div className={Styles.nextgraphs}>
                    <div className={Styles.nextGraphCont}>
                      {data.length ? <Line1 {...data}></Line1> : <Loader />}
                    </div>
                    <p className={Styles.nxtGraphName}>Line Graph</p>
                  </div>
                  <div className={Styles.nextgraphs}>
                    <div className={Styles.nextGraphCont}>
                      <Bar1></Bar1>
                    </div>
                    <p className={Styles.nxtGraphName}>BAR Graph</p>
                  </div>
                </div>
                <div className={Styles.nextGraphSecCont}>
                  <div className={Styles.nextgraphs}>
                    <div className={Styles.nextGraphCont}>
                      {data.length ? <OSbased {...data}></OSbased> : <Loader />}{" "}
                    </div>
                    <p className={Styles.nxtGraphName}>OS based</p>
                  </div>
                  <div className={Styles.nextgraphs}>
                    <div className={Styles.nextGraphCont}>
                      {data.length ? <Line1 {...data}></Line1> : <Loader />}
                    </div>
                    <p className={Styles.nxtGraphName}>Line Graph</p>
                  </div>
                </div>
                <div className={Styles.nextGraphSecCont}>
                  <div className={Styles.nextgraphs}>
                    <div className={Styles.nextGraphCont}>
                      <Bar1></Bar1>
                    </div>
                    <p className={Styles.nxtGraphName}>BAR Graph</p>
                  </div>
                  <div className={Styles.nextgraphs}>
                    <div className={Styles.nextGraphCont}>
                      {data.length ? <OSbased {...data}></OSbased> : <Loader />}{" "}
                    </div>
                    <p className={Styles.nxtGraphName}>OS based</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphDashboard;
