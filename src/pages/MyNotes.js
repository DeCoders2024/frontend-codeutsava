import React from 'react'
import BreadCrumb from '../components/BreadCrumb';
import NoteCard from '../components/NoteCard';
import Sidebar from '../components/Sidebar';

const MyNotes = () => {
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
            {arr.map(() => {
              return <NoteCard id='hi'/>;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default MyNotes