export const L_LINK = "http://localhost:1111";

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

export const postR = async (mainLink, route, pdata) => {
  try {
    let r = await fetch(mainLink + route, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pdata),
    });
    let r1 = await r.json();
    return r1;
  } catch (error) {
    console.log("error in post request", error);
    return {
      issue: true,
      issueDetail: "Server error, try again later",
    };
  }
};

// ----------------------------------------------------------------------------------------------

export const postAuth = async (mainLink, route, pdata) => {
  try {
    let r = await fetch(mainLink + route, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("Freeskout-session")
        )}`,
      },
      body: JSON.stringify(pdata),
    });
    let r1 = await r.json();
    return r1;
  } catch (error) {
    console.log("error in post request", error);
    return {
      issue: true,
      issueDetail: "Server error, try again later",
    };
  }
};

// --------------------------------------------------------------------------------------------------

export const fetchR = async (a) => {
  try {
    let t = await fetch(a);
    let t1 = await t.json();
    return t1;
  } catch (error) {
    console.log("error while fetching in frontend", error);
    return {
      issue: true,
      issueDetail: "error getting data",
    };
  }
};

// ------------------------------------------------------------------------------

export const fetchAuth = async (a) => {
  try {
    let r1 = await fetch(a, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("Freeskout-session")
        )}`,
      },
    });
    let r2 = await r1.json();
    return r2;
  } catch (error) {
    console.log("error while fetching in frontend", error);
    return {
      issue: true,
      issueDetail: "error getting data",
    };
  }
};

// ------------------------------------------------------------------------------

export const emailChecker = (email) => {
  let sts = false;
  let allowedDomain = [
    "gmail",
    "outlook",
    "icloud",
    "yahoo",
    "hotmail",
    "proton",
    "zoho",
    "freeskout",
  ];

  let allowedEnds = ["com", "in", "io", "net"];

  let atChecker = email.split("@");
  let dotChecker = email.split("..");
  let spaceChecker = email.split(" ");
  console.log(atChecker, dotChecker, spaceChecker);
  let firstSecondSplit;
  if (
    atChecker.length === 2 &&
    spaceChecker.length === 1 &&
    dotChecker.length === 1
  ) {
    firstSecondSplit = atChecker[1].split(".");
    if (firstSecondSplit.length === 2) {
      for (let i = 0; i <= allowedDomain.length; i++) {
        let result = firstSecondSplit[0]
          .toLowerCase()
          .includes(allowedDomain[i]);
        if (result) {
          for (let i = 0; i <= allowedEnds.length; i++) {
            let result = firstSecondSplit[1]
              .toLowerCase()
              .includes(allowedEnds[i]);
            if (result) sts = true;
          }
        }
      }
    }
  }
  return sts;
};

// ----------------------------------------------------------------------------

export const urlChecker = (site) => {
  let urlSts = false;
  let spaceChecker = site.split(" ");
  if (spaceChecker.length === 1) {
    urlSts = true;
  }
  return urlSts;
};

// ------------------------------------------------------------------------------
export const slugchecker = (slug) => {
  let mainSLug = slug.toLowerCase()
  let slugSts = true;
  for (let i = 0; i < mainSLug.length; i++) {
    let a = mainSLug[i].charCodeAt();
    if (
      (a > 96 && a < 123) ||
      (a > 47 && a < 58) ||
      a === 64 ||
      a === 95 ||
      a === 45
    );
    else {
      slugSts = false;
      break;
    }
  }
  return slugSts;
};

//-------------------------------------------------------------------------------
export const dateTimegen = (inputString) => {
  let dateObj = {
    date: '',
    time: '',
    durationDate: '',
  }
  let monthNo;
  let dateInitialization = inputString.split(' ')
  switch (dateInitialization[1]) {
    case "Jan":
      monthNo = 1
      break;
    case "Feb":
      monthNo = 2
      break;
    case "Mar":
      monthNo = 3
      break;
    case "Apr":
      monthNo = 4
      break;
    case "May":
      monthNo = 5
      break;
    case "Jun":
      monthNo = 6
      break;
    case "Jul":
      monthNo = 7
      break;
    case "Aug":
      monthNo = 8
      break;
    case "Sep":
      monthNo = 9
      break;
    case "Oct":
      monthNo = 10
      break;
    case "Nov":
      monthNo = 11
      break;
    case "Dec":
      monthNo = 12
      break;
  }
  let date = dateInitialization[0] + ' ' + dateInitialization[1] + ' ' + dateInitialization[2] + ', ' + dateInitialization[3]
  let timeLayout = dateInitialization[4].split(':')
  let finalTime = timeLayout[0] + ":" + timeLayout[1]
  let durationDate = monthNo + "/" + dateInitialization[2] + '/' + dateInitialization[3] + " " + finalTime
  dateObj.durationDate = durationDate
  dateObj.date = date
  let timeset = dateInitialization[4].split(':')
  if (timeset[0] < 12) {
    dateObj.time = timeset[0] + ':' + timeset[1] + ' AM'
  } else if (timeset[0] === 12) {
    dateObj.time = timeset[0] + ':' + timeset[1]
  } else {
    dateObj.time = (timeset[0] - 12) + ':' + timeset[1] + ' PM'
  }
  return dateObj
}
//-------------------------------------------------------------------------------
export const durationGenerator = (initial, final) => {
  let a = initial;
  let b = final;
  let output;
  let c = b - a;
  if (c == 0) {
    output = "Just now";
  } else {
    let duration = c / (1000 * 3600 * 24);
    let e = duration.toString();
    let d = e.split(".");
    let days = d[0];
    let hours = Math.round(+("0." + d[1]) * 24);
    output = days + " Days" + " " + hours + " hrs";
  }
  return output;
};

//-------------------------------------------------------------------------------

// const getCoordinates = () => {
//   return new Promise((resolve, reject) =>
//     navigator.geolocation.getCurrentPosition(resolve, reject)
//   );
// };
// export const getAddress = async () => {
//   let y = {
//     latitude: "",
//     longitude: "",
//   };
//   await getCoordinates()
//     .then((position) => {
//       y.latitude = position.coords.latitude;
//       y.longitude = position.coords.longitude;
//     })
//     .catch(function handleError(error) {
//       const { code } = error;
//       console.log(code, error);
//       switch (code) {
//         case 0:
//           y.latitude =
//             "the position could not be determined and the browser does not know why";
//           y.longitude =
//             "the position could not be determined and the browser does not know why";
//           break;
//         case 1:
//           y.latitude = "user denied permission";
//           y.longitude = "user denied permission";
//           break;
//         case 2:
//           y.latitude = "location was unavailable";
//           y.longitude = "location was unavailable";
//           break;
//         case 3:
//           y.latitude = "did'nt got location in time";
//           y.longitude = "did'nt got location in time";
//           break;
//         default:
//           y.latitude = "can't say anything for now";
//           y.longitude = "can't say anything for now";
//           break;
//       }
//     });
//   return y;
// };

// ------------------------------------------------------------------------------------------------

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
