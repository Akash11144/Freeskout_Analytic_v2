import { HashRouter } from "react-router-dom";
import "./App.css";
import MainRoutes from "./components/login";

// ---
function App() {
  return (
    <div className="App">
      <HashRouter>
        <MainRoutes />
      </HashRouter>
    </div>
  );
}

export default App;
