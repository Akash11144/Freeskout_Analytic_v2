import { BrowserRouter } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MainRoutes from "./components/routes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MainRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
