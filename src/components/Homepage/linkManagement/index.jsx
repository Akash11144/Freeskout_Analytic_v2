import { useState, useEffect } from "react";
import Styles from "../linkManagement/index.module.css";

const getYear = () => {
  var dt = new Date();
  return dt.getFullYear();
};
const LinkManement = () => {
  const [Data, setData] = useState([]);
  let i = false;
  useEffect(() => {
    if (!i) {
      const DataFetch = async () => {
        let r = await fetch("http://localhost:1111/route/allRoutes");
        let r1 = await r.json();
        console.log("link management route data", r1);
      };
      DataFetch();
    }

    return () => {
      i = true;
    };
  }, [Data]);

  return (
    <div className={Styles.mainCont}>
      {/* {generateLoading && <SmallLoading />} */}
      <div className={Styles.secondaryDiv}>
        <div className={Styles.selectors}>
          <div className={Styles.togggleBtnHolder}>
            <div className={Styles.switches_container}>
              <input
                type="radio"
                id="switchActive"
                name="switchBtn"
                value="active"
                checked="checked"
              />
              <input
                type="radio"
                id="switchDeleted"
                name="switchBtn"
                value="deleted"
              />
              <label for="switchMonthly">Monthly</label>
              <label for="switchYearly">Yearly</label>
              <div className={Styles.switch_wrapper}>
                <div className={Styles.switch}>
                  <div>Monthly</div>
                  <div>Yearly</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={Styles.linkList}></div>
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

export default LinkManement;
