import { useRef } from "react";
import Styles from "../freeskout-user-management/index.module.css";
import { FaRegEye } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
const FUM = () => {
  let name = useRef(null);
  let email = useRef(null);
  let pass = useRef(null);
  let confirmpass = useRef(null);
  // let email_regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
  let email_regex = new RegExp("[a-z0-9]+@freeskout+.[a-z]{2,3}");
  let phone_regex = new RegExp("[0-9]{10}");

  const handleClick = () => {
    if (
      name.current.value === "" ||
      email.current.value === "" ||
      pass.current.value === "" ||
      confirmpass.current.value === ""
    ) {
      alert("Fill all field");
    } else if (email_regex.test(email.current.value) == false) {
      alert("invalid email");
    } else if (pass.current.value != confirmpass.current.value) {
      alert("password dont match");
    } else {
      alert("ready to login");
    }
  };
  const getYear = () => {
    var dt = new Date();
    return dt.getFullYear();
  };
  return (
    <div className={Styles.mainCont}>
      <div className={Styles.secondaryDiv}>
        <div className={Styles.createUserPart}>
          <p className={Styles.createNewUserHead}>New User</p>
          <div className={Styles.formContainer}>
            <input
              className={Styles.inputFields}
              ref={name}
              placeholder="Enter Name"
              type={"text"}
            />
            <input
              className={Styles.inputFields}
              ref={email}
              placeholder="Enter MailID"
              type={"text"}
            />
            <input
              className={Styles.inputFields}
              ref={pass}
              placeholder="Enter Password"
              type={"password"}
            />
            <input
              className={Styles.inputFields}
              ref={confirmpass}
              placeholder="Confirm Password"
              type={"password"}
            />
          </div>
          <div className={Styles.createUserBtn} onClick={() => handleClick()}>
            Create User
          </div>
        </div>
        <div className={Styles.presentUsersDiv}>
          <div className={Styles.presntUsersHeadCont}>
            <p>Active Users</p>
          </div>
          <div className={Styles.activeUsersCont}>
            <User></User>
            <User></User>
            <User></User>
            <User></User>
            <User></User>
            <User></User>
            <User></User>
            <User></User>
            <User></User>
            <User></User>
          </div>
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
              <div className={Styles.okHolder}>
                <p>Okay</p>
              </div>
            </div>
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
export default FUM;

const User = () => {
  return (
    <div className={Styles.secondCont}>
      <div className={Styles.userDiv}>
        <div className={Styles.activeUserName}>
          <p>Akash Singh Kumar Gupta</p>
        </div>
        <div className={Styles.userActionBtnsCont}>
          <div className={Styles.viewIconCont}>
            <FaRegEye className={Styles.viewIcon} />
            <p className={`${Styles.HoverNotification} ${Styles.viewHover}`}>
              View
            </p>
          </div>
          |
          <div className={`${Styles.delIconCont}`}>
            <AiOutlineDelete className={Styles.delIcon} />
            <p className={`${Styles.HoverNotification} ${Styles.delHover}`}>
              Delete
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
const InfoDiv = () => {
  return (
    <div className={Styles.userDataCont}>
      <p className={Styles.selectedUserEmail}>
        E-Mail:{" "}
        <span className={Styles.userInfo}>
          akashsinghkumargupta@freeskout.com
        </span>
      </p>
      <p className={Styles.selectedUsePassword}>
        Password: <span className={Styles.userInfo}>Helllo12345</span>
      </p>
      <p className="linksCreated">
        Links Created : <span className={Styles.userInfo}>5</span>
      </p>
    </div>
  );
};
