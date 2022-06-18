import React, { createContext, useEffect, useReducer, useState } from "react";
import { Route, Routes, useNavigate } from "react-router";
import Redir from "../redirection";
import RouteCreationDesign from "./layout";

// const initialState = {
//   value: "Hello World!!!",
//   value1: "",
// };

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

  return (
    <Routes>
      <Route
        path="/"
        element={
          Data.length ? (
            <div>
              <RouteCreationDesign {...Data} />
            </div>
          ) : (
            <h1>Loading....</h1>
          )
        }
      />
      {Data.length &&
        Data.map((item, index) => {
          return (
            <Route
              key={index}
              path={item.path}
              // element={<h1>Success {item.path}</h1>}
              element={<Redir />}
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
