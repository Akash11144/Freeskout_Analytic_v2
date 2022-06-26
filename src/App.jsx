import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import MainRoutes from "./components/login/routes";

// ---
function App() {
  return (
    <div className="App">
      <Router>
        <MainRoutes />
      </Router>
    </div>
  );
}

export default App;
