import { useState, useEffect } from "react";
import Styles from "../linkManagement/index.module.css";
import { AiFillCaretDown } from "react-icons/ai";
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
          <div className={Styles.selectedOption}>
            <p>Deleted</p>
            <div className={Styles.dropholder}>
              <AiFillCaretDown className={Styles.downIcon} />
            </div>
            <div className={Styles.otherOptionsCont}>
              <div className={Styles.otherOptions}>
                <p>Active Liks</p>
              </div>
              <div className={Styles.otherOptions}>
                <p>Deleted Liks</p>
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
