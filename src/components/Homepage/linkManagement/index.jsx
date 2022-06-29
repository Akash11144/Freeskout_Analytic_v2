import { useState, useEffect } from "react";
import Styles from "../linkManagement/index.module.css";
import { AiFillCaretDown } from "react-icons/ai";
import { useRef } from "react";
const getYear = () => {
  var dt = new Date();
  return dt.getFullYear();
};
const users = [{ user: "A" }, { user: "B" }, { user: "C" }];
const LinkManement = (props) => {
  const [isActive, setisActive] = useState(false);
  const [isUserActive, setisUserActive] = useState(false);
  const [Data, setData] = useState([]);
  const handleStatusSelector = () => {
    setisActive(!isActive);
  };
  const handleUserSelector = () => {
    setisUserActive(!isUserActive);
  };
  const selected_status = useRef(null);
  const all_links = useRef(null);
  const active_links = useRef(null);
  const deleted_links = useRef(null);
  const allClick = () => {
    let allLiIt = all_links.current.innerText;
    selected_status.current.innerText = allLiIt;
  };
  const activeClick = () => {
    let alIt = active_links.current.innerText;
    selected_status.current.innerText = alIt;
  };
  const deletedClick = () => {
    let dlIt = deleted_links.current.innerText;
    selected_status.current.innerText = dlIt;
  };
  const selected_user = useRef();
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
            <p ref={selected_status}>All Links</p>
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
                  allClick();
                }}
              >
                <p ref={all_links}>All Links</p>
              </div>
              <div
                className={Styles.otherOptions}
                onClick={() => {
                  handleStatusSelector();
                  activeClick();
                }}
              >
                <p ref={active_links}>Active Links</p>
              </div>
              <div
                className={Styles.otherOptions}
                onClick={() => {
                  handleStatusSelector();
                  deletedClick();
                }}
              >
                <p ref={deleted_links}>Deleted Links</p>
              </div>
            </div>
          </div>
          <div className={Styles.selectUser}>
            <div className={Styles.selectedUserOption}>
              <p ref={selected_user}>All Users</p>
              <div
                className={Styles.dropholder}
                onClick={() => {
                  // handleStatusSelector();
                  handleUserSelector();
                }}
              >
                <AiFillCaretDown
                  className={`${Styles.downIcon}
              ${isUserActive ? Styles.rotatedIcon : Styles.downIcon}`}
                />
              </div>
              <div
                className={`${Styles.otherOptionsContShow}
            ${
              isUserActive
                ? Styles.otherOptionsContShow
                : Styles.otherOptionsContHide
            }`}
              >
                {/* <Users searchV={(d) => handleUserSelector()}></Users> */}
                {users.length &&
                  users.map((item, index) => {
                    return (
                      <div
                        className={Styles.otherOptions}
                        onClick={() => {
                          handleUserSelector();
                        }}
                      >
                        <p>{item.user}</p>
                      </div>
                    );
                  })}
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
