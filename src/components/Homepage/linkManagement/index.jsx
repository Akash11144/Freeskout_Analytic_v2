import { useState, useEffect } from "react";
import Styles from "../linkManagement/index.module.css";
import { AiFillCaretDown } from "react-icons/ai";
const getYear = () => {
  var dt = new Date();
  return dt.getFullYear();
};
const LinkManement = () => {
  const [isActive, setisActive] = useState(false);
  const [Data, setData] = useState([]);
  const handleStatusSelector = () => {
    setisActive(!isActive);
  };
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
            <p>All Links</p>
            <div
              className={Styles.dropholder}
              onClick={() => {
                handleStatusSelector();
              }}
            >
              <AiFillCaretDown
                className={`${Styles.downIcon}
              ${isActive ? Styles.rotatedIcon : Styles.downIcon}`}
              />
            </div>
            <div
              className={`${Styles.otherOptionsContShow}
            ${
              isActive
                ? Styles.otherOptionsContShow
                : Styles.otherOptionsContHide
            }`}
            >
              <div
                className={Styles.otherOptions}
                onClick={() => {
                  handleStatusSelector();
                }}
              >
                <p>All Links</p>
              </div>
              <div
                className={Styles.otherOptions}
                onClick={() => {
                  handleStatusSelector();
                }}
              >
                <p>Active Links</p>
              </div>
              <div
                className={Styles.otherOptions}
                onClick={() => {
                  handleStatusSelector();
                }}
              >
                <p>Deleted Links</p>
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
