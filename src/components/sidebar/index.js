import Styles from "../sidebar/index.module.css"
import companyLogo from "../routes/freeskout.png";
import { Link } from "react-router-dom";
const sidebar = () => {
    return (
        <div className={Styles.mainCont}>
            <div className={Styles.stars}></div>
            <div className={Styles.stars2}></div>
            <div className={Styles.stars3}></div>
            <h3 className={Styles.hiCOnt}>Hi<span className={Styles.usernameCont}>  Admin</span> ,</h3>
            <div className={Styles.optnContainer}>
                <div className={Styles.optsGroup} id="optOne">Option One</div>
                <div className={Styles.optsGroup} id="optTwo">Option Two</div>
                <div className={Styles.optsGroup} id="optThree">Option Three</div>
                <div className={Styles.optsGroup} id="optFour">Option Four</div>
            </div>
            <div className={Styles.siteLinkBtnContaier} >  <Link className={Styles.siteLinkBtn} to="">
                www.freeskout.com
            </Link></div>
        </div >
    );
}

export default sidebar;