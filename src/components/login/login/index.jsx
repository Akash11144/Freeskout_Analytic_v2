import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { postR, L_LINK } from "../../utlis";
import Styles from "./index.module.css";
import companyLogo from "../../assets/FsnoBg.gif";
import InformationPopUp from "../../extras/pop-ups/information";
import SmallLoading from "../../extras/loading-animation/small-loading";

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

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("Freeskout-session")) !== null)
      navi("/home");

    setPageLoading(false);
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    if (username.current.value === "" || password.current.value === "") {
      errorObj.desc = "Please fill all fields";
      setLoading(false);
      setpopUp(!popUp);
    } else {
      let r = await postR(L_LINK, "/validate/login", {
        email: username.current.value,
        password: password.current.value,
      });
      console.log("output from login page post", r);
      if (r.issue) {
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
      {popUp && <InformationPopUp {...errorObj} />}
      {Loading && <SmallLoading />}
      <div className={Styles.stars}></div>
      <div className={Styles.stars2}></div>
      <div className={Styles.stars3}></div>
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
    </div>
  );
};

export default Login;
