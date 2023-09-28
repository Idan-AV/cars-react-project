import React, { useContext } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import './ProfilePage.css'; 
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import ProfilePageView from './ProfilePageView';
import ProfilePageEdit from './ProfilePageEdit';
import { UserContext } from '../context/userContext';
export default function ProfilePage() {
  const user = useContext(UserContext)
  const [editMode, setEditMode] = useState(false)
  const [email, setEmail] = useState('')
  // const [phoneNumber, setPhoneNumber] = useState(user.user?.profile.phone_number)
  const [phoneNumber, setPhoneNumber] = useState(null)

  // console.log('email',email)
  // console.log('number',phoneNumber)
  // ask valeria if I should write here a function that updates the changes 
  // and pass it to the edit component  

  console.log('phone number',phoneNumber)
// user.user?.profile.phone_number
  return (
    <>
    {editMode?
    <ProfilePageEdit setEmail={setEmail}  user={user}
     setEditMode={setEditMode} setPhoneNumber={setPhoneNumber}/>
  :
  <ProfilePageView 
    phoneNumber={user.user?.profile.phone_number} 
    email={user.user?.email}
    setEditMode={setEditMode}/>
}
    </>
   
  );
}