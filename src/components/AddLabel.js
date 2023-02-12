import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {TextField} from "@material-ui/core"
import ContextMain from '../context/ContextMain';

export default function BasicModal() {
    const context=React.useContext(ContextMain)
    const [getLabel,setLabel]=useState("")
    const handleClick=async()=>{
        if(getLabel==""){
            context.Alert("Enter Label Name","waring")
            return
        }
        context.newLabel(getLabel);
    }
  return (
    <div>
      <Modal
        open={context.getLabelOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
                Add Label
          </Typography>
          <div>
                <TextField onChange={(e)=>{setLabel(e.currentTarget.value)}} variant='outlined' label="Label Name" type={"text"} fullWidth/>
          </div>
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