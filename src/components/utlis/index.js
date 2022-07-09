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
