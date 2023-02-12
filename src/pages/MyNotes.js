import React from 'react'
import NoteCard from '../components/NoteCard';
import Sidebar from '../components/Sidebar';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Button, Link, Typography } from '@material-ui/core';

const MyNotes = () => {
  let arr = [2, 3, 4, 4, 2, 2, 3, 4, 4, 2, 2, 3, 4, 4, 2];
  return (
    <>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div>
          <div>
            <Button 
            style={{border:"1px solid #ff2d60",color:'white',marginTop:'10px'}}
            >
              + Add
            </Button>
          </div>
          <div
          className='my-3'
          ><Breadcrumbs aria-label="breadcrumb" style={{color:'white'}}>
            <Link underline="hover" color="inherit" href="/">
              root
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href="/material-ui/getting-started/installation/"
            >
              decoders
            </Link>
            <Typography color="text.primary">Breadcrumbs</Typography>
          </Breadcrumbs>
          </div>
          <div className="notes-body my-5" style={{
            overflow: "auto",
          }}>
            {arr.map(() => {
              return <NoteCard />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default MyNotes