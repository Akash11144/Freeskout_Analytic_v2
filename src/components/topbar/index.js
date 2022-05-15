import Styles from '../topbar/index.module.css'
import companyLogo from "../routes/freeskout.png";
import Calendar from "../Calendar/DateFile"
import Time from "../Calendar/TimeFile"


const topbar = () => {
    return (
        <div className={Styles.mainCont}>
            <div className={Styles.leftMain}>
                <div className={Styles.logoCont}>
                    <img src={companyLogo}></img>
                </div>
                <div className={Styles.navOptnCont}>
                    <span className={Styles.navOptns}>Home</span>
                    <span className={Styles.navOptns}>Home</span>
                    <span className={Styles.navOptns}>Home</span>
                    <span className={Styles.navOptns}>Home</span>
                </div>
            </div>
            <div className={Styles.dateTimeLogoutCont}>
                <div className={Styles.secDiv}>
                    <p className={Styles.dateCont}>
                        Date:
                        <Calendar></Calendar>
                    </p>
                    <p className={Styles.timeCont}>
                        Time:
                        <Time></Time>
                    </p>
                </div>
            </div>
        </div>
    )
}
export default topbar;
const DateSet = () => {
    let date = new Date
    let currentDate = date.getDate()
    let monthSet;
    let currentMonth = date.getMonth()

    switch (currentMonth) {
        case 0:
            monthSet = "-Jan-";
            break;
        case 1:
            monthSet = "-Feb-";
            break;
        case 2:
            monthSet = "-Mar-";
            break;
        case 3:
            monthSet = "-Apr-";
            break;
        case 4: monthSet = "-May-";
            break;
        case 5:
            monthSet = "-Jun-";
            break;
        case 6:
            monthSet = "-Jul-";
            break;
        case 7:
            monthSet = "-Aug-";
            break;
        case 8:
            monthSet = "-Sept-";
            break;
        case 9:
            monthSet = "-Oct-";
            break;
        case 10:
            monthSet = "-Nov-";
            break;
        case 11:
            monthSet = "-Dec-";
            break;
        default:
            monthSet = " ";
    }
    let currentYear = date.getFullYear()
    let fullDate = " " + currentDate + monthSet + currentYear
    return (
        <span className={Styles.date}>{fullDate}</span>
    )
}

