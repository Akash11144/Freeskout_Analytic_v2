import Styles from "./index.module.css";
import { useNavigate } from "react-router";
import { useEffect, useRef } from "react";
const InformationPopUp = (props) => {
  const navi1 = useNavigate();
  const popupref = useRef(null);

  let i = false;
  useEffect(() => {
    if (!i) popupref.current.style.display = "block";
    return () => (i = true);
  });

  return (
    <div ref={popupref} className={Styles.mainCont} id="popUpdiv">
      {console.log("props from component popup", props)}
      <div className={Styles.canvasDiv}>
        <div className={Styles.secondaryDiv}>
          <p className={Styles.popUpPara}>{props.desc}</p>
          <div
            className={Styles.popUpBtn}
            onClick={() => {
              if (props.keyp === "loginPopUp")
                props.loginPopUpC();
              if (props.keyp === "sfcb")
                props.createUserPopUp();
              if (props.keyp === "lmcb")
                props.linkMgmtPopUp();
              if (props.keyp === "fummain")
                props.pucb();
              props.navigation
                ? navi1(props.navigationRoute)
                : (popupref.current.style.display = "none")
            }
            }
          >
            OK
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationPopUp;
