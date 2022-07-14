import { useState, useEffect, useRef } from "react";
import Styles from "../linkManagement/index.module.css";
import { AiFillCaretDown } from "react-icons/ai";
import { BsFillEyeFill } from "react-icons/bs";
import { AiTwotoneDelete } from "react-icons/ai";
import { AiFillCloseCircle } from "react-icons/ai";
import { FaFilter } from "react-icons/fa";
import { dateTimegen, durationGenerator, fetchAuth, L_LINK } from "../../utlis";
import InformationPopUp from "../../extras//pop-ups/information";
import SmallLoading from "../../extras/loading-animation/small-loading";
import SendMail from "../../extras/loading-animation/sendMailAnimation";

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
  const [showActiveLink, setshowActiveLink] = useState(true);
  const [showDeletedlinks, setshowDeletedlinks] = useState(true);
  const [closeFilterIcon, setcloseFilterIcon] = useState(false);
  const selected_status = useRef(null);
  const all_links = useRef(null);
  const active_links = useRef(null);
  const deleted_links = useRef(null);
  const linkListCont = useRef(null);
  const linkContRef = useRef(null);

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
        setpageError(true);
      } else {
        setrouteData(r.reverse());
        setuserData(r1);
      }
    }
  };

  let i = false;
  useEffect(() => {
    setLoading(true);
    if (!i) DataFetch();
    setLoading(false);
    return () => (i = true);
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
    setshowActiveLink(true);
    setshowDeletedlinks(true);
  };
  const activeClick = () => {
    let alIt = active_links.current.innerText;
    selected_status.current.innerText = alIt;
    setshowDeletedlinks(false);
    setshowActiveLink(true);
  };
  const deletedClick = () => {
    let dlIt = deleted_links.current.innerText;
    selected_status.current.innerText = dlIt;
    setshowActiveLink(false);
    setshowDeletedlinks(true);
  };
  const selected_user = useRef();
  const handelSelctUser = (item) => {
    selected_user.current.innerText = item;
  };

  const handleSortedData = async () => {
    setLoading(true);
    console.log(selected_user.current.innerText);
    if (selected_user.current.innerText === "All User") {
      let r = await fetchAuth(`${L_LINK}/route/allRoutes`);
      setrouteData(r.reverse());
    } else {
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
    }
  };

  const handleview = () => {
    setviewDetails(true);
    // linkListCont.current.style.overflowY = "hidden";
  };
  const handleCloseDetails = () => {
    setviewDetails(false);
    // linkListCont.current.style.overflowY = "scroll";
  };

  const handleDelete = async ({ path, email }) => {
    console.log("deleting route: ", path, email);
    try {
      let dt = new Date();
      let r = await fetch(`${L_LINK}/route/deleteRoute`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          path: path,
          deleted_time: dt.toDateString() + " " + dt.toTimeString(),
          deleted_by: email,
        }),
      });
      let r1 = await r.json();
      console.log("response in deleting route: ", r1);
      if (r1.issue) {
        if (r1.storageClear) {
          r1.storageClear && localStorage.removeItem("Freeskout-session");
          errorObj.desc = r1.issueDetail;
          errorObj.navigationRoute = "/";
        } else {
          errorObj.desc = r.issueDetail;
          errorObj.navigation = false;
        }
        setpageError(true);
      } else {
        DataFetch();
      }
    } catch (error) {
      errorObj.desc = "Some error while deleting";
      errorObj.navigation = false;
      setpageError(true);
      console.log("error while deleting route in catch", error);
    }
  };

  return (
    <>
      {Loading && <SmallLoading />}
      {pageError && (
        <InformationPopUp
          keyp={"lmcb"}
          linkMgmtPopUp={() => setpageError(false)}
          {...errorObj}
        />
      )}
      <div className={Styles.mainCont}>
        <div className={Styles.secondaryDiv}>
          <div className={Styles.filtersOnMobile}>
            <div
              className={Styles.filterIconHolder}
              onClick={() => {
                handelMobileSelectors();
                setcloseFilterIcon(!closeFilterIcon);
              }}
            >
              {closeFilterIcon ? (
                <AiFillCloseCircle
                  className={Styles.closeFilterIcon}
                ></AiFillCloseCircle>
              ) : (
                <FaFilter></FaFilter>
              )}
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
          <div className={Styles.linkList} ref={linkListCont}>
            <div className={Styles.linkListSecCont}>
              {showActiveLink && (
                <div className={Styles.linksContainer}>
                  {console.log("testingData", routeData)}
                  {routeData.length &&
                    routeData.map((item, index) => {
                      {
                        return (
                          !item.deleted && (
                            <LinkLayout
                              index={index}
                              {...item}
                              linkCallBack={(val) => handleDelete(val)}
                              viewLInkDetailsTRigger={(mylinkData) => {
                                handleview();
                                setlinkData(mylinkData);
                              }}
                            />
                          )
                        );
                      }
                    })}
                </div>
              )}
              {showDeletedlinks && (
                <div className={Styles.linksContainerA}>
                  {routeData.length &&
                    routeData.map((item, index) => {
                      {
                        return (
                          item.deleted && (
                            <LinkLayout
                              index={index}
                              {...item}
                              linkCallBack={(val) => handleDelete(val)}
                              viewLInkDetailsTRigger={(mylinkData) => {
                                handleview();
                                setlinkData(mylinkData);
                              }}
                            />
                          )
                        );
                      }
                    })}
                </div>
              )}
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
  const { email, path, index, linkCallBack } = props;
  const [status, setstatus] = useState();

  useEffect(() => setstatus(props.deleted), [props]);

  return (
    <>
      <div
        key={index}
        className={`${Styles.delCont} ${
          status ? Styles.delCont : Styles.activeCont
        }`}
      >
        <div className={Styles.linkCont}>
          <p>www.freeskout.com/redirect{path}</p>
          {/* <p className={Styles.linkHitsitsCont}>350</p> */}
        </div>
        <div className={Styles.userActionBtnsCont}>
          <div
            className={Styles.viewIconCont}
            onClick={() => {
              props.viewLInkDetailsTRigger(props);
            }}
          >
            <BsFillEyeFill className={Styles.viewIcon} />
            <p className={`${Styles.HoverNotification} ${Styles.viewHover}`}>
              View
            </p>
          </div>
          {!status && (
            <div className={`${Styles.delIconCont}`}>
              <AiTwotoneDelete
                onClick={() => linkCallBack({ path, email })}
                className={Styles.delIcon}
              />
              <p className={`${Styles.HoverNotification} ${Styles.delHover}`}>
                Delete
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// --------------------------------------------------------------------------------------------

const DetailLayout = (props) => {
  const [hitLoading, sethitLoading] = useState(false);
  let hitRef = useRef(null);
  let dateObj = dateTimegen(props.time);
  let durationChecker = durationGenerator(
    new Date(dateObj.durationDate),
    new Date()
  );
  let delDateObj;
  let delDurationChecker;
  let linkSts = props.deleted;
  if (linkSts) {
    delDateObj = dateTimegen(props.deleted_time);
    delDurationChecker = durationGenerator(
      new Date(dateObj.durationDate),
      new Date(delDateObj.durationDate)
    );
  }

  const hitFetch = async () => {
    sethitLoading(true);
    let r = await fetchAuth(
      `http://localhost:1111/user/getAllFromSlug/${props.path.split("/")[1]}`
    );
    sethitLoading(false);
    hitRef.current.innerText = r;
  };

  let i = false;
  useEffect(() => {
    !i && hitFetch();
    return () => (i = true);
  }, []);

  return (
    <>
      <div className={Styles.detHolder}>
        <div className={Styles.linkDeatilsCont}>
          <p className={Styles.link}>www.freeskout.com/redirect{props.path}</p>
          <div className={Styles.moreDetails}>
            <div className={Styles.createdBy}>
              <p>Created by:</p>
              <p>
                {props.name} (<span>{props.email}</span>)
              </p>
            </div>
            <div className={Styles.createdBy}>
              <p> Created at:</p>
              <p className={Styles.createdDateCont}>
                <span className={Styles.createdDate}>{dateObj.date} </span>
                at <span className={Styles.createdTime}>{dateObj.time}</span>
              </p>
            </div>
            <div className={Styles.createdBy}>
              <p>Created for:</p>
              <p>
                {props.for_name} (<span>{props.for_email}</span>)
              </p>
            </div>
            <div className={Styles.createdBy}>
              <p>Platforms :</p>
              <p>{props.platform}</p>
            </div>
            <div className={Styles.createdBy}>
              <p> Status:</p>
              <p>
                {!linkSts ? (
                  <span className={Styles.active}>Active</span>
                ) : (
                  <span>
                    <span className={Styles.deleted}>Deleted</span>
                    <span>
                      ({delDateObj.date} {delDateObj.time})
                    </span>
                  </span>
                )}
              </p>
            </div>
            <div className={Styles.createdBy}>
              <p>Duration:</p>
              <p className={Styles.hits}>
                {!linkSts ? durationChecker : delDurationChecker}
              </p>
            </div>
            <div className={Styles.createdBy}>
              <p> Description:</p>
              <p className={Styles.desc}>
                lorem ipsum dollar lorem ipsum dollar lorem ipsum dollar lorem
                ipsum dollar lorem ipsum dollar lorem ipsum dollar
              </p>
            </div>
            <div className={Styles.createdBy}>
              <p>Hits</p>

              <p ref={hitRef} className={Styles.hits}>
                {hitLoading && <SendMail></SendMail>}
              </p>
            </div>
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
