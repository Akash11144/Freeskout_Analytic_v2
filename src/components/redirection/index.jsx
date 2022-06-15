// import reactga4 from "react-ga4";
import pt from "platform";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Styles from "./index.module.css";
import {
  timeGenerator as TG,
  dateObserver as DO,
  dayObserver,
  getAddress as GA,
  ipFetch as IPF,
  postR,
} from "../utlis";

let ud = {
  browser_name: "",
  browser_version: "",
  date: 0,
  day: 0,
  hours: 0,
  id: "",
  ip: "",
  // lat: "not awailable",
  // long: "not awailable",
  minutes: 0,
  month: 0,
  product_manufacturer: "",
  product_name: "",
  os_architecture: "",
  os_name: "",
  os_version: "",
  time: "",
  route_name: "",
  year: 0,
};

const userData = async (location_pathname) => {
  // try {
  //   await reactga4.initialize("G-BMQ18907R");
  // } catch (error) {
  //   console.log("error in ga", error);
  // }

  //__________________________________________

  let ipf = await IPF();
  let deo = DO();
  // let gl = await GA();

  // ud.lat = gl.latitude;
  // ud.long = gl.longitude;
  ud.ip = ipf;
  ud.id =
    " " +
    deo.Full_Year +
    deo.Month +
    deo.Datee +
    deo.Hours +
    deo.Minutes +
    deo.Seconds +
    deo.Mili_Seconds;
  ud.browser_name = pt.name;
  ud.browser_version = pt.version;
  ud.product_name = pt.product ? pt.product : "desktop";
  ud.product_manufacturer = pt.manufacturer ? pt.manufacturer : "not available";
  ud.os_name = pt.os.family;
  ud.os_version = pt.os.version;
  ud.os_architecture = pt.os.architecture;
  ud.time = TG();
  ud.year = deo.Full_Year;
  ud.month = +deo.Month;
  ud.date = +deo.Datee;
  ud.day = dayObserver((deo.Datee % 7) + 1);
  ud.hours = +deo.Hours;
  ud.minutes = +deo.Minutes;
  ud.route_name = location_pathname;
  console.log(ud);
  // _________________________________________________________
  let localLink = "http://localhost:8000";
  let mainLink = "https://freeskout-analytic-v2-backend.herokuapp.com";
  let route = "/user/setUser";
  await postR(mainLink, route, ud);

  // ________________________________________________________
};

// --------------------------------------------------------------------

function Redir() {
  let uloc = useLocation();
  useEffect(async () => {
    console.log("inside use effect");
    console.log("checking location object", uloc);
    await userData(uloc.pathname);
    // window.open("https://freeskout.com/", "_self");
  }, []);

  return (
    // <div className={Styles.mainCont}>
    //   <div className={Styles.stars}></div>
    //   <div className={Styles.stars2}></div>
    //   <div className={Styles.stars3}></div>
    //   <div className={Styles.LoadConatinerDiv}>
    //     <div className={Styles.text}>
    //       <span className={Styles.fCont}>F</span>
    //       <span className={Styles.rCont}>r</span>
    //       <span className={Styles.eCont}>e</span>
    //       <span className={Styles.seCont}>e</span>
    //       <span className={Styles.sCont}>s</span>
    //       <span className={Styles.kCont}>k</span>
    //       <span className={Styles.oCont}>o</span>
    //       <span className={Styles.uCont}>u</span>
    //       <span className={Styles.tCont}>t</span>
    //     </div>
    //   </div>
    // </div>
    <div className={Styles.section_loading}>
      <ul className={Styles.list_bars}>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
}

export default Redir;
