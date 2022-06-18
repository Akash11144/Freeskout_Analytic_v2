import Styles from "../loadingAnimation/index.module.css"
const LoaderAnmation = () => {
    return (
        <div className={Styles.mainCont}>
            <div className={Styles.spinnerBox}>
                <div className={Styles.circleBorder}>
                    <div className={Styles.circleCore}></div>
                </div>
            </div>
        </div>
    );
}

export default LoaderAnmation;