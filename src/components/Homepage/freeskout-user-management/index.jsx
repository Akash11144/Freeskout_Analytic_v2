import { useState, useRef, useEffect } from "react";
import Styles from "../freeskout-user-management/index.module.css";
import { FaRegEye } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { TbMinusVertical } from "react-icons/tb";
import SmallLoading from "../../extras/loading-animation/small-loading";
import { L_LINK, postAuth } from "../../utlis";

const FUM = () => {
  const [Data, setData] = useState([]);
  const [startLoading, setstartLoading] = useState(true);

  let name = useRef(null);
  let email = useRef(null);
  let pass = useRef(null);
  let confirmpass = useRef(null);
  let email_regex = new RegExp("[a-z0-9]+@freeskout+.[a-z]{2,3}");
  let passPattern = /^([A-Za-z0-9\-\_\@\#\$\%\&\*\\]{4,12})*$/;
  let password_regex = new RegExp(passPattern);

  let i = false;
  useEffect(() => {
    if (!i) {
      const dataFetch = async () => {
        let r = await fetch("http://localhost:1111/validate/allFUser", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("Freeskout-session")
            )}`,
          },
        });
        let r1 = await r.json();
        console.log("user data from manage user: ", r1);
        setData(r1);
      };
      dataFetch();
    }
    setstartLoading(false);
    return () => (i = true);
  }, []);

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
      // alert("ready to login");
      console.log("ready to login");
    }
    const url = new URL(L_LINK);
    // url.host = L_LINK;
    url.pathname = "/validate/addFUser";
    console.log("url: ", url);
    const dt = new Date();
    let r = await postAuth(url, "", {
      name: name.current.value,
      email: email.current.value,
      password: pass.current.value,
      time: dt.toDateString() + " " + dt.toTimeString(),
    });
    console.log("res: ", r);
  };

  return (
    <>
      {startLoading && <SmallLoading />}
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
                minLength="8"
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
              {Data.length ? (
                Data.map((item, index) => <User key={index} {...item} />)
              ) : (
                <h1>NO user available</h1>
              )}
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
      </div>
    </>
  );
};
export default FUM;

const User = (props) => {
  return (
    <div className={Styles.secondCont}>
      <div className={Styles.userDiv}>
        <div className={Styles.activeUserName}>
          <p>{props.name}</p>
        </div>
        <div className={Styles.userActionBtnsCont}>
          <div className={Styles.viewIconCont}>
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
  );
};
