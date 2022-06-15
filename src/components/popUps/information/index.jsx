import Styles from "./index.module.css";
import { BsX } from "react-icons/bs";
const InformationPopUp = () => {
  return (
    <div className={Styles.mainCont}>
      <div className={Styles.secondaryDiv}>
        <p className={Styles.popUpPara}>
          lorem ipsum dollar alpha beta gaama delta echo zeta fuddu sprem jhatu
          jhaatu jhaatu
        </p>
        <div className={Styles.popUpBtn}>Accept</div>
      </div>
    </div>
  );
};

export default InformationPopUp;
