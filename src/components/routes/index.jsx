import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router";
import { useState } from "react";
import { Link } from "react-router-dom";
import Dash from "../dashboard";
import GraphDashboard from "../graph-dashboard";
import Redir from "../redirection";
import Trial from "../trial";
import { postR } from "../utlis";
import Styles from "../routes/index.module.css";
import companyLogo from "../assets/FsnoBg.gif";
import RouteCreation from "../route-creation";
import InformationPopUp from "../popUps/information";

let localLink = "http://localhost:8000";
let mainLink = "https://freeskout-analytic-v2-backend.herokuapp.com";
let route = "/validate/login";

let errorObj = {
  desc: "",
  navigation: false,
  navigationRoute: "",
};

const MainRoutes = () => {
  const navi = useNavigate();
  useEffect(() => {
    let t = JSON.parse(localStorage.getItem("Freeskout-session"));
    // if (t !== null) navi("/gda");
  }, []);

  // -----------------------------------------

  const handleLogin = async () => {
    let un = document.getElementsByTagName("input")[0];
    let pass = document.getElementsByTagName("input")[1];
    let data = { name: un.value, password: pass.value };
    let r = await postR(localLink, route, data, "");
    console.log(r);
    if (r.issue) {
      errorObj.desc = r.issueDetail;
      setpopUp(true);
    } else if (r.output) {
      console.log(r.output);
      localStorage.setItem("Freeskout-session", JSON.stringify(r.output));
    }
  };
  const [yr, setyr] = useState();
  const [popUp, setpopUp] = useState(false);
  useEffect(() => {
    var dt = new Date();
    var fYear = dt.getFullYear();
    setyr(fYear);
  }, []);

  const renderHome = (val) => {
    setpopUp(val);
  };
  return (
    <Routes>
      <Route path="/rd" element={<Redir />} />
      <Route path="/da" element={<Dash />} />
      <Route path="/tr" element={<Trial />} />
      <Route path="/gda" element={<GraphDashboard />} />
      <Route path="/rc/*" element={<RouteCreation />} />
      <Route
        path="/"
        element={
          <div id="main" className={Styles.main_container}>
            <div className={Styles.FsImgCont}>
              <img
                src={companyLogo}
                alt="Company Logo"
                className={Styles.logo}
              />
            </div>
            <div className={Styles.box}>
              <h2>Login</h2>
              <div className={Styles.inputContainer}>
                <input
                  type="text"
                  required="requried"
                  maxLength="50"
                  className={Styles.userNameInput}
                />
                <span>Username</span>
              </div>
              <div className={Styles.inputContainer}>
                <input
                  type="password"
                  required="requried"
                  className={Styles.userNameInput}
                  maxLength="50"
                />
                <span>Secret </span>
              </div>
              <div
                className={Styles.logInBtn}
                onClick={(e) => {
                  e.preventDefault();
                  handleLogin();
                }}
              >
                Log In
              </div>
            </div>
            <div className={Styles.copyRightCont}>
              <p className={Styles.CopyRightP}>
                © Freeskout{" "}
                <span className={Styles.CRyearCont} id="CRyear">
                  {yr}
                </span>
              </p>
            </div>
            {popUp ? (
              <InformationPopUp
                {...errorObj}
                b={(val) => {
                  renderHome(val);
                }}
              ></InformationPopUp>
            ) : (
              ""
            )}
          </div>
        }
      />
    </Routes>
  );
};

export default MainRoutes;
