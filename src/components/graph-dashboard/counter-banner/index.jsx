import React, { useEffect, useState } from "react";
// import LoaderAnmation from "../../loadingAnimation";
import { fetchR } from "../../utlis/index";
import Styles from "../counter-banner/index.module.css";
const CounterBanner = () => {
  let link = "https://freeskout-analytic-v2-backend.herokuapp.com";
  const [data, setdata] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      console.log("inside counter dashboard");
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
    };
    fetchData();
  }, []);

  return (
    <React.Fragment>
      {console.log("inside counter dashboard return")}
      <div className={Styles.mainCont}>
        <div className={Styles.tabsCont}>
          <div className={Styles.tabs}>
            <span className={Styles.deviceName}>
              All-{""}
              <span className={Styles.deviceNumber}>
                {data.length ? (
                  <span>{data[0].count}</span>
                ) : (
                  <div className={Styles.loaderCont}>
                    {" "}
                    <LoaderAnmation></LoaderAnmation>
                  </div>
                )}{" "}
              </span>
            </span>
          </div>
          <div className={Styles.tabs}>
            <span className={Styles.deviceName}>
              Windows-{""}
              <span className={Styles.deviceNumber}>
                {data.length ? (
                  <span> {data[1].count}</span>
                ) : (
                  <div className={Styles.loaderCont}>
                    {" "}
                    <LoaderAnmation></LoaderAnmation>
                  </div>
                )}
              </span>
            </span>
          </div>
          <div className={Styles.tabs}>
            <span className={Styles.deviceName}>
              IOS-{""}
              <span className={Styles.deviceNumber}>
                {data.length ? (
                  <span>{data[2].count}</span>
                ) : (
                  <div className={Styles.loaderCont}>
                    {" "}
                    <LoaderAnmation></LoaderAnmation>
                  </div>
                )}{" "}
              </span>
            </span>
          </div>
          <div className={Styles.tabs}>
            <span className={Styles.deviceName}>
              Android-{""}
              <span className={Styles.deviceNumber}>
                {data.length ? (
                  <span> {data[3].count}</span>
                ) : (
                  <div className={Styles.loaderCont}>
                    {" "}
                    <LoaderAnmation></LoaderAnmation>
                  </div>
                )}
              </span>
            </span>
          </div>
          <div className={Styles.tabs}>
            <span className={Styles.deviceName}>
              Desktop-{""}
              <span className={Styles.deviceNumber}>
                {data.length ? (
                  <span>{data[4].count}</span>
                ) : (
                  <div className={Styles.loaderCont}>
                    {" "}
                    <LoaderAnmation></LoaderAnmation>
                  </div>
                )}{" "}
              </span>
            </span>
          </div>
          <div className={Styles.tabs}>
            <span className={Styles.deviceName}>
              Mobile-{""}
              <span className={Styles.deviceNumber}>
                {data.length ? (
                  <span> {data[6].count}</span>
                ) : (
                  <div className={Styles.loaderCont}>
                    {" "}
                    <LoaderAnmation></LoaderAnmation>
                  </div>
                )}
              </span>
            </span>
          </div>
          <div className={Styles.tabs}>
            <span className={Styles.deviceName}>
              IPad-{""}
              <span className={Styles.deviceNumber}>
                {data.length ? (
                  <span> {data[5].count}</span>
                ) : (
                  <div className={Styles.loaderCont}>
                    {" "}
                    <LoaderAnmation></LoaderAnmation>
                  </div>
                )}
              </span>
            </span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CounterBanner;

const LoaderAnmation = () => {
  return (
    <div className={Styles.mainCont}>
      <div className={Styles.spinnerBox}>
        <div className={Styles.circleBorder}>
          <div className={Styles.circleCore}></div>
        </div>
      </div>
    </div>
  );
};
