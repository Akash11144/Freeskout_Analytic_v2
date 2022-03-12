import reactga4 from "react-ga4";
import pt from "platform";
import { useEffect } from 'react'
import Styles from './index.module.css'

// ----------------------------------------------------

let temp = 1;

let ud = {
  browser_name: "",
  browser_version: "",
  id: "",
  ip: "",
  product_manufacturer: "",
  product_name: "",
  os_architecture: "",
  os_name: "",
  os_version: "",
  time: "",
};

const reDirection = async () => {
  await userData();
  // window.open("https://freeskout.com/", "_self")
};

const userData = async () => {
  try {
    await reactga4.initialize("G-BMQ18907R");
  } catch (error) {
    console.log("error in ga", error);
  }

  // _____________________________________________________________

  const ipFetch = async () => {
    try {
      let r = await fetch("https://www.cloudflare.com/cdn-cgi/trace").then(
        (res) => res.text()
      );
      ud.ip = r.split("ts")[0].split("ip=")[1].split("\n")[0];
    } catch (error) {
      console.log(error);
      ud.ip = "unable to fetch ip due to some error from outside";
    }
  };
  await ipFetch();

  // ___________________________________________________________

  let d = new Date();

  let fy = d.getFullYear();
  let mnth = d.getMonth() + 1;
  let dt = d.getDate();
  let hrs = d.getHours();
  let mins = d.getMinutes();
  let secs = d.getSeconds();
  let ms = d.getMilliseconds();

  const dayObserver = (a) => {
    let t = "";
    switch (a) {
      case 1:
        t = "Mon";
        break;
      case 2:
        t = "Tue";
        break;
      case 3:
        t = "Wed";
        break;
      case 4:
        t = "Thu";
        break;
      case 5:
        t = "Fri";
        break;
      case 6:
        t = "Sat";
        break;
      case 7:
        t = "Sun";
        break;
      default:
        t = "Some err";
        break;
    }
    return t;
  };

  const monthObserver = (a) => {
    let t = "";
    switch (a) {
      case 1:
        t = "Jan";
        break;
      case 2:
        t = "Feb";
        break;
      case 3:
        t = "Mar";
        break;
      case 4:
        t = "Apr";
        break;
      case 5:
        t = "May";
        break;
      case 6:
        t = "Jun";
        break;
      case 7:
        t = "Jul";
        break;
      case 8:
        t = "Aug";
        break;
      case 9:
        t = "Sep";
        break;
      case 10:
        t = "Oct";
        break;
      case 11:
        t = "Nov";
        break;
      case 12:
        t = "dec";
        break;
      default:
        t = "Some err";
        break;
    }
    return t;
  };

  const timeGenerator = () => {
    return (
      "" +
      dayObserver((dt % 7) + 1) +
      ", " +
      dt +
      " " +
      monthObserver(mnth) +
      " " +
      fy +
      " " +
      hrs +
      ":" +
      mins +
      ":" +
      secs +
      ":" +
      ms
    );
  };

  ud.id = " " + fy + mnth + dt + hrs + mins + secs + ms;
  ud.browser_name = pt.name;
  ud.browser_version = pt.version;
  ud.product_name = pt.product ? pt.product : "desktop";
  ud.product_manufacturer = pt.manufacturer ? pt.manufacturer : "not available";
  ud.os_name = pt.os.family;
  ud.os_version = pt.os.version;
  ud.os_architecture = pt.os.architecture;
  ud.time = timeGenerator();


  // _________________________________________________________

  // await fetch("http://localhost:1369/user/getUser", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(ud),
  // }).then((response) => console.log("yeah done", response));

  // ________________________________________________________
};

// --------------------------------------------------------------------



function Redir() {

  useEffect(() => {
    reDirection();
  }, [])

  return (
    <div className={Styles.mainCont}>
      <div className={Styles.stars}></div>
      <div className={Styles.stars2}></div>
      <div className={Styles.stars3}></div>
      <div className={Styles.LoadConatinerDiv}>
        <div className={Styles.text}>
          <span className={Styles.fCont} >F</span>
          <span className={Styles.rCont} >r</span>
          <span className={Styles.eCont} >e</span>
          <span className={Styles.seCont} >e</span>
          <span className={Styles.sCont} >s</span>
          <span className={Styles.kCont} >k</span>
          <span className={Styles.oCont} >o</span>
          <span className={Styles.uCont} >u</span>
          <span className={Styles.tCont} >t</span>
        </div>
        {console.log("hello", ud)}
      </div>
    </div>
  );
}

export default Redir;
