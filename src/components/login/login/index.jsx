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

  let i = false;
  useEffect(() => {
    !i &&
      JSON.parse(localStorage.getItem("Freeskout-session")) !== null &&
      navi("/home");
    setPageLoading(false);
    return () => (i = true);
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    if (username.current.value === "" || password.current.value === "") {
      alert("Please fill all fields");
      setLoading(false);
    } else {
      let r = await postR(L_LINK, "/validate/login", {
        email: username.current.value,
        password: password.current.value,
      });
      if (r.issue) {
        errorObj.desc = r.issueDetail;
        setLoading(false);
        setpopUp(true);
      } else if (r.output) {
        localStorage.setItem("Freeskout-session", JSON.stringify(r.output));
        navi("/home");
        setLoading(false);
      }
    }
  };

  return (
    <>
      {Loading && <SmallLoading />}
      <section id="main" className={Styles.main_container}>
        {popUp ? (
          <InformationPopUp
            keyp={"loginPopUp"}
            loginPopUpC={() => setpopUp(false)}
            {...errorObj}
          />
        )
          : (<>
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
                  autoComplete="on"
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
                onClick={() => handleLogin()}
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
          </>)
        }
      </section>
    </>
  );
};

export default Login;
