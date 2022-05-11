import { useState, useEffect } from "react";
import Styles from "../DateFile/index.module.css";
function Clock() {
  const [date, setdate] = useState(new Date());
  function refreshclock() {
    setdate(new Date());
  }
  useEffect(() => {
    const clockID = setInterval(refreshclock, 1000);
    return function cleanup() {
      clearInterval(clockID);
    };
  }, []);
  return (
    <span className={Styles.conetntContainer}>{date.toLocaleTimeString()}</span>
  );
}
export default Clock;
