import React, { useEffect, useState } from "react";
import { fetchR } from "../../utlis/index";
const CounterBanner = () => {
  let link = "https://freeskout-analytic-v2-backend.herokuapp.com";
  const [data, setdata] = useState([]);
  useEffect(async () => {
    const ff = async () => {
      let y = [];
      let a = await fetchR(link + "/user/getAllC");
      y.push({ name: "all", count: a });
      y.push({
        name: "Windows",
        count: await fetchR(link + "/user/OSC?sortBy=Windows"),
      });
      y.push({
        name: "iOS",
        count: await fetchR(link + "/user/OSC?sortBy=iOS"),
      });
      y.push({
        name: "Android",
        count: await fetchR(link + "/user/OSC?sortBy=Android"),
      });
      let b = await fetchR(link + "/user/DeviceC/desktop");
      y.push({
        name: "Desktop",
        count: b,
      });
      let c = await fetchR(link + "/user/DeviceC/iPad");
      y.push({
        name: "iPad",
        count: c,
      });
      y.push({
        name: "mobile",
        count: a - (b + c),
      });
      console.log(y);
      return y;
    };
    // let r = ff();
    // console.log(r);
    setdata(await ff());
  }, []);

  return (
    <React.Fragment>
      {data.length ? (
        <div className="container">
          <div className="row p-1 mx-auto">
            <div className="col-auto mt-2">
              <span className="badge bg-info fs-6">
                All{" "}
                <span className="badge bg-warning fs-6">{data[0].count}</span>
              </span>
            </div>
            <div className="col-auto mt-2">
              <span className="badge bg-success fs-6">
                Windows{" "}
                <span className="badge bg-warning fs-6">{data[1].count}</span>
              </span>
            </div>
            <div className="col-auto mt-2">
              <span className="badge bg-primary fs-6">
                IOS{" "}
                <span className="badge bg-warning fs-6"> {data[2].count}</span>
              </span>
            </div>
            <div className="col-auto mt-2">
              <span className="badge bg-danger fs-6">
                Android{" "}
                <span className="badge bg-warning fs-6"> {data[3].count}</span>
              </span>
            </div>
            <div className="col-auto mt-2">
              <span className="badge bg-secondary fs-6">
                Desktop{" "}
                <span className="badge bg-warning fs-6"> {data[4].count}</span>
              </span>
            </div>
            <div className="col-auto mt-2">
              <span className="badge bg-dark fs-6">
                Mobile{" "}
                <span className="badge bg-warning fs-6"> {data[6].count}</span>
              </span>
            </div>
            <div className="col-auto mt-2">
              <span className="badge bg-info fs-6">
                IPad{" "}
                <span className="badge bg-warning fs-6"> {data[5].count}</span>
              </span>
            </div>
          </div>
        </div>
      ) : (
        <h1>loading badges....</h1>
      )}
    </React.Fragment>
  );
};

export default CounterBanner;
