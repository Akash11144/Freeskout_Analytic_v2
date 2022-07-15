import Styles from "./index.module.css";
import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";

const getYear = () => {
  var dt = new Date();
  return dt.getFullYear();
};

const Topbar = (props) => {
  const [admin, setadmin] = useState(false);

  let i = false;
  useEffect(() => {
    !i && props.email === "info@freeskout.com" && setadmin(props.email);
    return () => (i = true);
  }, [props]);

  return <TopbarLayout admin={admin} person={props.name} email={props.email} />;
};

export default Topbar;

// --------------------------------------------------------------

const TopbarLayout = ({ admin, person, email }) => {
  const [isActive, setisActive] = useState(false);

  const pageNameRef = useRef(null);
  const loc = useLocation();
  const navi1 = useNavigate();

  let i = false;
  useEffect(() => {
    if (!i) {
      if (loc.pathname === "/home")
        pageNameRef.current.innerText = "Create Link";
      if (loc.pathname === "/home/lm")
        pageNameRef.current.innerText = "Manage Link";
      if (loc.pathname === "/home/fum")
        pageNameRef.current.innerText = "Manage Users";
    }
    return () => (i = true);
  }, [loc.pathname]);

  const hamClick = () => setisActive(!isActive);

  const handleLogout = async () => {
    navi1("/");
    let dt = JSON.parse(localStorage.getItem("Freeskout-session"));
    localStorage.removeItem("Freeskout-session");
    let r = await fetch("http://localhost:1111/validate/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ delToken: dt }),
    });
    let r1 = await r.json();
    console.log(r1);
  };

  return (
    <nav className={Styles.allCont}>
      <div className={Styles.mainCont}>
        <div className={Styles.topBarSecCont}>
          <div
            className={Styles.leftMain}
            id="hamburger"
            onClick={() => hamClick()}
          >
            <div className={Styles.hamCont}>
              <span
                className={`${Styles.line} ${isActive ? Styles.lineTop : Styles.line
                  }`}
                id="topLine"
              ></span>
              <span
                className={`${Styles.line}  ${isActive ? Styles.lineMiddle : Styles.line
                  }`}
                id="bottomLine"
              ></span>
              <span
                className={`${Styles.line} ${isActive ? Styles.lineBottom : Styles.line
                  }`}
                id="endLine"
              ></span>
            </div>
          </div>
          <div ref={pageNameRef} className={Styles.pageName}></div>
          <div className={Styles.LoggerHolder}>
            <p className={Styles.loggerName}>
              <q>Hi {person}</q>
            </p>
          </div>
        </div>
      </div>
      <div
        className={`${Styles.sideBarCont} ${isActive ? Styles.sideBarShow : Styles.sideBarCont
          }`}
        id="sideMenu"
      >
        <div className={Styles.sideBar}>
          <div className={Styles.stars}></div>
          <div className={Styles.stars2}></div>
          <div className={Styles.stars3}></div>
          <div className={Styles.optionsContainer}>
            <Link
              className={Styles.linky}
              to={"/home"}
              state={{ admin, email }}
              onClick={() => hamClick()}
            >
              <p>Create Link</p>
            </Link>
            <Link
              className={Styles.linky}
              to={"/home/lm"}
              state={{ admin, email }}
              onClick={() => hamClick()}
            >
              <p>Manage Links</p>
            </Link>
            {admin && (
              <Link
                className={Styles.linky}
                to={"/home/fum"}
                state={{ admin, email }}
                onClick={() => hamClick()}
              >
                <p>Manage Users</p>
              </Link>
            )}
            <Link
              className={Styles.linky}
              to={"/home"}
              state={{ admin, email }}
              onClick={() => hamClick()}
            >
              <p>Dashboard</p>
            </Link>
          </div>
          <p className={Styles.SblogOutBtn} onClick={() => handleLogout()}>
            Logout
          </p>
          <div className={Styles.copyRightCont}>
            <p className={Styles.CopyRightP}>
              © Freeskout{" "}
              <span className={Styles.CRyearCont} id="CRyear">
                {getYear()}
              </span>
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};
