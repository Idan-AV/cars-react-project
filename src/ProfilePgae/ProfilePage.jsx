import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import './ProfilePage.css'; 
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import ProfilePageView from './ProfilePageView';
import ProfilePageEdit from './ProfilePageEdit';
export default function ProfilePage() {
  const [editMode, setEditMode] = useState(false)
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  // console.log('email',email)
  // console.log('number',phoneNumber)
  // ask valeria if I should write here a function that updates the changes 
  // and pass it to the edit component  





  return (
    <>
    {editMode?
    <ProfilePageEdit setEmail={setEmail} email={email} phoneNumber={phoneNumber}
     setEditMode={setEditMode} setPhoneNumber={setPhoneNumber}/>
  :
  <ProfilePageView setEditMode={setEditMode}/>
}
    </>
   
  );
}