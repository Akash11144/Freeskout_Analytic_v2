import Styles from "./index.module.css";
import gif from "../../../assets/comingSoon.gif";
const ComingSoon = () => {
  return (
    <div className={Styles.mainCont}>
      <img src={gif} alt="" />
    </div>
  );
};

export default ComingSoon;
