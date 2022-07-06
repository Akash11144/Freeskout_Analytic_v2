import { useState, useEffect } from "react";
import Styles from "../linkManagement/index.module.css";
import { AiFillCaretDown } from "react-icons/ai";
import { useRef } from "react";
import { FaRegEye } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { TbMinusVertical } from "react-icons/tb";
import { fetchAuth, fetchR, L_LINK } from "../../utlis";

const getYear = () => {
  var dt = new Date();
  return dt.getFullYear();
};

const LinkManement = (props) => {
  const [isActive, setisActive] = useState(false);
  const [isUserActive, setisUserActive] = useState(false);
  const [routeData, setrouteData] = useState([]);
  const [userData, setuserData] = useState([]);
  const handleStatusSelector = () => {
    setisActive(!isActive);
  };

  const selected_status = useRef(null);
  const all_links = useRef(null);
  const active_links = useRef(null);
  const deleted_links = useRef(null);

  const handleUserSelector = () => {
    setisUserActive(!isUserActive);
  };

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
  const handelSelctUser = (item) => {
    selected_user.current.innerText = item;
  };
  let i = false;
  useEffect(() => {
    if (!i) {
      const DataFetch = async () => {
        console.time();
        let r = await fetchR(`${L_LINK}/route/allRoutes`);
        console.log("link management route data", r);
        let r1 = await fetchAuth(`${L_LINK}/validate/allFUser`);
        console.log("link management user data", r1);
        console.timeEnd();

        setrouteData(r);
        setuserData(r1);
      };
      DataFetch();
    }

    return () => {
      i = true;
    };
  }, []);

  const handleSortedData = async () => {
    console.log(selected_user.current.innerText);
    let r = await fetchR(
      `${L_LINK}/route/userRoute/${selected_user.current.innerText}`
    );
    setrouteData(r);
    console.log(r);
  };

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
                {userData.length &&
                  userData.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className={Styles.otherOptions}
                        onClick={() => {
                          handleUserSelector();
                          handelSelctUser(item.name);
                        }}
                      >
                        <p>{item.name}</p>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className={Styles.selectDate}>
            <p>From: </p>
            <input type="date" required="required">
              {/* Start Date */}
            </input>
          </div>
          <div className={Styles.selectDate}>
            <p>To:</p>
            <input type="date" required="required">
              {/* End Date */}
            </input>
          </div>
          <div onClick={() => handleSortedData()} className={Styles.showBtn}>
            <p>Show Results</p>
          </div>
        </div>
        <div className={Styles.linkList}>
          <div className={Styles.linksContainer}>
            {routeData.length &&
              routeData.map((item, index) => {
                return (
                  <div key={index} className={Styles.cont}>
                    <p>www.freeskout.com/redirect{item.path}</p>
                    <div className={Styles.userActionBtnsCont}>
                      <div className={Styles.viewIconCont}>
                        <FaRegEye className={Styles.viewIcon} />
                        <p
                          className={`${Styles.HoverNotification} ${Styles.viewHover}`}
                        >
                          View
                        </p>
                      </div>
                      <div className={`${Styles.delIconCont}`}>
                        <AiOutlineDelete className={Styles.delIcon} />
                        <p
                          className={`${Styles.HoverNotification} ${Styles.delHover}`}
                        >
                          Delete
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
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
