import Styles from "../sidebar/index.module.css"
import { Link } from "react-router-dom";
const sidebar = (props) => {
    return (
        <div className={Styles.mainCont}>
            <div className={Styles.stars}></div>
            <div className={Styles.stars2}></div>
            <div className={Styles.stars3}></div>
            <h3 className={Styles.hiCOnt}>Hi<span className={Styles.usernameCont}>{props.name}</span> ,</h3>
            <div className={Styles.optnContainer}>
                <div className={Styles.optsGroup} id="optOne">Option One</div>
                <div className={Styles.optsGroup} id="optTwo">Option Two</div>
                <div className={Styles.optsGroup} id="optThree">Option Three</div>
                <div className={Styles.optsGroup} id="optFour">Option Four</div>
            </div>
            <div className={Styles.siteLinkBtnContaier}>
                <div className={Styles.logoutbtn} onClick={() => {
                    localStorage.removeItem("Freeskout-session")
                }}>
                    Sign Out
                </div>
                <div className={Styles.siteLinkBtn}>
                    <Link className={Styles.siteLinkBtn} to="">
                        www.freeskout.com
                    </Link>
                </div>
            </div>
        </div >
    );
}

export default sidebar;