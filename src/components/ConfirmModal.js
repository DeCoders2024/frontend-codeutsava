import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ContextMain from '../context/ContextMain';

export default function BasicModal() {
    const context=React.useContext(ContextMain)

  return (
    <div>
      <Modal
        open={context.getConfirmModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
                {context.getConfirmModal.title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {context.getConfirmModal.msg}
          </Typography>
        <div>
            <button onClick={context.getConfirmModal.onClick}>YES</button>
            <button onClick={()=>context.setConfirmModal(false)}>Cancel</button>
        </div>
        </Box>
      </Modal>
    </div>
  );
}