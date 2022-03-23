import { useEffect, useState } from "react";
import { postR, monthNumberObserver as MNO } from "../utlis";

let link = "not using/http://localhost:8000";
let route = "not using/user/setUser";

const Trial = () => {
  const [data, setdata] = useState([]);
  useEffect(async () => {
    try {
      let y = await fetch("http://localhost:8000/user/getAll");
      let y1 = await y.json();
      console.log(y1);
      setdata(y1);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const setData = async () => {
    let y = JSON.parse(localStorage.getItem("d2trial"));
    console.log(y);
    for (let i = 0; i < y.length; i++) {
      switch (y[i].day) {
        case "Mon,":
          y[i].day = "Mon";
          break;
        case "Tue,":
          y[i].day = "Tue";
          break;
        case "Wed,":
          y[i].day = "Wed";
          break;
        case "Thu,":
          y[i].day = "Thu";
          break;
        case "Fri,":
          y[i].day = "Fri";
          break;
        case "Sat,":
          y[i].day = "Sat";
          break;
        case "Sun,":
          y[i].day = "Sun";
          break;
        default:
          break;
      }
      await postR(link, route, y[i]);
    }
    console.log("done", y);
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
        className="btn btn-danger btn-lg"
        style={{ boxShadow: "0px 0px 20px black" }}
        onClick={() => setData()}
      >
        set data L
      </button>
      <br></br>
      <button
        className="btn btn-danger btn-lg"
        style={{
          boxShadow: "0px 0px 20px black",
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
