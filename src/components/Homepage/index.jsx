import React, { useEffect, useState } from "react";
import { useRoutes } from "react-router";
import Styles from "../homepage/index.module.css";
import Topbar from "./topbar";
import RouteCreationDesign from "./route-creation";
import FUM from "./freeskout-user-management";
import LinkManement from "./linkManagement";
import PageNotFound from "../redirection/page-not-found";
import InformationPopUp from "../extras/pop-ups/information";
import SmallLoading from "../extras/loading-animation/small-loading";
import { fetchAuth, L_LINK } from "../utlis";

let errorObj = {
  desc: "",
  navigation: true,
  navigationRoute: "",
};

const Home = () => {
  const [person, setperson] = useState("");
  const [loggedIn, setloggedIn] = useState(false);
  const [pageLoading, setpageLoading] = useState(true);
  const [pageStart, setpageStart] = useState(false);
  const [pageError, setpageError] = useState(false);

  const checkPersistent = async () => {
    if (JSON.parse(localStorage.getItem("Freeskout-session")) === null) {
      errorObj.desc = "not logged in";
      errorObj.navigationRoute = "/";
      setpageError(true);
    } else {
      let r = await fetchAuth(`${L_LINK}/validate/persistLogin`);
      console.log(r);
      if (r.issue) {
        errorObj.desc = r.issueDetail;
        errorObj.navigationRoute = "/";
        setpageError(true);
      } else {
        setloggedIn(true);
        setperson(r.output);
      }
    }
  };

  let i = false;

  useEffect(() => {
    if (!i) {
      setpageStart(true);
      checkPersistent();
      setpageLoading(false);
    }
    return () => (i = true);
  }, []);

  return (
    <React.Fragment>
      {pageLoading && <SmallLoading />}
      {pageStart &&
        (loggedIn ? (
          <>
            <Topbar {...person}></Topbar>
            <HomeRoutes {...person} />
          </>
        ) : (
          pageError && <InformationPopUp {...errorObj} />
        ))}
    </React.Fragment>
  );
};

export default Home;

const HomeRoutes = (props) => {
  const arr = [
    {
      path: "/",
      element: <RouteCreationDesign {...props} />,
    },
    {
      path: "/fum",
      element: <FUM />,
    },
    {
      path: "/lm",
      element: <LinkManement />,
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ];

  const element = useRoutes(arr);
  return element;
};
