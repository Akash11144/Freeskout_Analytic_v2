import Styles from "./index.module.css";
import { useNavigate } from "react-router";
import { useEffect } from "react";
const InformationPopUp = (props) => {
  const navi1 = useNavigate();

  useEffect(
    () => (document.getElementById("popUpdiv").style.display = "block"),
    []
  );

  return (
    <div className={Styles.mainCont} id="popUpdiv">
      {console.log("props from component popup", props)}
      <div className={Styles.canvasDiv}>
        <div className={Styles.secondaryDiv}>
          <p className={Styles.popUpPara}>{props.desc}</p>
          <div
            className={Styles.popUpBtn}
            onClick={() => {
              if (props.navigation) {
                navi1(props.navigationRoute);
              } else {
                document.getElementById("popUpdiv").style.display = "none";
                props.b(false);
              }
            }}
          >
            OK
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationPopUp;
