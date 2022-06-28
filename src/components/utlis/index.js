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
