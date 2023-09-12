import { Button, Divider, IconButton, ListItem, ListItemButton, ListItemText, Stack } from '@mui/material'
import React from 'react'
import CarPicture from '../CarPicture/CarPicture'
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { useState } from 'react';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import axios from 'axios';
import { DELETE_SAVED_CARS, SAVED_CARS } from '../infra/urls';
import { UserContext } from '../context/userContext';
import EditIcon from '@mui/icons-material/Edit';
import { RefreshSavedCarsContext } from '../SavedCarsContext/SavedCarsContext';
const CarItem = ({car}) => {
  const navigate = useNavigate() 
  const [isSaved,setIsSaved] = useState(false)
  const user = useContext(UserContext)
  const RefreshSavedCarsFunction  = useContext(RefreshSavedCarsContext)
  
  const handleClickAdd = async ()=>{
    console.log('user:',user.user.id)
    const responsePost = await axios.post(SAVED_CARS,{car:car.id,user:user.user.id})
    console.log('post' , responsePost)
    await RefreshSavedCarsFunction ()
    setIsSaved(true)

    

    
    
  }
    
  const handleClickRemove = async ()=>{
    // send delete request
    const deleteResponse = await axios.delete(`${DELETE_SAVED_CARS}${car.id}`)
    RefreshSavedCarsFunction()
    setIsSaved(false)

  }

  return (
    <>
    <ListItem sx={{maxWidth:'50em',margin:'auto'}} disablePadding>
    <ListItemButton onClick={()=>{navigate(`/cars/${car.id}`)}}>
    <CarPicture size={'7em'} url={car.pic_url}/>
      {/* ask valeria about the design */}
      <ListItemText  primary={
        <Stack marginLeft={'1em'}>
        <h5>{` company:${car.company_name}| model:${car.model_name} | year: ${car.year_of_manufacture}`}</h5>
        <h5>{`price:${car.price}`}</h5>
        </Stack>

      } />
    </ListItemButton>
    {!isSaved?
    <IconButton onClick={handleClickAdd}>
      <BookmarkAddIcon/>
    </IconButton>:
    <IconButton onClick={handleClickRemove} >
      <BookmarkRemoveIcon/>
    </IconButton>}
    {car.user==user?.user?.id &&
    <IconButton>
    <EditIcon/>
  </IconButton>}
  </ListItem>
  <Divider sx={{maxWidth:'50em' , margin:'auto'}} light />
  </>
  )
}

export default CarItem