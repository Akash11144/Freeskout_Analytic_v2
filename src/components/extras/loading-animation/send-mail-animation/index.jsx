import React from "react";
import Styles from "../send-mail-animation/index.module.css";
import sendmail from "../../../assets/sendMailanimation.gif";
const SendMail = () => {
  return (
    <div className={Styles.mainCont}>
      <img src={sendmail} alt="" />
    </div>
  );
};

export default SendMail;
