import React from "react";
import Styles from "../sendMailAnimation/index.module.css";
import sendmail from "../../../assets/sendMailnimation.gif";
const SendMail = () => {
  return (
    <div className={Styles.mainCont}>
      <img src={sendmail} alt="" />
    </div>
  );
};

export default SendMail;
