import { useLocation } from "react-router-dom";
import { useState } from "react";
import Styles from "./index.module.css";
import { useEffect } from "react";
const PageNotFound = () => {
  const [inApperror, setinApperror] = useState(false);
  const [newUrl, setnewUrl] = useState("");
  let loc = useLocation();
  useEffect(() => {
    let currentLoc = loc.pathname.split("/");
    console.log(currentLoc[1]);
    if (currentLoc[1] === "redirect") {
      setnewUrl("http://localhost:3000/redirect/freeskout");
    } else if (currentLoc[1] === "home") {
      setinApperror(true);
      setnewUrl("http://localhost:3000/home/");
    } else {
      setnewUrl("/");
    }
  }, []);
  return (
    <div
      className={`${Styles.mainDiv} ${
        inApperror ? Styles.mainDivApp : Styles.mainDiv
      }`}
    >
      <div className={Styles.gifCont}>
        <h1 className={Styles.ECholder}>404</h1>
      </div>
      <div className={Styles.msgDiv}>
        <h2 className={Styles.mainMsg}>Look like you're lost</h2>
        <p className={Styles.message}>
          the page you are looking for is not available!
        </p>
        <div
          className={Styles.homeBtn}
          onClick={() => {
            window.open(newUrl, "_self");
          }}
        >
          Take me Home
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
