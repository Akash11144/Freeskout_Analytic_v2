import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Styles from "./index.module.css";
import { useEffect } from "react";
const NoInternet = () => {
  let nav = useNavigate();
  useEffect(() => {
    let onlineSts = setInterval(() => {
      navigator.onLine && nav("/home");
    }, 2000);
    return () => {
      clearInterval(onlineSts);
    };
  }, []);
  const checkConnectivity = () => {
    navigator.onLine && nav("/home");
  };

  return (
    <div className={Styles.mainDivApp}>
      <div className={Styles.gifCont}></div>
      <div className={Styles.msgDiv}>
        <h2 className={Styles.mainMsg}>Slow or No Internet Connection</h2>
        <p className={Styles.message}>Check your connection and retry!!</p>
        <div
          className={Styles.homeBtn}
          onClick={() => {
            checkConnectivity();
          }}
        >
          Retry
        </div>
      </div>
    </div>
  );
};

export default NoInternet;
