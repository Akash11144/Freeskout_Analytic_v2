import { useEffect, useState } from "react";
import dstyles from "./index.module.css";
import { useNavigate } from "react-router";
import Loader from "../loadingAnimation";

const Dash = () => {
  const navi1 = useNavigate();
  const [data, setData] = useState({
    fixData: [],
    changableData: [],
  });

  useEffect(() => {
    // if (JSON.parse(localStorage.getItem("Freeskout-session")) === null) {
    //   navi1("/");
    // }
    const dataFetch = async () => {
      let y = await fetch(
        "https://freeskout-analytic-v2-backend.herokuapp.com/user/getAll"
      );
      let y1 = await y.json();
      console.log("data here", y1, y.status);
      setData({
        fixData: y1,
        changableData: y1,
      });
    };
    dataFetch();
  }, []);

  const dataSetter = (a) => {
    if (a === "all") {
      setData({
        ...data,
        changableData: data.fixData,
      });
    }
    if (a === "windows") {
      let y = data.fixData.filter((a) => a.os_name === "Windows");
      setData({
        ...data,
        changableData: y,
      });
    }
    if (a === "ios") {
      let y = data.fixData.filter((a) => a.os_name === "iOS");
      console.log(y);
      setData({
        ...data,
        changableData: y,
      });
    }
    if (a === "android") {
      let y = data.fixData.filter((a) => a.os_name === "Android");
      console.log(y);
      setData({
        ...data,
        changableData: y,
      });
    }
  };

  return (
    <div>
      <h1 className={dstyles.heading}>Dashboard</h1>
      <div className={dstyles.main}>
        {data.changableData.length ? (
          <h1>{data.changableData.length}</h1>
        ) : (
          <div>
            <Loader></Loader>
          </div>
        )}
      </div>
      <div className={dstyles.buttonHolder}>
        <button
          className="btn btn-outline-primary"
          onClick={() => dataSetter("all")}
        >
          All
        </button>
        <button
          className="btn btn-outline-dark"
          onClick={() => dataSetter("windows")}
        >
          windows
        </button>
        <button
          className="btn btn-outline-warning"
          onClick={() => dataSetter("ios")}
        >
          ios
        </button>
        <button
          className="btn btn-outline-info"
          onClick={() => dataSetter("android")}
        >
          Android
        </button>
      </div>
      {data.changableData.length ? (
        <div className={dstyles.userContainer}>
          {data.changableData.map((a) => (
            <Profile {...a}></Profile>
          ))}
        </div>
      ) : (
        <div>
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Dash;

const Profile = (props) => {
  return (
    <div className={dstyles.user} key={props.id}>
      <p>id: {props.id}</p>
      <p>ip: {props.ip}</p>
      <p>browser name: {props.browser_name}</p>
      <p>browser version: {props.browser_version}</p>
      <p>os architecture: {props.os_architecture}</p>
      <p>os name: {props.os_name}</p>
      <p>os version: {props.os_version}</p>
      <p>product manufacturer: {props.product_manufacturer}</p>
      <p>product name: {props.product_name}</p>
      {/* <p>latitude: {props.lat}</p>
      <p>longitude: {props.long}</p> */}
      <p>time: {props.time}</p>
    </div>
  );
};
