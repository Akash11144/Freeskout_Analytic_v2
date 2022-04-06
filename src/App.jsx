import { BrowserRouter } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MainRoutes from "./components/routes";
import { motion } from "framer-motion";

function App() {
  return (
    <motion.div
      className="App"
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      // exit={{ opacity: 0 }}
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth }}
    >
      <BrowserRouter>
        <MainRoutes />
      </BrowserRouter>
    </motion.div>
  );
}

export default App;
