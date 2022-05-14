import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import { fetchR } from "../../../utlis";
import Styles from "../bar/index.module.css";
import LoaderAnmation from "../../../loadingAnimation";
const getPath = (x, y, width, height) =>
  `M${x},${y + height}
   C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${
    x + width / 2
  }, ${y}
   C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
    x + width
  }, ${y + height}
   Z`;

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

const Bar1 = () => {
  const [data, setdata] = useState([]);
  useEffect(() => {
    // console.log("inside bar graph");
    const DayGetter = async () => {
      let y = [];
      y.push({
        day: "Mon",
        count: +(await fetchR(
          "https://freeskout-analytic-v2-backend.herokuapp.com/user/DayC/Mon"
        )),
      });
      y.push({
        day: "Tue",
        count: +(await fetchR(
          "https://freeskout-analytic-v2-backend.herokuapp.com/user/DayC/Tue"
        )),
      });
      y.push({
        day: "Wed",
        count: +(await fetchR(
          "https://freeskout-analytic-v2-backend.herokuapp.com/user/DayC/Wed"
        )),
      });
      y.push({
        day: "Thu",
        count: +(await fetchR(
          "https://freeskout-analytic-v2-backend.herokuapp.com/user/DayC/Thu"
        )),
      });
      y.push({
        day: "Fri",
        count: +(await fetchR(
          "https://freeskout-analytic-v2-backend.herokuapp.com/user/DayC/Fri"
        )),
      });
      y.push({
        day: "Sat",
        count: +(await fetchR(
          "https://freeskout-analytic-v2-backend.herokuapp.com/user/DayC/Sat"
        )),
      });
      y.push({
        day: "Sun",
        count: +(await fetchR(
          "https://freeskout-analytic-v2-backend.herokuapp.com/user/DayC/Sun"
        )),
      });
      // console.log("bar data", y);
      setdata(y);
    };
    DayGetter();
  }, []);

  return (
    <div className={Styles.mainCont}>
      <React.Fragment>
        {data.length ? (
          <div
            style={{
              // background: "rgba(255, 255, 255, 0.3)",
              // width: "98%",
              // borderRadius: "10%",
              // boxShadow: "0 0 5px black",
              // margin: "20px auto",
              // padding: "7% 6% 7% 0",
              padding: "7% 6% 7% 0",
              background: "rgba( 255, 255, 255, 0.45 )",
              boxShadow: " 0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
              backdropFilter: " blur( 6.5px )",
              WebkitBackdropFilter: "blur(6.5px)",
              borderRadius: "10px",
            }}
          >
            <ResponsiveContainer width="100%" height={350}>
              <BarChart
                // width={500}
                // height={300}
                data={data}
                margin={{
                  top: 10,
                  right: 5,
                  left: 0,
                  bottom: 3,
                }}
              >
                <CartesianGrid
                  strokeDasharray="10 10"
                  stroke="rgba(102, 100, 100, 0.07)"
                />
                <XAxis dataKey="day" stroke="rgb(2, 9, 69)" />
                <YAxis stroke="rgb(2, 9, 69)" />
                <Tooltip cursor={{ fill: "transparent" }} />
                {/* <Legend
                  width={100}
                  wrapperStyle={{
                    top: 20,
                    right: 10,
                    backgroundColor: "(rgba(255,255,255,0.3)",
                    border: "1px solid #d5d5d5",
                    borderRadius: 3,
                    lineHeight: "10px",
                    padding: "1% 2%",
                  }}
                /> */}
                <Bar
                  dataKey="count"
                  fill="#1adb80"
                  shape={<TriangleBar />}
                  barSize={100}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className={Styles.loaderContainer}>
            <LoaderAnmation></LoaderAnmation>
          </div>
        )}
      </React.Fragment>
    </div>
  );
};

export default Bar1;
