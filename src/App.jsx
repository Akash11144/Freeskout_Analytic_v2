import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import Redir from "./components/redirection";
import LogIn from "./components/login";
import Dash from "./components/dashboard";
import Trial from './components/trial'
import GraphDashboard from "./components/graph-dashboard";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/rd" element={<Redir></Redir>}></Route>
          <Route path="/lg" element={<LogIn></LogIn>}></Route>
          <Route path="/da" element={<Dash></Dash>}></Route>
          <Route path="/tr" element={<Trial></Trial>}></Route>
          <Route path="/gda" element={<GraphDashboard></GraphDashboard>}></Route>
          <Route
            path="/"
            element={
              <div>
                <h1>Hello Home</h1>
                <div>
                  <Link to="/rd">Freeskout</Link>
                </div>
                <div>
                  <Link to="/lg">Log in</Link>
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
