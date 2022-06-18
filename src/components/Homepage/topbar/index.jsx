import Styles from "./index.module.css";
import Calendar from "../../extras/calendar/date-file";
import Time from "../../extras/calendar/time-file";
import { useEffect } from "react";

const hamClick = () => {
  let topLine = document.getElementById("topLine");
  let middleLine = document.getElementById("bottomLine");
  let BottomLine = document.getElementById("endLine");
  let sidebar = document.getElementById("sideMenu");
  var a = topLine.classList;
  if (a.length == 1) {
    topLine.classList.add("temp");
    topLine.style.transform="translateY(13px) rotate(45deg)"
    middleLine.style.opacity='0'
    middleLine.style.transform='translateX(16px)'
    BottomLine.style.transform='translateY(-11px) rotate(-45deg)'
    sidebar.style.opacity='1';
    sidebar.style.top='10vh'
  } else {
    topLine.classList.remove("temp");
    topLine.style.transform="unset"
    middleLine.style.opacity='1'
    middleLine.style.transform='unset'
    BottomLine.style.transform='unset'
    sidebar.style.opacity='0';
    sidebar.style.top='-80vh'
  }
  alert(a)
};

const topbar = (props) => {
  return (
    <div className={Styles.allCont}>
      {console.log("topbar props", props)}
      <div className={Styles.mainCont}>
        <div className={Styles.leftMain}>
          <div
            className={Styles.hamCont}
            id="hamburger"
            onClick={() => {
              hamClick();
            }}
          >
            <span className={`${Styles.line}`} id="topLine"></span>
            <span className={`${Styles.line}`} id="bottomLine"></span>
            <span className={`${Styles.line}`} id="endLine"></span>
          </div>
        </div>
        <div className={Styles.pageName}>
          Create link <span>{props.a}</span>
        </div>
        <div className={Styles.dateTimeCont}>
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
        </div>
      </div>
      <div className={`${Styles.sideBarCont}`} id="sideMenu">
        <div className={Styles.sideBar}>
          <div className={Styles.stars}></div>
          <div className={Styles.stars2}></div>
          <div className={Styles.stars3}></div>
          <div className={Styles.userNameCont}>
            <p>
              Hi <span>Skouter</span>
              <span>,</span>
            </p>
          </div>
          <div className={Styles.optionsContainer}>
            <p>Create Link</p>
            <p>Manage Links</p>
            <p>Manage Users</p>
            <p>Dashboard</p>
          </div>
          <div className={Styles.logoutContainer}>
            <div className={Styles.logoutBtn}>Logout</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default topbar;
