import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Redir from './components/redirection';
import LogIn from './components/login'


function App() {
  return (
    <div className="App">
      hello home
      <BrowserRouter>
          <Routes>
            <Route path='/rd' element={<Redir></Redir>} ></Route>
            <Route path='/lg' element={<LogIn></LogIn>} ></Route>
          </Routes>
          <div>
            <Link to='/rd' >Freeskout</Link>
          </div>
          <div>
            <Link to='/lg' >Log in</Link>
          </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
