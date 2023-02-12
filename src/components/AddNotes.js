import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {TextField} from "@material-ui/core"
import ContextMain from '../context/ContextMain';

export default function BasicModal() {
    const context=React.useContext(ContextMain)
    const [getLabel,setLabel]=useState("")
    const [getLabelDisappear,setLabelDisappear]=useState(-1)
    const [getLabelContent,setLabelContent]=useState("")
    const handleClick=async()=>{
        if(getLabel==""){
            context.Alert("Enter Label Name","waring")
            return
        }
        context.addNote(getLabel,getLabelContent,getLabelDisappear);
    }
  return (
    <div>
      <Modal
        open={context.getNoteCreateOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
                Add Note
          </Typography>
          <div>
                <TextField onChange={(e)=>{setLabel(e.currentTarget.value)}} variant='outlined' label="Note Title" type={"text"} fullWidth/>
          </div>
          <div>
                <TextField onChange={(e)=>{setLabelContent(e.currentTarget.value)}} variant='outlined' multiline={true} maxRows={5} label="Note Containt" type={"text"} fullWidth/>
          </div>
          {/* <div>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={-1}
                  label="Dis appear"
                  onChange={(e)=>{setLabelDisappear(e.target.value)}}
                >
                  <MenuItem value={1}>1 Hour</MenuItem>
                  <MenuItem value={2}>2 Hour</MenuItem>
                  <MenuItem value={5}>5 Hour</MenuItem>
                  <MenuItem value={12}>12 Hour</MenuItem>
                  <MenuItem value={24}>24 Hour</MenuItem>
                  <MenuItem value={-1}>Never</MenuItem>
                </Select>
            </FormControl>

          </div> */}
        <div>
            <button onClick={handleClick}>
                Add Label
            </button>
        </div>
        </Box>
      </Modal>
    </div>
  );
}