import Styles from "./index.module.css";
import { Link } from "react-router-dom";
const PageNotFound = () => {
  return (
    <div className={Styles.mainDiv}>
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
            window.open("http://localhost:3000/redirect/freeskout", "_self");
          }}
        >
          Take me Home
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
