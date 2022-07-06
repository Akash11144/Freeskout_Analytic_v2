import Styles from "./index.module.css";
import Calendar from "../../extras/calendar/date-file";
import Time from "../../extras/calendar/time-file";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Topbar = (props) => {
  const [admin, setadmin] = useState(false);

  let i = false;
  useEffect(() => {
    if (!i) {
      if (props.email === "info@freeskout.com") {
        setadmin(true);
      }
    }
    return () => (i = true);
  }, [props]);

  return <TopbarLayout admin={admin} person={props.name} />;
};

export default Topbar;

// --------------------------------------------------------------

const TopbarLayout = ({ admin, person }) => {
  const [isActive, setisActive] = useState(false);
  const [pageName, setpageName] = useState("Create Link");
  const [sideFormLoader, setsideFormLoader] = useState(true);

  const handelCreateLink = () => {
    setpageName("Create Link");
  };
  const handelManageLink = () => {
    setpageName("Manage Links");
  };
  const handelManageUsers = () => {
    setpageName("Manage Users");
  };
  const handelDashboard = () => {
    setpageName("Dashboard");
  };
  const navi1 = useNavigate();
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
    <div className={Styles.allCont}>
      <div className={Styles.mainCont}>
        <div className={Styles.topBarSecCont}>
          <div
            className={Styles.leftMain}
            id="hamburger"
            onClick={() => hamClick()}
          >
            <div className={Styles.hamCont}>
              <span
                className={`${Styles.line} ${
                  isActive ? Styles.lineTop : Styles.line
                }`}
                id="topLine"
              ></span>
              <span
                className={`${Styles.line}  ${
                  isActive ? Styles.lineMiddle : Styles.line
                }`}
                id="bottomLine"
              ></span>
              <span
                className={`${Styles.line} ${
                  isActive ? Styles.lineBottom : Styles.line
                }`}
                id="endLine"
              ></span>
            </div>
          </div>
          <div className={Styles.pageName}>{pageName}</div>
          {/* <div className={Styles.dateTimeCont}>
            <div className={Styles.secDiv}>
              <p className={Styles.dateCont}>
                Date:
                <Calendar></Calendar>
              </p>
              <p className={Styles.timeCont}>
                Time:
                <Time></Time>
              </p>
            </div>
          </div> */}
          <div className={Styles.LoggerHolder}>
            <p className={Styles.loggerName}>
              <q>{person}</q>
            </p>
          </div>
        </div>
      </div>
      <div
        className={`${Styles.sideBarCont} ${
          isActive ? Styles.sideBarShow : Styles.sideBarCont
        }`}
        id="sideMenu"
      >
        <div className={Styles.sideBar}>
          <div className={Styles.stars}></div>
          <div className={Styles.stars2}></div>
          <div className={Styles.stars3}></div>
          {/* <div className={Styles.userNameCont}>
            <p>
              Hi <span>{person}</span>
              <span>,</span>
            </p>
          </div> */}
          <div className={Styles.optionsContainer}>
            <Link
              className={Styles.linky}
              to={"/home"}
              onClick={() => {
                hamClick();
                handelCreateLink();
              }}
            >
              <p>Create Link</p>
            </Link>
            <Link
              className={Styles.linky}
              to={"/home/lm"}
              onClick={() => {
                hamClick();
                handelManageLink();
              }}
            >
              <p>Manage Links</p>
            </Link>
            {admin && (
              <Link
                className={Styles.linky}
                to={"/home/fum"}
                onClick={() => {
                  hamClick();
                  handelManageUsers();
                }}
              >
                <p>Manage Users</p>
              </Link>
            )}
            <Link
              className={Styles.linky}
              to={"/home"}
              onClick={() => hamClick()}
            >
              <p>Dashboard</p>
            </Link>
          </div>
          <div className={Styles.logoutContainer}>
            <div className={Styles.logoutBtn} onClick={() => handleLogout()}>
              Logout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
