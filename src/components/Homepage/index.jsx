import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { fetchR } from "../Utlis";
import Topbar from "./topbar";
import Styles from "./index.module.css";
import InformationPopUp from "../Extras/popUps/information";
import RouteCreation from "./route-creation";

let errorObj = {
  desc: "",
  navigation: true,
  navigationRoute: "",
};

const Home = () => {
  const navi1 = useNavigate();
  const [data, setdata] = useState([]);
  const [person, setperson] = useState("");
  const [loggedIn, setloggedIn] = useState(false);
  useEffect(() => {
    const checkPersistent = async () => {
      let ls = JSON.parse(localStorage.getItem("Freeskout-session"));
      if (ls === null) {
        console.log("token not found in local storage", ls);
        errorObj.desc = "token not found in local storage";
        errorObj.navigationRoute = "/";
      } else {
        setloggedIn(true);
        let r1 = await fetch("http://localhost:8000/validate/persistLogin", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ls}`,
          },
        });
        let r2 = await r1.json();
        console.log(r2);
        if (r2.issue) {
          alert(r2.issueDetail);
          errorObj.desc = r2.issueDetail;
          errorObj.navigationRoute = "/";
        } else {
          setperson(r2.output.name);
          // let link =
          // "https://freeskout-analytic-v2-backend.herokuapp.com/user/getAll";
          let link = "http://localhost:8000/user/getAll";
          let r = await fetchR(link);
          console.log("main page", r);
          setdata(r);
        }
      }
    };
    checkPersistent();
  }, []);

  return (
    <React.Fragment>
      {loggedIn ? (
        <div className={Styles.mainGcont}>
          <Topbar></Topbar>
          <RouteCreation></RouteCreation>
        </div>
      ) : (
        <InformationPopUp {...errorObj}></InformationPopUp>
      )}
    </React.Fragment>
    //
  );
};

export default Home;
