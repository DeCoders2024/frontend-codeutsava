import React from 'react'
import { Link, useHistory } from 'react-router-dom'

const Sidebar = () => {

  function deleteCookies() {
    var allCookies = document.cookie.split(';');
    for (var i = 0; i < allCookies.length; i++){
      document.cookie = allCookies[i] + "=;expires="
      + new Date(0).toUTCString();
      console.log("deleted");
    }
      
  }

  const history = useHistory();

  return (
    <div style={{ marginRight: "20px", padding: "10px", paddingRight: "45px", borderRight: "0.5px solid white" }}>
      <div style={tab}>
        <Link to="/profile">Profile</Link>
      </div>
      <div style={tab}>
        <Link to="/notes">Notes</Link>
      </div>
      <div style={tab}>
        <div onClick={() => {
          window.location.href = '/Recorder/index.html'
        }}>Recorder</div>
      </div>
      <div
        style={tab}
        onClick={() => {
          deleteCookies();
          history.push("/")
        }}>Logout</div>
    </div>
  )
}

const tab = {
  padding: '10px',
  margin: "10px",
  cursor: 'pointer'
  // border:"1px solid white"
}

export default Sidebar


