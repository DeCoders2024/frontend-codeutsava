import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Cookies from "js-cookie";

const UploadFile = () => {
    const [name,setName]=useState('');
    const [file,setFile]=useState();
    const handleUpload=()=>
    {
        const fd=new FormData();
        fd.append('fileName',name);
        fd.append('file',file)
        fetch("http://localhost:8000/upload",{
            method:"POST",
            headers:{
                'Content-Type':"multipart/form-data",
                "token":Cookies.get("token")
            },
            body:fd
        }).then((res)=>console.log(res));
    }
  return (
    <>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div> 
            
            <br/>
            <input type='text'
            style={{color:'black'}}
             onChange={(e)=>setName(e.currentTarget.value)}/>
            <br/>
            <input type='file' onChange={(e)=>setFile(e.currentTarget.files[0])}/>
            <br/>
            <button onClick={handleUpload}>
                upload-file
            </button>
        </div>
        </div>
    </>
  )
}

export default UploadFile