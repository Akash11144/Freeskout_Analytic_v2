import Styles from "./index.module.css";
import ComingSoon from "../../extras/loading-animation/comingSoon";
const Dashboard = () => {
  return (
    <div className={Styles.mainCont}>
      <ComingSoon></ComingSoon>
    </div>
  );
};

export default Dashboard;
