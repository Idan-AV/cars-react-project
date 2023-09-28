import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { UserContext } from '../context/userContext';
import { Stack } from '@mui/material';
import { useEffect } from 'react';
import axios from 'axios';
import { GET_USER_BY_ID } from '../infra/urls';
import { useState } from 'react';
// setUser({
//         user: {...meResponse.data}
//     })

export default function ContactDialog({open,setOpen,car}) {
  const user = React.useContext(UserContext)
  const [carOwner, setCarOwner] = useState({
    owner: null})

  useEffect(()=>{
    const fetchData = async()=>{
      const respose = await axios.get(`${GET_USER_BY_ID}${car.user}`)
      setCarOwner({
        owner: {...respose.data}
            })
            console.log('respose:', respose.data)
    }
      fetchData()
  },
  []
  )



  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>contact:</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Stack direction={'column'} gap={'0.5em'}>
            <p>{`name:  ${carOwner.owner?.first_name} || last name:  ${carOwner.owner?.last_name}`}</p>
            <p>{`phone number:  ${carOwner.owner?.profile?.phone_number}`}</p>
            <p>{`address:  ${carOwner.owner?.profile?.address}`}</p>
            </Stack>
          </DialogContentText>
          <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: 'fit-content',
            }}
          >
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}