import { useState, useRef, useEffect } from "react";
import Styles from "../freeskout-user-management/index.module.css";
import { FaRegEye } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { TbMinusVertical } from "react-icons/tb";
import SmallLoading from "../../extras/loading-animation/small-loading";
import { emailChecker, fetchAuth, L_LINK, postAuth } from "../../utlis";
import InformationPopUp from "../../extras/pop-ups/information";

let errorObj = {
  desc: "",
  navigation: true,
  navigationRoute: "",
};

let i = 1;

const FUM = () => {
  const [newUser, setnewUser] = useState(i);
  const [pageError, setpageError] = useState(false);

  return (
    <>
      {pageError && <InformationPopUp keyp={"fummain"} pucb={() => setpageError(false)} {...errorObj} />}
      <div className={Styles.mainCont}>
        <div className={Styles.secondaryDiv}>
          <UserForm userFormPopUpCallback={() => setpageError(true)} setnewUser={setnewUser} />
          <ActiveUser activeUserCallback={() => setpageError(true)} newUser={newUser} />
        </div>
      </div>
    </>
  );
};
export default FUM;

// --------------------------------------------------------------------------------------------------

const UserForm = ({ setnewUser, userFormPopUpCallback }) => {
  const [pageLoading, setpageLoading] = useState(false);

  let name = useRef(null);
  let email = useRef(null);
  let pass = useRef(null);
  let confirmpass = useRef(null);
  let passPattern = /^([A-Za-z0-9\-\_\@\#\$\%\&\*\\]{3,12})*$/;
  let password_regex = new RegExp(passPattern);

  const handleCreateUser = async () => {
    setpageLoading(true);
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
      setpageLoading(false);
      userFormPopUpCallback();
    } else {
      console.log("res: ", r);
      setnewUser(++i);
      setpageLoading(false);
    }
  };

  return (
    <>
      {pageLoading && <SmallLoading />}
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
          onClick={() => {
            handleCreateUser();
          }}
        >
          Create User
        </div>
      </div>
    </>
  );
};

// --------------------------------------------------------------------------------------

const ActiveUser = ({ newUser, activeUserCallback }) => {
  const [Data, setData] = useState([]);
  const [viewDetails, setviewDetails] = useState(false);
  const [useDetails, setuseDetails] = useState();
  const [pageLoading, setpageLoading] = useState(false);

  const dataFetch = async () => {
    let r = await fetchAuth(`${L_LINK}/validate/allFUser`);
    console.log("fecth response in active user: ", r);
    if (r.issue) {
      if (r.storageClear) {
        r.storageClear && localStorage.removeItem("Freeskout-session");
        errorObj.desc = r.issueDetail;
        errorObj.navigationRoute = "/";
      } else {
        errorObj.desc = r.issueDetail;
        errorObj.navigation = false;
      }
      activeUserCallback();
    } else setData(r);
  };

  let j = false;
  useEffect(() => {
    setpageLoading(true)

    if (!j) dataFetch();
    setpageLoading(false)
    return () => {
      j = true;
    };
  }, [newUser]);

  const handelViewDetails = () => {
    setviewDetails(true);
  };

  const handelOKay = () => {
    setviewDetails(false);
  };
  return (
    <>
      {pageLoading && <SmallLoading />}
      <div className={Styles.presentUsersDiv}>
        <div className={Styles.presntUsersHeadCont}>
          <p>Active Users</p>
        </div>
        <div className={Styles.activeUsersCont}>
          {Data.length ? (
            Data.map((item, index) => {
              return !item.deleted &&
                <User
                  key={index}
                  {...item}
                  DetailTrigger={(d) => {
                    setuseDetails(d);
                    handelViewDetails();
                  }}
                  DeleteTrigger={() => dataFetch()}
                  userPopUpCallback={() => activeUserCallback()}
                />
            })
          ) : (
            <h1>NO user available</h1>
          )}
        </div>
        <div className={Styles.activeUsersCont}>
          {Data.length ? (
            Data.map((item, index) => {
              return item.deleted &&
                <User
                  key={index}
                  {...item}
                  DetailTrigger={(d) => {
                    setuseDetails(d);
                    handelViewDetails();
                  }}
                  DeleteTrigger={() => dataFetch()}
                  userPopUpCallback={() => activeUserCallback()}
                />
            })
          ) : (
            <h1>NO user available</h1>
          )}
        </div>
        {viewDetails && (
          <ViewUserDetails okayTrigger={() => handelOKay()} a={useDetails} />
        )}
      </div>
    </>
  );
};

// -------------------------------------

const User = ({
  name,
  email,
  password,
  time,
  deleted,
  DetailTrigger,
  DeleteTrigger,
  userPopUpCallback
}) => {
  const [pageLoading, setpageLoading] = useState(false);


  let detailObj = {
    name,
    email,
    linkNumber: 10,
    hitNUmber: 566,
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
        userPopUpCallback();
      } else {
        DeleteTrigger(email);
      }
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
              onClick={() => DetailTrigger(detailObj)}
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

//-------------------------------
const ViewUserDetails = (props) => {
  return (
    <>
      <div className={Styles.userDataCont}>
        <div className={Styles.userDataSecondaryDiv}>
          <p className={Styles.selectedUserEmail}>
            E-Mail: <span className={Styles.userInfo}>{props.a.email}</span>
          </p>
          <p className={Styles.selectedUsePassword}>
            Name: <span className={Styles.userInfo}>{props.a.name}</span>
          </p>
          <div className={Styles.dataSecondaryDiv}>
            <p className={Styles.linksCreated}>
              Links Created :{" "}
              <span className={Styles.userInfo}>{props.a.linkNumber}</span>
            </p>
            <p className={Styles.hitsGenerated}>
              Hits Generated:{" "}
              <span className={Styles.userInfo}>{props.a.hitNUmber}</span>
            </p>
          </div>
          <div className={Styles.okHolder} onClick={() => props.okayTrigger()}>
            <p>Okay</p>
          </div>
        </div>
      </div>
    </>
  );
};
