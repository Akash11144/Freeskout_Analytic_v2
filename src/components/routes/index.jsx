import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Dash from "../dashboard";
import GraphDashboard from "../graph-dashboard";
import LogIn from "../login";
import Redir from "../redirection";
import Trial from "../trial";
import { postR } from "../utlis";

let localLink = "http://localhost:8000";
// let mainLink = "https://freeskout-analytic-v2-backend.herokuapp.com";
let route = "/user/login";
// let route1 = "/user/c";
let route2 = "/user/persistLogin";

const MainRoutes = () => {
  const navi = useNavigate();
  useEffect(() => {
    let t = JSON.parse(localStorage.getItem("Freeskout-session"));
    if (t !== null) navi("/gda");
  }, []);

  const handleLogin = async () => {
    let un = document.getElementsByTagName("input")[0];
    let pass = document.getElementsByTagName("input")[1];
    let data = { name: un.value, password: pass.value };
    let r = await postR(localLink, route, data, "");
    console.log(r);
    if (r.allowed) {
      localStorage.setItem("Freeskout-session", JSON.stringify(r.ares));
      navi("/gda");
      return;
    }
    if (r.ares === "user not available") {
      alert("user not available");
      un.value = "";
      pass.value = "";
      return;
    }
    if (r.ares === "password not match") {
      alert("password not match");
      pass.value = "";
      return;
    }
  };

  return (
    <Routes>
      <Route path="/rd" element={<Redir></Redir>}></Route>
      <Route path="/lg" element={<LogIn></LogIn>}></Route>
      <Route path="/da" element={<Dash></Dash>}></Route>
      <Route path="/tr" element={<Trial></Trial>}></Route>
      <Route path="/gda" element={<GraphDashboard></GraphDashboard>}></Route>
      <Route
        path="/"
        element={
          <div className="container mx-auto">
            <h1>Hello Home</h1>
            <Link className="btn btn-outline-warning btn-lg m-1" to="/rd">
              Freeskout
            </Link>
            <Link className="btn btn-outline-info btn-lg m-1" to="/da">
              user dashboard
            </Link>
            <Link className="btn btn-outline-primary btn-lg m-1" to="/gda">
              Graph dashboard
            </Link>
            <div className="homeFormCont">
              <form>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                  <div id="emailHelp" className="form-text">
                    We'll never share your email with anyone else.
                  </div>
                </div>
                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogin();
                  }}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        }
      ></Route>
    </Routes>
  );
};

export default MainRoutes;
