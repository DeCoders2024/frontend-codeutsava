import logo from './logo.svg';
import "./App.css"
import { Switch, Route, Routes } from 'react-router-dom'
import Home from "./pages/Home"
import MyNotes from "./pages/MyNotes"
import Shared from "./pages/Shared"
import TaskM from "./pages/TaskM"
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className='App'>
      <Navbar/>
      <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/notes">
            <MyNotes />
          </Route>
          {/* <Route exact path="/recorder">
            <Recorder/>
          </Route> */}
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
      </Switch>
    </div>
  );
}

export default App;
