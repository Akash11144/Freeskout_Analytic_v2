import { useEffect, useState } from "react";

let MyTimer = () => {
  const timeFtn = () => {
    let currentHours;
    let date = new Date();
    let currentMinutes = date.getMinutes();
    let selectedHours = date.getHours();
    let selectedSeconds = date.getSeconds();
    switch (true) {
      case selectedHours == 0: {
        currentHours = " " + 0 + ":" + currentMinutes;
        break;
      }
      case selectedHours == 12: {
        currentHours = " " + 12 + ":" + currentMinutes;
        break;
      }
      case selectedHours > 12 && selectedHours != 0 && selectedHours != 12: {
        currentHours =
          " " +
          selectedHours -
          12 +
          ":" +
          currentMinutes +
          ":" +
          selectedSeconds +
          "PM";
        break;
      }
      case selectedHours < 12: {
        currentHours =
          " " +
          selectedHours +
          ":" +
          currentMinutes +
          ":" +
          selectedSeconds +
          "AM";
        break;
      }
      default:
        currentHours = " " + " na ";
    }
    setmyTime(currentHours);
    console.log(myTime);
  };
  const [myTime, setmyTime] = useState("na");
  // useEffect(() => setInterval(() => timeFtn(), 1000), []);
  useEffect(() => {
    let id = setInterval(() => timeFtn(), 1000);
    return () => {
      clearInterval(id);
    };
  }, []);

  return <span>{myTime}</span>;
};
// setInterval(MyTimer, 100);
// console.log(currentHours);
export default MyTimer;
