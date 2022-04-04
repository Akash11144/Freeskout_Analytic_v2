import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Redir from "./components/redirection";
import LogIn from "./components/login";
import Dash from "./components/dashboard";
import Trial from "./components/trial";
import GraphDashboard from "./components/graph-dashboard";
import { postR } from "./components/utlis";

function App() {
  const handleLogin = async () => {
    let un = document.getElementsByTagName("input")[0];
    let pass = document.getElementsByTagName("input")[1];
    let localLink = "http://localhost:8000";
    let mainLink = "https://freeskout-analytic-v2-backend.herokuapp.com";
    let route = "/user/login";
    let route1 = "/user/c";
    let data = { name: un.value, password: pass.value };
    let r = await postR(localLink, route, data);
    console.log(r);
    if (r.allowed) {
      localStorage.setItem(
        "Freeskout-session",
        JSON.stringify({ name: un.value, token: r.ares })
      );
      window.open("http://localhost:3000/gda", "_self");
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
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/rd" element={<Redir></Redir>}></Route>
          <Route path="/lg" element={<LogIn></LogIn>}></Route>
          <Route path="/da" element={<Dash></Dash>}></Route>
          <Route path="/tr" element={<Trial></Trial>}></Route>
          <Route
            path="/gda"
            element={<GraphDashboard></GraphDashboard>}
          ></Route>
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
                    <div class="mb-3">
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
                    <div class="mb-3">
                      <label for="exampleInputPassword1" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                      />
                    </div>
                    {/* <div className="mb-3 form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1"
                      />
                      <label className="form-check-label" for="exampleCheck1">
                        Check me out
                      </label>
                    </div> */}
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
      </BrowserRouter>
    </div>
  );
}

export default App;
