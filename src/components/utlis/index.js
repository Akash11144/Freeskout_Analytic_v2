export const dateObserver = () => {
  let d = new Date();
  let m = d.getMonth() + 1;
  let m1 = m < 10 ? "0" + m : m;
  let dt = d.getDate();
  let dt1 = dt < 10 ? "0" + dt : dt;
  let hr = d.getHours();
  let hr1 = hr < 10 ? "0" + hr : hr;
  let mn = d.getMinutes();
  let mn1 = mn < 10 ? "0" + mn : mn;
  let sec = d.getSeconds();
  let sec1 = sec < 10 ? "0" + sec : sec;
  let ms = d.getMilliseconds();
  let ms1 = 0;
  if (ms < 10) ms1 = "0" + "0" + ms;
  else if (ms < 100) ms1 = "0" + ms;
  else ms1 = ms;
  return {
    Full_Year: d.getFullYear(),
    Month: m1,
    Datee: dt1,
    Hours: hr1,
    Minutes: mn1,
    Seconds: sec1,
    Mili_Seconds: ms1,
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

// -----------------------------------------------------------------

export const monthNumberObserver = (a) => {
  let t = 0;
  switch (a) {
    case "Jan":
      t = 1;
      break;
    case "Feb":
      t = 2;
      break;
    case "Mar":
      t = 3;
      break;
    case "Apr":
      t = 4;
      break;
    case "May":
      t = 5;
      break;
    case "Jun":
      t = 6;
      break;
    case "Jul":
      t = 7;
      break;
    case "Aug":
      t = 8;
      break;
    case "Sep":
      t = 9;
      break;
    case "Oct":
      t = 10;
      break;
    case "Nov":
      t = 11;
      break;
    case "dec":
      t = 12;
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
    monthObserver(+y.Month) +
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
          y.latitude =
            "the position could not be determined and the browser does not know why";
          y.longitude =
            "the position could not be determined and the browser does not know why";
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

export const postR = async (mainLink, route, pdata, Auth) => {
  try {
    console.log(mainLink, route, pdata, Auth);
    let r = await fetch(mainLink + route, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: Auth,
      },
      body: JSON.stringify(pdata),
    });
    let r1 = await r.json();
    return r1;
  } catch (error) {
    console.log("error in post request", error);
    return {
      FetchIssue: true,
      FetchIssueDetail: "Server error, try again later",
    };
  }
};

export const fetchR = async (a) => {
  try {
    let t = await fetch(a);
    let t1 = await t.json();
    return t1;
  } catch (error) {
    console.log("error while fetching in frontend", error);
  }
};

// const response = await fetch(url, {
//   method: 'POST', // *GET, POST, PUT, DELETE, etc.
//   mode: 'cors', // no-cors, *cors, same-origin
//   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//   credentials: 'same-origin', // include, *same-origin, omit
//   headers: {
//     'Content-Type': 'application/json'
//     // 'Content-Type': 'application/x-www-form-urlencoded',
//   },
//   redirect: 'follow', // manual, *follow, error
//   referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//   body: JSON.stringify(data) // body data type must match "Content-Type" header
// });
