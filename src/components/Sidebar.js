import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div style={{marginRight:"20px",padding:"10px",paddingRight:"45px",borderRight:"0.5px solid white"}}>
        <div style={tab}>
          <Link to="/profile">Profile</Link>
        </div>
        <div style={tab}>
          <Link to="/notes">Notes</Link>
        </div>
        <div style={tab}>
           <div onClick={()=>{
            window.location.href='/Recorder/index.html'
            }}>Recorder</div>
        </div>
        <div
         style={tab}
         onClick={()=>alert('logout success')}>Logout</div>
    </div>
  )
}

const tab={
  padding:'10px',
  margin:"10px",
  // border:"1px solid white"
}

export default Sidebar


