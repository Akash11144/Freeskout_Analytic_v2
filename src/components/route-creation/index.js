import React, { createContext, useEffect, useReducer, useState } from "react";
import { Route, Routes, useNavigate } from "react-router";
import Redir from "../redirection";
import RouteCreation from "./layout";

const initialState = {
  value: "Hello World!!!",
  value1: "",
};

export const RouteCreation = () => {
  const [Data, setData] = useState("");

  useEffect(() => {
    const getAllRoutes = async () => {
      let r = await fetch("http://localhost:8000/route/allRoutes");
      let r1 = await r.json();
      setData(r1);
    };
    getAllRoutes();
  }, []);

  // const handleSet = (a) => {
  //   console.log("inside main page", a);
  // };

  // const reducer = (state = initialState, action) => {
  //   let { value, value1 } = state;
  //   switch (action.type) {
  //     case "ADD_ROUTE":
  //       value1 = handleSet(action.payload);
  //       break;
  //     case "REMOVE_ROUTE":
  //       value = "";
  //       break;
  //     default:
  //       throw new Error("Not valid type");
  //   }
  //   return { value, value1 };
  // };
  // const [state, dispatch] = useReducer(reducer, initialState);

  return (
    // <ValueContext.Provider value={{ state, dispatch }}>
    <Routes>
      {console.log("inside routes")}
      <Route
        path="/"
        element={
          <div>
            Hello try home
            <RouteCreation></RouteCreation>
          </div>
        }
      />
      {Data.length &&
        Data.map((item, index) => {
          console.log("inside map", item);
          return (
            <Route
              index={index}
              path={item.path}
              // element={<h1>Success {item.path}</h1>}
              element={<Redir></Redir>}
            />
          );
        })}
    </Routes>
    // </ValueContext.Provider>
  );
};

export default RouteCreation;

// export const ValueContext = createContext({
//   state: initialState,
//   dispatch: null,
// });
