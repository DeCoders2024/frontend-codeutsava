import logo from './logo.svg';
import "./App.css"
import { Switch, Route, Routes, Redirect } from 'react-router-dom'
import Home from "./pages/Home"
import MyNotes from "./pages/MyNotes"
import Shared from "./pages/Shared"
import TaskM from "./pages/TaskM"
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import Note from './components/Note';

function App() {
  let token = (document.cookie).split(';').find((x) => x.includes('token')).slice(7);
  // console.log({token});
  return (
    <div className='App'>
      {/* <Navbar/> */}
      <Switch>
        <Route exact path="/">
          <Navbar />
          {token ? <Home /> : <Redirect to='/login' />}
        </Route>
        <Route exact path="/notes">
          <>
            <Navbar />
            <MyNotes />
          </>
        </Route>
        <Route exact path="/login">
          {token ? <Redirect to='/' /> : <Login />}
        </Route>
        <Route exact path="/signup">
          {token ? <Redirect to='/' /> : <Signup />}
        </Route>
        <Route exact path="/notes/:noteid">
          <>
            <Navbar />
            <Note />
          </>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
