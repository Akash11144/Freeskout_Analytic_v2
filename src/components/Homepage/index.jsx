import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { fetchR } from "../utlis";
import Topbar from "./topbar";
import Styles from "../homepage/index.module.css";
import InformationPopUp from "../extras/pop-ups/information";
import RouteCreationDesign from "./route-creation";
import SmallLoading from "../extras/loading-animation/small-loading";
import FUM from "./freeskout-user-management";

let errorObj = {
  desc: "",
  navigation: true,
  navigationRoute: "",
};

const Home = () => {
  const navi1 = useNavigate();
  const [person, setperson] = useState("");
  const [loggedIn, setloggedIn] = useState(false);
  const [pageLoading, setpageLoading] = useState(true);
  const [pageStart, setpageStart] = useState(false);
  const [admin, setadmin] = useState(false);
  const [pageError, setpageError] = useState(false);

  useEffect(() => {
    setpageStart(true);
    const checkPersistent = async () => {
      let ls = JSON.parse(localStorage.getItem("Freeskout-session"));
      if (ls === null) {
        console.log("token not found in local storage", ls);
        errorObj.desc = "token not found in local storage";
        errorObj.navigationRoute = "/";
        setpageError(true);
      } else {
        let r1 = await fetch("http://localhost:1111/validate/persistLogin", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ls}`,
          },
        });
        let r2 = await r1.json();
        console.log(r2);
        if (r2.issue) {
          errorObj.desc = r2.issueDetail;
          errorObj.navigationRoute = "/";
          setpageError(true);
        } else {
          setloggedIn(true);
          if (r2.output.email === "info@freeskout.com") setadmin(true);
          setperson(r2.output);
        }
      }
    };
    checkPersistent();
    setpageLoading(false);
  }, []);

  return (
    <React.Fragment>
      {pageLoading && <SmallLoading />}
      {pageStart ? (
        <div>
          {loggedIn ? (
            <div className={Styles.mainGcont}>
              {person && <Topbar {...person} />}
              {person && <RouteCreationDesign {...person} />}
            </div>
          ) : (
            pageError && <InformationPopUp {...errorObj} />
          )}
        </div>
      ) : (
        ""
      )}
    </React.Fragment>
    //
  );
};

export default Home;
