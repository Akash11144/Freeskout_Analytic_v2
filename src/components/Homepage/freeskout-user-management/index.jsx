import { useState, useRef, useEffect } from "react";
import Styles from "../freeskout-user-management/index.module.css";
import { FaRegEye } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { TbMinusVertical } from "react-icons/tb";
import SmallLoading from "../../extras/loading-animation/small-loading";
import { fetchAuth, L_LINK, postAuth } from "../../utlis";
import InformationPopUp from "../../extras/pop-ups/information";

let errorObj = {
  desc: "",
  navigation: true,
  navigationRoute: "",
};

let i = 1;

const FUM = () => {
  const [newUser, setnewUser] = useState(i);
  return (
    <>
      <div className={Styles.mainCont}>
        <div className={Styles.secondaryDiv}>
          <UserForm setnewUser={setnewUser} />
          <ActiveUser newUser={newUser} />
        </div>
      </div>
    </>
  );
};
export default FUM;

// --------------------------------------------------------------------------------------------------

const UserForm = ({ setnewUser }) => {
  const [pageError, setpageError] = useState(false);
  let name = useRef(null);
  let email = useRef(null);
  let pass = useRef(null);
  let confirmpass = useRef(null);
  let email_regex = new RegExp("[a-z0-9]+@freeskout+.[a-z]{2,3}");
  let passPattern = /^([A-Za-z0-9\-\_\@\#\$\%\&\*\\]{4,12})*$/;
  let password_regex = new RegExp(passPattern);

  const handleClick = async () => {
    if (
      name.current.value === "" ||
      email.current.value === "" ||
      pass.current.value === "" ||
      confirmpass.current.value === ""
    ) {
      alert("Fill all field");
    } else if (email_regex.test(email.current.value) == false) {
      alert("invalid email");
    } else if (password_regex.test(pass.current.value) == false) {
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
    });
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
      setpageError(true);
    } else {
      console.log("res: ", r);
      setnewUser(++i);
    }
  };

  return (
    <>
      {pageError && <InformationPopUp />}
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
            handleClick();
          }}
        >
          Create User
        </div>
      </div>
    </>
  );
};

// --------------------------------------------------------------------------------------

const ActiveUser = ({ newUser }) => {
  const [Data, setData] = useState([]);
  const [pageError, setpageError] = useState(false);
  const [viewDetails, setviewDetails] = useState(false);

  //

  const dataFetch = async () => {
    let r = await fetchAuth("http://localhost:1111/validate/allFUser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("Freeskout-session")
        )}`,
      },
    });
    console.log("fecth response in active user: ", r);
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
      setpageError(true);
    } else setData(r);
  };

  let j = false;
  useEffect(() => {
    if (!j) dataFetch();
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
      {pageError && <InformationPopUp {...errorObj} />}
      <div className={Styles.presentUsersDiv}>
        <div className={Styles.presntUsersHeadCont}>
          <p>Active Users</p>
        </div>
        <div className={Styles.activeUsersCont}>
          {Data.length ? (
            Data.map((item, index) => (
              <User
                key={index}
                {...item}
                viewDetailTrigger={() => handelViewDetails()}
              />
            ))
          ) : (
            <h1>NO user available</h1>
          )}
        </div>
        {viewDetails && <ViewUserDetails okayTrigger={() => handelOKay()} />}
      </div>
    </>
  );
};

// -------------------------------------

const User = (props) => {
  return (
    <>
      <div className={Styles.secondCont}>
        <div className={Styles.userDiv}>
          <div className={Styles.activeUserName}>
            <p>{props.name}</p>
          </div>
          <div className={Styles.userActionBtnsCont}>
            <div
              className={Styles.viewIconCont}
              onClick={() => props.viewDetailTrigger()}
            >
              <FaRegEye className={Styles.viewIcon} />
              <p className={`${Styles.HoverNotification} ${Styles.viewHover}`}>
                View
              </p>
            </div>
            <div className={Styles.TbMinusVertical}>
              <TbMinusVertical className={Styles.TbMinusVertical} />
            </div>
            <div className={`${Styles.delIconCont}`}>
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
            E-Mail:{" "}
            <span className={Styles.userInfo}>
              akashsinghkumargupta@freeskout.com
            </span>
          </p>
          <p className={Styles.selectedUsePassword}>
            Password: <span className={Styles.userInfo}>Helllo12345</span>
          </p>
          <div className={Styles.dataSecondaryDiv}>
            <p className={Styles.linksCreated}>
              Links Created : <span className={Styles.userInfo}>5</span>
            </p>
            <p className={Styles.hitsGenerated}>
              Hits Generated: <span className={Styles.userInfo}>500</span>
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
