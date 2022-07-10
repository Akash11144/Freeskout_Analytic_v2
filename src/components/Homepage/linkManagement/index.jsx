import { useState, useEffect, useRef } from "react";
import Styles from "../linkManagement/index.module.css";
import { AiFillCaretDown } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { FaFilter } from "react-icons/fa";
import { dateTimegen, fetchAuth, L_LINK } from "../../utlis";
import InformationPopUp from "../../extras//pop-ups/information";
import SmallLoading from "../../extras/loading-animation/small-loading";

let errorObj = {
  desc: "",
  navigation: true,
  navigationRoute: "",
};

const LinkManement = (props) => {
  const [isActive, setisActive] = useState(false);
  const [isUserActive, setisUserActive] = useState(false);
  const [routeData, setrouteData] = useState([]);
  const [userData, setuserData] = useState([]);
  const [isSelectorsActive, setisSelectorsActive] = useState(false);
  const [pageError, setpageError] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [viewDetails, setviewDetails] = useState(false);
  const [linkData, setlinkData] = useState();

  const selected_status = useRef(null);
  const all_links = useRef(null);
  const active_links = useRef(null);
  const deleted_links = useRef(null);
  const linkContRef = useRef(null);

  let i = false;
  useEffect(() => {
    setLoading(true);
    if (!i) {
      const DataFetch = async () => {
        let r = await fetchAuth(`${L_LINK}/route/allRoutes`);
        let r1 = "";
        console.log("link management route data", r);
        if (r.issue) {
          r.storageClear && localStorage.removeItem("Freeskout-session");
          errorObj.desc = r.issueDetail;
          errorObj.navigationRoute = "/";
          setpageError(true);
        } else {
          r1 = await fetchAuth(`${L_LINK}/validate/allFUser`);
          console.log("link management user data", r1);
          if (r1.issue) {
            if (r.storageClear) {
              r.storageClear && localStorage.removeItem("Freeskout-session");
              errorObj.desc = r.issueDetail;
              errorObj.navigationRoute = "/";
            } else {
              console.log("inside else");
              errorObj.desc = r.issueDetail;
              errorObj.navigation = false;
            }
          } else {
            setrouteData(r);
            setuserData(r1);
          }
        }
      };
      DataFetch();
    }
    setLoading(false);
    return () => {
      i = true;
    };
  }, []);

  const handleStatusSelector = () => {
    setisActive(!isActive);
  };

  const handelMobileSelectors = () => {
    setisSelectorsActive(!isSelectorsActive);
  };

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

  const handleSortedData = async () => {
    setLoading(true);
    console.log(selected_user.current.innerText);
    let r = await fetchAuth(
      `${L_LINK}/route/userRoute/${selected_user.current.innerText}`
    );
    if (r.issue) {
      if (r.storageClear) {
        r.storageClear && localStorage.removeItem("Freeskout-session");
        errorObj.desc = r.issueDetail;
        errorObj.navigationRoute = "/";
      } else {
        console.log("inside else");
        errorObj.desc = r.issueDetail;
        errorObj.navigation = false;
      }
      setLoading(false);
      setpageError(true);
    } else {
      setrouteData(r);
      console.log(r);
      setLoading(false);
    }
  };

  const handleview = () => {
    setviewDetails(true);
  };
  const handleCloseDetails = () => {
    setviewDetails(false);
  };
  const handleDelete = async (value) => {
    console.log("deleting route: ", value);
    try {
      let dt = new Date();
      let r = await fetch(`${L_LINK}/route/deleteRoute`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          path: value,
          deleted_time: dt.toDateString() + " " + dt.toTimeString(),
        }),
      });
      let r1 = await r.json();
      console.log(r1);
    } catch (error) {
      console.log("error while deleting route in catch", error);
    }
  };

  return (
    <>
      {Loading && <SmallLoading />}
      {pageError && <InformationPopUp {...errorObj} />}
      <div className={Styles.mainCont}>
        {/* {generateLoading && <SmallLoading />} */}
        <div className={Styles.secondaryDiv}>
          <div className={Styles.filtersOnMobile}>
            <div
              className={Styles.filterIconHolder}
              onClick={() => {
                handelMobileSelectors();
              }}
            >
              <FaFilter></FaFilter>
            </div>
            <div
              className={`${Styles.selectors} ${
                isSelectorsActive ? Styles.selectorsShow : Styles.selectors
              }`}
            >
              <div className={Styles.selectedOption}>
                <div className={Styles.initialDiv}>
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
              <div className={Styles.selectedUserOption}>
                <div className={Styles.initialDiv}>
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
                </div>
                <div
                  className={`${Styles.otherOptionsContShow}
            ${
              isUserActive
                ? Styles.otherOptionsContShow
                : Styles.otherOptionsContHide
            }`}
                >
                  <div
                    className={Styles.otherOptions}
                    onClick={() => {
                      handleUserSelector();
                      handelSelctUser("All Users");
                    }}
                  >
                    <p>All Users</p>
                  </div>
                  {userData ? (
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
                    })
                  ) : (
                    <h1>Loading...</h1>
                  )}
                </div>
              </div>

              <div className={Styles.selectDate}>
                <p>From: </p>
                <input type="date" required="required"></input>
              </div>
              <div className={Styles.selectDate}>
                <p>To:</p>
                <input type="date" required="required"></input>
              </div>
              <div
                onClick={() => {
                  {
                    handleSortedData();
                    handelMobileSelectors();
                  }
                }}
                className={Styles.showBtn}
              >
                <p>Show Results</p>
              </div>
            </div>
          </div>
          <div className={Styles.linkList}>
            <div className={Styles.linksContainer}>
              {routeData.length &&
                routeData.map((item, index) => (
                  <LinkLayout
                    index={index}
                    {...item}
                    linkCallBack={(val) => handleDelete(val)}
                    viewLInkDetailsTRigger={(mylinkData) => {
                      handleview();
                      setlinkData(mylinkData);
                    }}
                  />
                ))}
            </div>
            {viewDetails && (
              <DetailLayout
                closeInkDetailsTRigger={() => handleCloseDetails()}
                {...linkData}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LinkManement;

// ------------------------------------------------------------------------------------------------

const LinkLayout = (props) => {
  const {
    name,
    email,
    for_name,
    for_email,
    description,
    path,
    website,
    time,
    index,
    linkCallBack,
  } = props;
  return (
    <div key={path + index} className={Styles.cont}>
      <p>www.freeskout.com/redirect{path}</p>
      <div className={Styles.userActionBtnsCont}>
        <div
          className={Styles.viewIconCont}
          onClick={() => {
            props.viewLInkDetailsTRigger(props);
          }}
        >
          <FaRegEye className={Styles.viewIcon} />
          <p className={`${Styles.HoverNotification} ${Styles.viewHover}`}>
            View
          </p>
        </div>
        <div className={`${Styles.delIconCont}`}>
          <AiOutlineDelete
            onClick={() => linkCallBack(path)}
            className={Styles.delIcon}
          />
          <p className={`${Styles.HoverNotification} ${Styles.delHover}`}>
            Delete
          </p>
        </div>
      </div>
    </div>
  );
};
const DetailLayout = (props) => {
  let dateObj = dateTimegen(props.time);
  let delDateObj;
  let linkSts = props.deleted;
  if (linkSts) {
    delDateObj = dateTimegen(props.deleted_time);
  }
  return (
    <>
      {console.log(props)}
      <div className={Styles.detHolder}>
        <div className={Styles.linkDeatilsCont}>
          <p className={Styles.link}>www.freeskout.com/redirect{props.path}</p>
          <div className={Styles.moreDetails}>
            <p className={Styles.createdBy}>
              Created by:
              <span className={Styles.createdByName}>
                {props.name} (<span>{props.email}</span>)
              </span>
            </p>
            <p className={Styles.createdBy}>
              Created at:
              <span className={Styles.createdDateCont}>
                <span className={Styles.createdDate}>{dateObj.date} </span>
                {console.log(dateObj)}
                at <span className={Styles.createdTime}>{dateObj.time}</span>
              </span>
            </p>
            <p className={Styles.createdBy}>
              Created for:
              <span className={Styles.createdByName}>
                {props.for_name} (<span>{props.for_email}</span>)
              </span>
            </p>
            <p className={Styles.createdBy}>
              Platforms :
              <span className={Styles.createdByName}>{props.platform}</span>
            </p>
            <p className={Styles.createdBy}>
              Status:
              <span className={Styles.stsCont}>
                {!linkSts ? (
                  <span>
                    <span className={Styles.active}>Active </span>
                    since
                    <span className={Styles.createdDate}> {dateObj.date}</span>
                    <span className={Styles.createdTime}> {dateObj.time}</span>
                  </span>
                ) : (
                  <span>
                    <span className={Styles.deleted}>Deleted </span>
                    since{" "}
                    <span className={Styles.createdDate}>
                      {delDateObj.date}
                    </span>
                    <span className={Styles.createdTime}>
                      {delDateObj.time}
                    </span>
                  </span>
                )}
              </span>
            </p>
            <p className={Styles.createdBy}>
              Duration: <span className={Styles.hits}> 35 Days</span>
            </p>
            <p className={Styles.createdBy}>
              Details:{" "}
              <span className={Styles.desc}>
                lorem ipsum dollar lorem ipsum dollar lorem ipsum dollar lorem
                ipsum dollar lorem ipsum dollar lorem ipsum dollar
              </span>
            </p>
            <p className={Styles.createdBy}>
              Hits: <span className={Styles.hits}> 350</span>
            </p>
          </div>
          <div
            className={Styles.okayBtn}
            onClick={() => props.closeInkDetailsTRigger()}
          >
            Close
          </div>
        </div>
      </div>
    </>
  );
};
