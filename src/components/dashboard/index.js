import { useEffect, useState } from "react";
import dstyles from "./index.module.css";

const Dash = () => {
  const [count, setcount] = useState(0);

  useEffect(() => {
    const dataFetch = async () => {
      let y = await fetch(
        "https://freeskout-analytic-v2-backend.herokuapp.com/user/getC"
      );
      let y1 = await y.json();
      console.log("data here", y1, y.status);
      setcount(y1);
    };
    dataFetch();
  }, []);

  return (
    <div>
      <h1 className={dstyles.heading}>Dashboard</h1>
      <div className={dstyles.main}>
        {count.length ? <h1>{count.length}</h1> : <h1>Loading...</h1>}
      </div>
      {count.length ? (
        <div className={dstyles.userContainer}>
          {count.map((a) => (
            <Profile {...a}></Profile>
          ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Dash;

const Profile = (props) => {
  return (
    <div className={dstyles.user}>
      <p>browser name: {props.browser_name}</p>
      <p>browser version: {props.browser_version}</p>
      <p>id: {props.id}</p>
      <p>ip: {props.ip}</p>
      <p>os architecture: {props.os_architecture}</p>
      <p>os name: {props.os_name}</p>
      <p>os version: {props.os_version}</p>
      <p>product manufacturer: {props.product_manufacturer}</p>
      <p>product name: {props.product_name}</p>
      <p>time: {props.time}</p>
    </div>
  );
};
