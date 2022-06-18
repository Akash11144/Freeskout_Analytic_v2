import { useEffect, useState } from "react";
import { postR, monthNumberObserver as MNO } from "../utlis";

let link = "not using/http://localhost:1111";
let route = "not using/user/setUser";

const Trial = () => {
  const [data, setdata] = useState([]);
  useEffect(async () => {
    // try {
    //   let y = await fetch("http://localhost:1111/user/getAll");
    //   let y1 = await y.json();
    //   console.log(y1);
    //   setdata(y1);
    // } catch (error) {
    //   console.log(error);
    // }
  }, []);

  const setData = async () => {
    let localLink = "http://localhost:1111";
    let mainLink = "https://freeskout-analytic-v2-backend.herokuapp.com";
    let route = "/valid/login";
    let cred = { name: "Freeskout", password: "Freeskout_rajesh" };
    let a = await postR(mainLink, route, cred);
    console.log(a);
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
