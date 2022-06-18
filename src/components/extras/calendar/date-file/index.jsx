import { useState, useEffect } from "react";
import Styles from "./index.module.css";
function Calendar() {
  const [cDate, setcDate] = useState(new Date());
  function refreshCalendar() {
    setcDate(new Date());
  }
  useEffect(() => {
    const CalendarID = setInterval(refreshCalendar, 1000);
    return function cleanup() {
      clearInterval(CalendarID);
    };
  }, []);
  return (
    <span className={Styles.conetntContainer}>{cDate.toDateString()}</span>
  );
}
export default Calendar;
