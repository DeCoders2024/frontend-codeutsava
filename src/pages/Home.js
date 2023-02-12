import { Button } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar';
import "../css/notes.css"

const Home = () => {
  const history = useHistory()
  return (<>
    <div style={{ padding: "10px" }}>
      <div className="container" >
        <p>
          Hey there, if you are looking for a well organized way to store and share your notes then you landed the right place, take the first step by clicking on get started.
        </p>
        <Button variant="contained" style={{ background: "#ff2d60", color: 'white', marginBottom: '10px', marginTop: '10px' }}
          onClick={() => history.push('/notes')}
        >Get Started</Button>
      </div>
      <div style={{padding:"10px",position:'realtive'}}>
        <h3>Features</h3>
          {/* <img 
          className='section-1-img h-[420px]'
          style={{position:'absolute'}}
          src='https://images.unsplash.com/photo-1667946702353-5af3b5a51bc1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80'/> */}
      </div>
      <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <Card title={"Maintainable"} desc={"Maintain proper folder structure on cloud without any hassle"} />
        <Card title={"Safely Shareable"} desc={"Share with full privacy"} />
        <Card title={"Task Gamification"} desc={"This feature is under development and this will be aided by high end technology like AI and ML to give motivations and improve task correction"} />
      </div>
    </div>

  </>
  )
}

const Card = ({ title, desc }) => {
  return (<div className="card">
    <div className="head">{title}</div>
    <div className="card-show">
      {desc}
    </div>
    <div></div>
  </div>)
}

export default Home

