import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Dash from "../dashboard";
import GraphDashboard from "../graph-dashboard";
import Redir from "../redirection";
import Trial from "../trial";
import { postR } from "../utlis";
import Styles from "../routes/index.module.css";
import companyLogo from "../routes/freeskout.png";

let localLink = "http://localhost:8000";
let mainLink = "https://freeskout-analytic-v2-backend.herokuapp.com";
let route = "/valid/login";
// let route1 = "/user/c";
let route2 = "/user/persistLogin";

const MainRoutes = () => {
  const navi = useNavigate();
  useEffect(() => {
    let t = JSON.parse(localStorage.getItem("Freeskout-session"));
    if (t !== null) navi("/gda");
  }, []);

  const handleLogin = async () => {
    let un = document.getElementsByTagName("input")[0];
    let pass = document.getElementsByTagName("input")[1];
    let data = { name: un.value, password: pass.value };
    let r = await postR(localLink, route, data, "");
    console.log(r);
    if (r.allowed) {
      console.log("cred accepted");
      localStorage.setItem("Freeskout-session", JSON.stringify(r.ares));
      navi("/gda");
      return;
    }
    if (r.ares === "user not available") {
      alert("User not available");
      un.value = "";
      pass.value = "";
      return;
    }
    if (r.ares === "password not match") {
      alert("Incorrect Password");
      pass.value = "";
      return;
    }
  };

  return (
    <Routes>
      <Route path="/rd" element={<Redir></Redir>}></Route>
      <Route path="/da" element={<Dash></Dash>}></Route>
      <Route path="/tr" element={<Trial></Trial>}></Route>
      <Route path="/gda" element={<GraphDashboard></GraphDashboard>}></Route>
      <Route
        path="/"
        element={
          <div className={Styles.maindiv}>
            <div className={Styles.stars}></div>
            <div className={Styles.stars2}></div>
            <div className={Styles.stars3}></div>
            <div className={Styles.loginMainDiv}>
              <div className={Styles.FsImgCont}>
                <img src={companyLogo} alt="Company Logo" />
              </div>
              <div className={Styles.formContainer}>
                <div className={Styles.form__group}>
                  <input
                    type="text"
                    class={Styles.form__input}
                    id="name"
                    placeholder="Username"
                    required=""
                  />
                  <label for="name" class={Styles.form__label}>
                    Username
                  </label>
                </div>
                <div className={Styles.form__group}>
                  <input
                    type="password"
                    class={Styles.form__input}
                    id="password"
                    placeholder="Secret"
                    required=""
                  />
                  <label for="name" class={Styles.form__label}>
                    Secret
                  </label>
                </div>
              </div>
              <div className={Styles.loginBtnCont}>
                <div
                  className={Styles.logInBtn}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogin();
                  }}
                >
                  Log Me In
                </div>
                <Link className={Styles.siteLinkBtn} to="">
                  www.freeskout.com
                </Link>
              </div>
            </div>
          </div>
        }
      ></Route>
    </Routes>
  );
};

export default MainRoutes;
