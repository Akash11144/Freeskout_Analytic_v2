import { useState, useRef, useEffect, useContext, createContext } from "react";
import { useLocation, useNavigate } from "react-router";
import Styles from "../freeskout-user-management/index.module.css";
import { FaRegEye } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { TbMinusVertical } from "react-icons/tb";
import SmallLoading from "../../extras/loading-animation/small-loading";
import {
  emailChecker,
  fetchAuth,
  L_LINK,
  postAuth,
  dateTimegen,
  durationGenerator,
} from "../../utlis";
import InformationPopUp from "../../extras/pop-ups/information";
import SendMail from "../../extras/loading-animation/send-mail-animation";

let errorObj = {
  desc: "",
  navigation: true,
  navigationRoute: "",
};
export let stateContext = createContext();
export let activeUserContext = createContext();

const FUM = () => {
  const [newUser, setnewUser] = useState(0);
  const [pageError, setpageError] = useState(false);
  const [pageLoading, setpageLoading] = useState(true);
  const loc = useLocation();
  const nav = useNavigate();

  let j = false;
  useEffect(() => {
    !j && !loc.state && nav("/home");
    setpageLoading(false);
    return () => (j = true);
  }, []);

  const addUser = () => setnewUser((v) => v + 1);
  const popUpShow = () => setpageError(true);

  return (
    <>
      <stateContext.Provider value={{ addUser, newUser, popUpShow }}>
        {pageLoading && <SmallLoading />}
        <div className={Styles.mainCont}>
          <div className={Styles.secondaryDiv}>
            {pageError ? (
              <InformationPopUp
                keyp={"fummain"}
                pucb={() => setpageError(false)}
                {...errorObj}
              />
            ) : (
              <>
                {" "}
                <UserForm /> <ActiveUser />{" "}
              </>
            )}
          </div>
        </div>
      </stateContext.Provider>
    </>
  );
};
export default FUM;

// --------------------------------------------------------------------------------------------------

const UserForm = () => {
  let { addUser, popUpShow } = useContext(stateContext);

  let name = useRef(null);
  let email = useRef(null);
  let pass = useRef(null);
  let confirmpass = useRef(null);

  let passPattern = /^([A-Za-z0-9\-\_\@\#\$\%\&\*\\]{3,12})*$/;
  let password_regex = new RegExp(passPattern);

  const handleCreateUser = async () => {
    if (
      name.current.value === "" ||
      email.current.value === "" ||
      pass.current.value === "" ||
      confirmpass.current.value === ""
    ) {
      alert("Fill all field");
    } else if (emailChecker(email.current.value) === false) {
      alert("invalid email");
    } else if (password_regex.test(pass.current.value) === false) {
      alert("invalid password Pattern");
    } else if (pass.current.value != confirmpass.current.value) {
      alert("password dont match");
    } else {
      console.log("ready to login");
    }
    const url = new URL(L_LINK);
    url.pathname = "/validate/addFUser";
    const dt = new Date();
    let r = await postAuth(url, "", {
      name: name.current.value,
      email: email.current.value,
      password: pass.current.value,
      time: dt.toDateString() + " " + dt.toTimeString(),
      deleted: false,
      deleted_time: "",
    });
    console.log(r);
    if (r.issue) {
      if (r.storageClear) {
        r.storageClear && localStorage.removeItem("Freeskout-session");
        errorObj.desc = r.issueDetail;
        errorObj.navigationRoute = "/";
      } else {
        errorObj.desc = r.issueDetail;
        errorObj.navigation = false;
      }
      popUpShow();
    } else addUser();
  };

  return (
    <>
      <div className={Styles.createUserPart}>
        <p className={Styles.createNewUserHead}>Create User</p>
        <div className={Styles.formContainer}>
          <input
            className={Styles.inputFields}
            ref={name}
            placeholder="Name"
            type={"text"}
          />
          <input
            className={Styles.inputFields}
            ref={email}
            placeholder="Email"
            type={"text"}
          />
          <input
            className={Styles.inputFields}
            ref={pass}
            placeholder="Password"
            type={"password"}
            minLength="8"
          />
          <input
            className={Styles.inputFields}
            ref={confirmpass}
            placeholder="Confirm Password"
            type={"password"}
          />
        </div>
        <div
          className={Styles.createUserBtn}
          onClick={() => handleCreateUser()}
        >
          Create User
        </div>
      </div>
    </>
  );
};

// --------------------------------------------------------------------------------------

const ActiveUser = () => {
  const [Data, setData] = useState([]);
  const [viewData, setviewData] = useState(false);

  let { newUser, popUpShow } = useContext(stateContext);

  const dataFetch = async () => {
    let r = await fetchAuth(`${L_LINK}/validate/allFUser`);
    console.log(r);
    if (r.issue) {
      if (r.storageClear) {
        r.storageClear && localStorage.removeItem("Freeskout-session");
        errorObj.desc = r.issueDetail;
        errorObj.navigationRoute = "/";
      } else {
        errorObj.desc = r.issueDetail;
        errorObj.navigation = false;
      }
      popUpShow();
    } else setData(r);
  };

  let j = false;
  useEffect(() => {
    if (!j) dataFetch();
    return () => (j = true);
  }, [newUser]);

  const setView = (a) => setviewData(a);

  return (
    <activeUserContext.Provider value={{ viewData, setView }}>
      <>
        <div className={Styles.presentUsersDiv}>
          <div className={Styles.presntUsersHeadCont}>
            <p>Active Users</p>
          </div>
          <div className={Styles.activeUsersCont}>
            {Data.length ? (
              Data.map((item, index) => {
                return !item.deleted && <User key={index} {...item} />;
              })
            ) : (
              <SmallLoading></SmallLoading>
            )}
          </div>
          <div className={Styles.activeUsersCont}>
            {Data.length ? (
              Data.map((item, index) => {
                return item.deleted && <User key={index} {...item} />;
              })
            ) : (
              <SmallLoading></SmallLoading>
            )}
          </div>
          {viewData && <ViewUserDetails />}
        </div>
      </>
    </activeUserContext.Provider>
  );
};

// -------------------------------------

const User = ({
  name,
  email,
  time,
  deleted,
  deleted_time,
  DetailTrigger,
  DeleteTrigger,
  userPopUpCallback,
}) => {
  const [pageLoading, setpageLoading] = useState(false);

  let { addUser, popUpShow } = useContext(stateContext);
  let { setView } = useContext(activeUserContext);

  let detailObj = {
    name,
    email,
    time,
    deleted,
    deleted_time,
  };

  const handleUserDelete = async () => {
    setpageLoading(true);
    try {
      let dt = new Date();
      let r = await fetch(`${L_LINK}/validate/userDelete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          deleted_time: dt.toDateString() + " " + dt.toTimeString(),
          deleted_by: "Freeskout",
        }),
      });
      let r1 = await r.json();
      console.log(r1);
      if (r1.issue) {
        if (r.storageClear) {
          r1.storageClear && localStorage.removeItem("Freeskout-session");
          errorObj.desc = r1.issueDetail;
          errorObj.navigationRoute = "/";
        } else {
          console.log(r1.issueDetail);
          if (r1.issueDetail === "cannot delete ADMIN") {
            errorObj.desc = "HAHAHA I AM ADMIN :x";
            errorObj.navigation = false;
          } else {
            errorObj.desc = r1.issueDetail;
            errorObj.navigation = false;
          }
        }
        popUpShow();
      } else addUser();
    } catch (error) {
      console.log("error while deleting route in catch", error);
    }
    setpageLoading(false);
  };

  return (
    <>
      {pageLoading && <SmallLoading />}
      <div className={Styles.secondCont}>
        <div className={Styles.userDiv}>
          <div className={Styles.activeUserName}>
            <p> {name}</p>
          </div>
          <div className={Styles.userActionBtnsCont}>
            <div
              className={Styles.viewIconCont}
              onClick={() => setView(detailObj)}
            >
              <FaRegEye className={Styles.viewIcon} />
              <p className={`${Styles.HoverNotification} ${Styles.viewHover}`}>
                View
              </p>
            </div>
            <div className={Styles.TbMinusVertical}>
              <TbMinusVertical className={Styles.TbMinusVertical} />
            </div>
            <div
              className={`${Styles.delIconCont}`}
              onClick={() => handleUserDelete()}
            >
              <AiOutlineDelete className={Styles.delIcon} />
              <p className={`${Styles.HoverNotification} ${Styles.delHover}`}>
                Delete
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

//-------------------------------------------------------------------------------------------------------------------------------------------

const ViewUserDetails = () => {
  const [pageLoading, setpageLoading] = useState(true);

  let { setView, viewData } = useContext(activeUserContext);

  let userHitRef = useRef(null);
  let userRouteCount = useRef(null);

  const getUserHit = async () => {
    // setpageLoading(true)
    userHitRef.current.innerText = await fetchAuth(
      `${L_LINK}/route/getAllUserRoutes/${viewData.email}`
    );
  };
  const getRouteCount = async () => {
    userRouteCount.current.innerText = await fetchAuth(
      `${L_LINK}/route/getAllUserRoutesCount/${viewData.email}`
    );
    // setpageLoading(false);
  };

  let i = false;
  useEffect(() => {
    if (!i) {
      getUserHit();
      getRouteCount();
    }
    return () => (i = true);
  }, []);
  let dateObj = dateTimegen(viewData.time);
  let durationChecker = durationGenerator(
    new Date(dateObj.durationDate),
    new Date()
  );
  let delDateObj;
  let delDurationChecker;
  let linkSts = viewData.deleted;
  if (linkSts) {
    delDateObj = dateTimegen(viewData.deleted_time);
    delDurationChecker = durationGenerator(
      new Date(dateObj.durationDate),
      new Date(delDateObj.durationDate)
    );
  }

  return (
    <>
      <div className={Styles.userDataCont}>
        <div className={Styles.userDataSecondaryDiv}>
          <p className={Styles.selectedUserEmail}>{viewData.email}</p>
          <div className={Styles.createdBy}>
            <p>Created by:</p>
            <p>{viewData.name}</p>
          </div>
          <div className={Styles.createdBy}>
            <p> Created at:</p>
            <p className={Styles.createdDateCont}>
              <span className={Styles.createdDate}>{dateObj.date} </span>
              at <span className={Styles.createdTime}>{dateObj.time}</span>
            </p>
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
          <div className={Styles.dataSecondaryDiv}>
            <p className={Styles.createdBy}>
              Links Created :{" "}
              <span ref={userRouteCount} className={Styles.hits}>
                {"..."}{" "}
              </span>
            </p>
            <p className={Styles.createdBy}>
              Hits Generated:
              <span ref={userHitRef} className={Styles.hits}></span>
            </p>
          </div>
          <div className={Styles.okayBtn} onClick={() => setView(false)}>
            <p>Okay</p>
          </div>
        </div>
      </div>
    </>
  );
};
