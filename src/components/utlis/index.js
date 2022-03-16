export const dateObserver = () => {
  let d = new Date();
  return {
    Full_Year: d.getFullYear(),
    Month: d.getMonth() + 1,
    Datee: d.getDate(),
    Hours: d.getHours(),
    Minutes: d.getMinutes(),
    Seconds: d.getSeconds(),
    Mili_Seconds: d.getMilliseconds(),
  };
};

// -----------------------------------------------------------------

export const monthObserver = (a) => {
  let t = "";
  switch (a) {
    case 1:
      t = "Jan";
      break;
    case 2:
      t = "Feb";
      break;
    case 3:
      t = "Mar";
      break;
    case 4:
      t = "Apr";
      break;
    case 5:
      t = "May";
      break;
    case 6:
      t = "Jun";
      break;
    case 7:
      t = "Jul";
      break;
    case 8:
      t = "Aug";
      break;
    case 9:
      t = "Sep";
      break;
    case 10:
      t = "Oct";
      break;
    case 11:
      t = "Nov";
      break;
    case 12:
      t = "dec";
      break;
    default:
      t = "Some err";
      break;
  }
  return t;
};

// -------------------------------------------------------------

export const dayObserver = (a) => {
  let t = "";
  switch (a) {
    case 1:
      t = "Mon";
      break;
    case 2:
      t = "Tue";
      break;
    case 3:
      t = "Wed";
      break;
    case 4:
      t = "Thu";
      break;
    case 5:
      t = "Fri";
      break;
    case 6:
      t = "Sat";
      break;
    case 7:
      t = "Sun";
      break;
    default:
      t = "Some err";
      break;
  }
  return t;
};

// -------------------------------------------------------------------

export const timeGenerator = () => {
  let y = dateObserver();
  return (
    "" +
    dayObserver((y.Datee % 7) + 1) +
    ", " +
    y.Datee +
    " " +
    monthObserver(y.Month) +
    " " +
    y.Full_Year +
    " " +
    y.Hours +
    ":" +
    y.Minutes +
    ":" +
    y.Seconds +
    ":" +
    y.Mili_Seconds
  );
};
// ------------------------------------------------------------------------------

const getCoordinates = () => {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject)
  );
};
export const getAddress = async () => {
  let y = {
    latitude: "",
    longitude: "",
  };
  await getCoordinates()
    .then((position) => {
      y.latitude = position.coords.latitude;
      y.longitude = position.coords.longitude;
    })
    .catch(function handleError(error) {
      const { code } = error;
      console.log(code, error);
      switch (code) {
        case 0:
          y.latitude = "the position could not be determined and the browser does not know why";
          y.longitude = "the position could not be determined and the browser does not know why";
          break;
        case 1:
          y.latitude = "user denied permission";
          y.longitude = "user denied permission";
          break;
        case 2:
          y.latitude = "location was unavailable";
          y.longitude = "location was unavailable";
          break;
        case 3:
          y.latitude = "did'nt got location in time";
          y.longitude = "did'nt got location in time";
          break;
        default:
          y.latitude = "can't say anything for now";
          y.longitude = "can't say anything for now";
          break;
      }
    });
    return y;
};

// --------------------------------------------------------------------

export const ipFetch = async () => {
    try {
      let r = await fetch("https://www.cloudflare.com/cdn-cgi/trace").then(
        (res) => res.text()
      );
      return r.split("ts")[0].split("ip=")[1].split("\n")[0];
    } catch (error) {
      console.log(error);
      return "unable to fetch ip due to some error from outside";
    }
  };

//   --------------------------------------------------------------------------------

export const postR = async (mainLink,route,pdata)=>{
    try {
        let r = await fetch(mainLink+route, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pdata)
        });
        console.log(await r.json());
      } catch (error) {
        console.log("error in post fetch request");
      }
}