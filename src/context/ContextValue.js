import React,{useEffect, useRef, useState} from 'react'
import ContextMain from './ContextMain'
import {deleteRequest, getRequest,postRequest, putRequest, SERVER_URL} from "../api/server"
import EditFolder from '../component/EditFolder';
import Properties from '../component/Properties';
import Cookies from "js-cookie";
import EditProfile from '../component/EditProfile';
import AccessLink from '../component/AccessLink';
export default function ContextValue(props) {
  const [getAlert,setAlert]=useState({status:false,msg:"Server Error...",type:"error"});
  const [loading,setLoading]=useState(false)
  const [getShow,setShow]=useState(false)
  const [getCurrSpace,setCurrSpace]=useState(0)
  const [getRender,setRender]=useState(false)
  const [getShared,setShared]=useState(false)
  const [getCurrentDir,setCurrentDir]=useState([{folder_name:"root:",_id:null,status:2}])
  const [getUser,setUser]=useState({name:"",emailid:"",profile_pic:""})
  const [getFolders,setFolders]=useState([])
  const [getClickFolder,setClickFolder]=useState({folder_logo:"",_id: "",folder_name: "",folder_type:1,folder_access_link:"",folder_extention:"",access_all:false,access_people:[],folder_add_date:"",space:""})
  const [getAnchor,setAnchor]=useState({x:0,y:0})
  const [getCutFolder,setCutFolder]=useState({_id:"",folder_name:""})
  const [getMenuOption,setMenuOptions]=useState([])
  const [open,setOpen]=useState(false)
  const [getConfirmModal,setConfirmModal]=useState({msg:"",title:"",status:false,onClick:()=>{}})
  const [getForward,setForward]=useState([])
  const [getLabelOpen,setLabelOpen]=useState(false);
  const [getNoteCreateOpen,setNoteCreateOpen]=useState(false)
  const uploadFileRef=useRef()
 
  const uploadFolderLogo=useRef()
  const [getDialog,setDialog]=useState({title:"",component:<></>})
  const currentValue={value:-1}
  window.document.addEventListener("click",(e)=>{
    setShow(false);
    currentValue['value']=-1;
  }) 
  const handleContextMenu=(e,value,reverse)=>{
    if(currentValue['value']!==reverse){
      currentValue['value']=value;
    }
      Run(e)
  }
  const Run=(e)=>{
    e.preventDefault()
    var width=window.innerWidth
    var height=window.innerHeight
    var left=e.pageX;
    var top=e.pageY;
    // console.log([[width,left],[height,top]])
    if(left+200>=width){
        left-=(left+200-width)
    }
    if(top+420>=height){
      top-=(top+425-height)
    }
    // console.log(left,top)
    setAnchor({x:left,y:top})
    SetMenuOptions(currentValue['value'])
    setShow(true)
  }
  const OpenFolder=()=>{
    if(getClickFolder.folder_type===1){
      let curr=getCurrentDir;
      curr.push({folder_name:getClickFolder.folder_name,_id:getClickFolder._id});
      setCurrentDir(curr)
      setRender(!getRender)
      setShow(false)
      fetchFolders()
    }
  }
  const editFolder=()=>{
        try{
            if(getShared){
              Alert("Not Allow In Shared Folder")
              return
            }
            setOpen(true)
            setDialog({title:"Edit Folder",component:<EditFolder folder_type={getClickFolder.folder_type} folder_logo={getClickFolder.folder_logo} folder_name={getClickFolder.folder_name}  _id={getClickFolder._id} />})
        }
        catch(e){
            Alert("Server Error...")
        }
  }
  const DeleteFolder=async()=>{
        try{
          if(getShared){
            setLoading(true)
            let res=await getRequest(`folder/r/access/${getClickFolder._id}?state=true`)
            if(res.status){
                Alert("Folder Deleted Successfully","success")
                fetchFolders()
            }
            else{
              Alert(res.error,"error")
            }
            setLoading(false)
            return
          }
            setLoading(true)
            let res=await deleteRequest(`folder/${getClickFolder._id}`)
            setLoading(false)
            if(res.status){
                  Alert(`Folder ${getClickFolder.folder_name} Deleted SuccessFully`,"success")
                  fetchFolders()
                }
            else{
              Alert(res.error,"warning")
            }
        }
        catch(e){
          Alert("Server Error....")
        }
  }
  const PropertiesFolder=()=>{
    try{
      setOpen(true)
      setDialog({title:"Properties",component:<Properties/>})
  }
  catch(e){
      Alert("Server Error...")
  }
  }
  const MoveFolder=()=>{
        try{
          if(getShared){
            Alert("Not Allow In Shared Folder")
            return
          }
            setCutFolder({_id:getClickFolder._id,folder_name:getClickFolder.folder_name})
            setRender(!getRender)
        }
        catch(e){
          Alert("Server Error....")
        }
  }
  const newLabel=async(label_name)=>{
    try{
      if(getShared){
        Alert("Not Allow In Shared Notes")
        return
      }
      setLoading(true)
      let curr=getCurrentDir;
      let _id=curr[curr.length-1]._id;
      let x=String(new Date().valueOf())
      let body={label_name}
      if(_id){
        body['label_parent']=_id;
      }
      let res=await postRequest("label/",body);
      setLoading(false)
      if(res.status){
          Alert(`New Label Created`,"success")
          setRender(!getRender)
          fetchFolders()
      }
      else{
        Alert(res.error,"warning")
      }
  }
  catch(e){
    Alert("Server Error...","error")
  }
  }
  const addNote=async(label_name,label_content,label_disappear)=>{
    if(getShared){
      Alert("Not Allow In Shared")
      return
    }
    else{
      setLoading(true)
      let curr=getCurrentDir;
      let _id=curr[curr.length-1]._id;
      let body={label_name,label_content,label_disappear}
      if(_id){
        body['label_parent']=_id;
      }
      let res=await postRequest("note/",body);
      setLoading(false)
      if(res.status){
          Alert(`New Note Created`,"success")
          setRender(!getRender)
          fetchFolders()
      }
      else{
        Alert(res.error,"warning")
      }
    }
  }
  const MovePrev=()=>{
    let curr=getCurrentDir;
    if(curr[curr.length-1]._id!==null){
      curr.pop()
    setCurrentDir(curr)
    setRender(!getRender)
    fetchFolders()
  }
  }
  const MoveNext=()=>{
      let obj=getForward;
      if(obj.length!==0){
      setCurrentDir(obj[obj.length-1]);
      obj.pop()
      setForward(obj)
      let path=obj[obj.length-1]
      path=(path.map((item)=>item.folder_name)).join("/")
      fetchFolders(path)
      }
  }
  const reloadPage=()=>{
    fetchFolders()
  }
  const logout=async()=>{
        try{

           setLoading(true)
            let res=await getRequest("user/logout");
            setLoading(false)
            if(res.status){
                Cookies.remove("token")
                window.location.href="/login"
            }
            else{
              Alert(res.error)
            }
        }
        catch(e){
          Alert("Server Error...")
        }
  }
  const getAccessLink=()=>{
      try{
        if(getShared){
          Alert("Not Allow In Shared Folder")
          return
        }
        setOpen(true)
        setDialog({title:"Get Link",component:<AccessLink/>})
      }
      catch(e){
        Alert("Server Error....")
      }
  }
  const downloadFolder=()=>{
    window.open(`${SERVER_URL}/download/${getClickFolder.folder_type}/${getClickFolder.folder_access_link}`,"_blank")
  }
  const pasteFolder=async()=>{
      try{
        if(getShared){
          Alert("Not Allow In Shared Folder")
          return
        }
          if(getCutFolder._id!==""){

            let curr=getCurrentDir;
            let _id=curr[curr.length-1]._id;
            let body={}
            if(_id){
                body["folder_parent"]=_id
            }
            else{
              body["folder_parent"]="null"
            }
            setLoading(true)
            let res=await putRequest(`folder/${getCutFolder._id}`,body)
            setLoading(false)
            if(res.status){
                Alert(`Folder ${getCutFolder.folder_name} Move Successfully`,"success")
                fetchFolders();
            }
            else{
              Alert(res.error,"warning")
            }
          }
      }
      catch(e){
        Alert("Server Error...")
      }
      setCutFolder({_id:"",folder_name:""})
  }
  const SetMenuOptions=(status)=>{
      if(status===1){
        let obj=[]
        if(!getShared){
         obj=[{"name":"Edit","action":editFolder},
        
        {"name":"Cut","action":MoveFolder},
        {"name":"Get Link","action":getAccessLink},
        {"name":"Edit Logo","action":EditFolderLogo}]}
          var options=[
            {"name":"Open","action":OpenFolder},
            ...obj,
            {"name":"Delete","action":DeleteFolder},
            {"name":"Download","action":downloadFolder},
            {"name":"Properties","action":PropertiesFolder},
          ]
      }
      else{
        let obj=[]
        if(!getShared){
         obj=[{"name":"New Folder","action":newLabel},
         {"name":"Upload File","action":uploadFile},
         {"name":"Paste","action":pasteFolder}]}
        var options=[
          ...obj,
          // {"name":"Cmd","action":openCmd},
          {"name":"Previous","action":MovePrev},
          // {"name":"Next","action":MoveNext},
          {"name":"Reload","action":reloadPage},
          {"name":"Edit Profile","action":editProfile},
          {"name":"Logout","action":logout},
        ]
      }
      setMenuOptions(options)
      setRender(!getRender)
  }
  const editProfile=()=>{
    try{
      setOpen(true)
      setDialog({title:"Edit Profile",component:<EditProfile/>})
  }
  catch(e){
      Alert("Server Error...")
  }
  }

  const EditFolderLogo=()=>{
    if(getShared){
      Alert("Not Allow In Shared Folder")
      return
    }
        uploadFolderLogo.current.click()
  }
  const Alert=(msg,type="error")=>{
      setAlert({msg,type,status:true})
      setTimeout(()=>{
        setAlert({msg,type,status:false})
      },3000)
  }

  const fetchFolders=async(path)=>{
      try{
    
        if(getShared){
          path=`folder/other/path?path=${((path?path:getCurrentDir).map((item)=>item.folder_name)).join("/")}`
          if(getCurrentDir.length!==1){
            path+=`&id=${getCurrentDir[1]._id}`
          }
        }
        else{
          path=`folder/path?path=${((path?path:getCurrentDir).map((item)=>item.folder_name)).join("/")}`
        }
        setLoading(true)
          let res=await getRequest(path)
          setLoading(false)
          if(!res.status && Cookies.get("token")){
            Alert(res.error,"warning");
          }
          if(res.folders && res.dirs){
            setFolders(res.folders)
            setCurrentDir(res.dirs)
            let total_size=0;
            for(let val of res.folders){
              total_size+=parseFloat(val.space);
            }
            setCurrSpace(total_size)
          }
            
      }
      catch(e){
        console.log(e)
          Alert("Server Error...","error")
      }
  }

  const getUserData=async()=>{
      try{
          let res=await getRequest("user/")
          if(res.status){
              let link=String(window.location.href)
              if(link.endsWith("login") || link.endsWith("signup")){
                window.location.href="/"
              }
              setUser(res.user)
          }
          else{
            if(Cookies.get("token")){
              Cookies.remove("token")
              Alert("Session Expire..","error");
            }
            let link=String(window.location.href)
              if (!(link.endsWith("login") || link.endsWith("signup"))){
                window.location.href="/login"
              }
                // window.location.href="/"
          }
      }
      catch(e){
          Alert("Server Error...")
      }
  }
  useEffect(()=>{
    fetchFolders()
    // eslint-disable-next-line
  },[getUser,getShared])
  useEffect(()=>{
      getUserData()
  },[])
  return (
    <ContextMain.Provider value={{addNote,getNoteCreateOpen,setNoteCreateOpen,getLabelOpen,setLabelOpen,getConfirmModal,setConfirmModal,getShared,getCurrSpace,setShared,editProfile,uploadFile,uploadFolderLogo,getCutFolder,uploadFileRef,open,setOpen,getDialog,setDialog,OpenFolder,getClickFolder,setClickFolder,logout,handleContextMenu,getAnchor,setAnchor,getMenuOption,SetMenuOptions,fetchFolders,getRender,setRender,setShow,getShow,getFolders,setFolders,getAlert,getCurrentDir,setCurrentDir,Alert,loading,setLoading,getUserData,getUser,MoveNext,MovePrev,reloadPage,newLabel,editFolder,getForward,setForward}}>
        {props.children} 
    </ContextMain.Provider>
  )
}
