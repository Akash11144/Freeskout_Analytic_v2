import { BrowserRouter } from "react-router-dom";
import "./App.css";
import MainRoutes from "./components/login";

// ---
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
