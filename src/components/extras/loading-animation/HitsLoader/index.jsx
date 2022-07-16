import Styles from "../send-mail-animation/index.module.css";
import sendmail from "../../../assets/smalLoader.gif";
const HitsLoader = () => {
  return (
    <div className={Styles.mainCont}>
      <img src={sendmail} alt="" />
    </div>
  );
};

export default HitsLoader;
