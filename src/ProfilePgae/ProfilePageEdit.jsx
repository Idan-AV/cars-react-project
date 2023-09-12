import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import './ProfilePage.css'; 
import { useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import { IconButton, Stack, TextField } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

const ProfilePageEdit = ({setEditMode,setEmail,email,phoneNumber,setPhoneNumber}) => {
    const [tempPhone, setTempPhone] = useState(phoneNumber)
    const [tempEmail, setTempEmail] = useState(email)


    const handleSave = ()=>{
        setEmail(tempEmail)
        setPhoneNumber(tempPhone)
        setEditMode(false)
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