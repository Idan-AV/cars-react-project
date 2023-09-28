import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import './ProfilePage.css'; 
import { useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import { IconButton, Stack, TextField } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { useContext } from 'react';
import { SetUserContext, UserContext } from '../context/userContext';
import axios from 'axios';
import { GET_USER_BY_ID } from '../infra/urls';
import { SetNotificationContext } from '../NotificationContext/NotificationContext';

const ProfilePageEdit = ({setEditMode,setEmail,email,user,setPhoneNumber}) => {
    const user1 = useContext(UserContext)
    const setNotification = useContext(SetNotificationContext)
    const setUser = useContext(SetUserContext)
    const [tempPhone, setTempPhone] = useState( user1.user?.profile.phone_number)
    const [tempEmail, setTempEmail] = useState(user1.user?.email)
    console.log(user1.user.id)
    const handleSave = async ()=>{
      try{
      const changes = {
        email:user1.user.email,
        profile:{
          phone_number:user1.user?.profile.phone_number
        }
      }
        setEmail(tempEmail)
        setPhoneNumber(tempPhone)
        if(tempPhone!==user1.user?.profile.phone_number ){
          changes.profile.phone_number = tempPhone
        }
        if(tempEmail!==user1.user?.email ){
          changes.email = tempEmail
        }

        const respose = await axios.patch(`${GET_USER_BY_ID}${user1.user.id}`,changes)
        console.log(respose.data)
        const responseGet = await axios.get(`${GET_USER_BY_ID}${user1.user.id}`) 
          setUser({
        user: {...responseGet.data}
    })
    setNotification({open:true,
      msg:'your changes has been saved',severity:'success'})
        setEditMode(false)
      }
      catch (e){
        setNotification({open:true,
          msg:e.respose.data,severity:'error'})

      }
    }
    const handleCancel = ()=>{
      setEditMode(false)
    
    }


  return (
        <>
          <section className="vh-100" style={{maxWidth:'50em',margin:'auto'}}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="6" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">
                <MDBCol md="4" className="gradient-custom text-center text-white"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                  <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />
                  <MDBTypography tag="h5">Marie Horwitz</MDBTypography>
                  <MDBCardText>Web Designer</MDBCardText>
                  <MDBIcon far icon="edit mb-5" />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h2">Information</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h4">Email</MDBTypography>
                        <TextField 
                        value={tempEmail}
                        onChange={(e)=>{setTempEmail(e.target.value)}}
                        label="Email" variant="standard" />
                        {/* <MDBCardText className="text-muted">info@example.com</MDBCardText> */}
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h4">Phone:</MDBTypography>
                        <TextField 
                        value={tempPhone}
                        onChange={(e)=>{setTempPhone(e.target.value)}}
                        label="Phone Number" variant="standard" />
                        {/* <MDBCardText className="text-muted">123 456 789</MDBCardText> */}
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <Stack direction={'row'}>
      <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleSave}
              color="inherit"
            >
              <SaveIcon/>
            </IconButton>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleCancel}
              color="inherit"
            >
              <CancelIcon/>
            </IconButton>

      </Stack>      
    </section>
    

        </>
  )
}

export default ProfilePageEdit