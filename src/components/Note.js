import React from 'react'
import { useParams } from 'react-router-dom';
import BreadCrumb from '../components/BreadCrumb';
import NoteCard from '../components/NoteCard';
import Sidebar from '../components/Sidebar';

const Note = () => {
const param=useParams();
  let arr = [2, 3, 4, 4, 2, 2, 3, 4, 4, 2, 2, 3, 4, 4, 2];
  return (
    <>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div>          
          <BreadCrumb/>
          <div className="notes-body my-5" style={{
            overflow: "auto",
          }}>
            ....
          </div>
        </div>
      </div>
    </>
  );
}

export default Note