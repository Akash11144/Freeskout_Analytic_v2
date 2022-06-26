import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import { postR } from "../../utlis";
import Styles from "./index.module.css";
import companyLogo from "../../assets/FsnoBg.gif";
import InformationPopUp from "../../extras/pop-ups/information";
import SmallLoading from "../../extras/loading-animation/small-loading";

let localLink = "http://localhost:1111";
let mainLink = "https://freeskout-analytic-v2-backend.herokuapp.com";
let route = "/validate/login";

let errorObj = {
  desc: "",
  navigation: false,
  navigationRoute: "",
};

const getYear = () => {
  var dt = new Date();
  return dt.getFullYear();
};

const Login = () => {
  const [popUp, setpopUp] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [PageLoading, setPageLoading] = useState(true);

  let username = useRef(null);
  let password = useRef(null);

  const navi = useNavigate();
  const loc = useLocation();

  useEffect(() => {
    // if (loc.pathname === "/") {
    //   let t = JSON.parse(localStorage.getItem("Freeskout-session"));
    //   if (t !== null) navi("/home");
    // }
    let t = JSON.parse(localStorage.getItem("Freeskout-session"));
    if (t !== null) navi("/home");
    setPageLoading(false);
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    if (username.current.value === "" || password.current.value === "") {
      errorObj.desc = "Please fill all fields";
      setLoading(false);
      setpopUp(true);
    } else {
      let r = await postR(
        localLink,
        route,
        { name: username.current.value, password: password.current.value },
        ""
      );
      console.log("output from login page post", r);
      if (r.FetchIssue) {
        errorObj.desc = r.FetchIssueDetail;
        setLoading(false);
        setpopUp(true);
      } else {
        if (r.issue) {
          errorObj.desc = r.issueDetail;
          setLoading(false);
          setpopUp(true);
        } else if (r.output) {
          setLoading(false);
          localStorage.setItem("Freeskout-session", JSON.stringify(r.output));
          navi("/home");
        }
      }
    }
  };

  return (
    <div id="main" className={Styles.main_container}>
      {PageLoading && <SmallLoading />}
      <div className={Styles.FsImgCont}>
        <img src={companyLogo} alt="Company Logo" className={Styles.logo} />
      </div>
      <div className={Styles.box}>
        <h2>Login</h2>
        <div className={Styles.inputContainer}>
          <input
            ref={username}
            type="text"
            required="requried"
            maxLength="50"
            className={Styles.userNameInput}
          />
          <span>Username</span>
        </div>
        <div className={Styles.inputContainer}>
          <input
            ref={password}
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
            {getYear()}
          </span>
        </p>
      </div>
      {popUp && <InformationPopUp {...errorObj} b={(val) => setpopUp(val)} />}
      {Loading && <SmallLoading />}
    </div>
  );
};

export default Login;
