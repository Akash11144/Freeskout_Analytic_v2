import { useEffect, useState } from "react";
import { postR , monthNumberObserver as MNO } from "../utlis";


let link = "not using/http://localhost:8000";
let route = "not using/user/getUser";

const Trial = () => {
  const [data, setdata] = useState([]);
  useEffect(async () => {
    try {
      let y = await fetch("http://localhost:8000/user/getC");
      let y1 = await y.json();
      console.log(y1);
      setdata(y1);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const setData = async () => {
    let y = JSON.parse(localStorage.getItem("d2trial"));
    console.log(y)
    for (let i = 0; i < y.length; i++) {
      y[i].year=+y[i].time.split(" ")[3];
      y[i].month=MNO(y[i].time.split(" ")[2]);
      y[i].date=+y[i].time.split(" ")[1];
      y[i].day=y[i].time.split(" ")[0];
      y[i].hours=+y[i].time.split(" ")[4].split(":")[0];
      y[i].mins=+y[i].time.split(" ")[4].split(":")[0];
      await postR(link, route, y[i]);
    }
    console.log("done",y);
  };

  const delData = async () => {
    let y = JSON.parse(localStorage.getItem("del-trial"));
    for (let i = 0; i < y.length; i++) {
      delete y[i].lat;
      delete y[i].long;
      await postR(link, route, y[i]);
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        backgroundColor: "skyblue",
        padding: "10px",
      }}
    >
      <h1>Trial</h1>
      <button
        style={{
          border: "0",
          borderRadius: "50px",
          padding: "10px",
          fontSize: "20px",
          boxShadow: "0px 5px 20px black",
        }}
        onClick={() => setData()}
      >
        set data L
      </button>
      <br></br>
      <button
        style={{
          border: "0",
          borderRadius: "50px",
          padding: "10px",
          fontSize: "20px",
          boxShadow: "0px 5px 20px black",
          marginTop: "10px",
        }}
        onClick={() => delData()}
      >
        del data
      </button>
    </div>
  );
};

export default Trial;
