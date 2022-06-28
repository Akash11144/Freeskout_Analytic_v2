import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Styles from "./index.module.css";
import { ipFetch, postR } from "../../utlis";
import pt from "platform";

const userData = async (location_pathname) => {
  let dr = new Date();
  let ud = {
    browser_name: pt.name,
    browser_version: pt.version,
    id: dr.getTime(),
    ip: await ipFetch(),
    product_manufacturer: pt.manufacturer ? pt.manufacturer : "not available",
    product_name: pt.product ? pt.product : "desktop",
    os_architecture: pt.os.architecture,
    os_name: pt.os.family,
    os_version: pt.os.version,
    time: dr.toDateString() + " " + dr.toTimeString(),
    route: location_pathname,
  };

  let localLink = "http://localhost:1111";
  let route = "/user/setUser";
  let r = await postR(localLink, route, ud);
  console.log("post result: ", r);
};

// --------------------------------------------------------------------
let i = false;

function Redir(props) {
  let uloc = useLocation();
  console.log("location", uloc);
  useEffect(() => {
    if (!i) {
      let data = Object.values(props);
      let updatedwebsite = "";
      for (let i = 0; i < data.length; i++) {
        if (data[i].path.split("/")[1] === uloc.pathname.split("/")[2]) {
          updatedwebsite = data[i].website;
          console.log("if", updatedwebsite);
          break;
        }
      }
      const dataSetter = async () => {
        await userData(uloc.pathname);
        // window.open(updatedwebsite, "_self");
      };
      dataSetter();
    }
    return () => {
      i = true;
    };
  }, []);

  return (
    <div className={Styles.mainCont}>
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
      <div className={Styles.redirHold}>
        <h2>Redirecting...</h2>
      </div>
    </div>
  );
}

export default Redir;
