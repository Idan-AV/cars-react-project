import { Button, Divider, IconButton, ListItem, ListItemButton, ListItemText, Stack } from '@mui/material'
import React from 'react'
import CarPicture from '../CarPicture/CarPicture'
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { useState } from 'react';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import axios from 'axios';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { CAR_BY_ID, DELETE_SAVED_CARS, GET_SAVED_CARS_IDS_FOR_USER, SAVED_CARS } from '../infra/urls';
import { UserContext } from '../context/userContext';
import { RefreshSavedCarsContext } from '../SavedCarsContext/SavedCarsContext';
import { FetchDataCarsContext } from '../CarsFunctionContext';
import { SetNotificationContext } from '../NotificationContext/NotificationContext';
const CarItem = ({car}) => {
  const navigate = useNavigate() 
  const setNotification = useContext(SetNotificationContext)
  const fechData = useContext(FetchDataCarsContext)
  const [isSaved,setIsSaved] = useState(false)
  const user = useContext(UserContext)
  const RefreshSavedCarsFunction  = useContext(RefreshSavedCarsContext)
  const [isDisabled , setIsDisabled] = useState(false)
  console.log(car)
  const handleClickAdd = async ()=>{
    try{

    
    const responseIds = await axios.get(GET_SAVED_CARS_IDS_FOR_USER)
    if (!responseIds.data.includes(car.id)){
      console.log('user:',user.user.id)
      const responsePost = await axios.post(SAVED_CARS,{car:car.id,user:user.user.id})
      console.log('post' , responsePost)
      await RefreshSavedCarsFunction ()
      fechData()
      setNotification({open:true,
        msg:'the car has been saved',severity:'success'})
    }
    else{
      setNotification({open:true,
        msg:'It seems like this car already saved',severity:'error'})
        setIsDisabled(true)

    }}
    catch (e){
      setNotification({open:true,
        msg:e.response.data,
        severity:'error'})

    }
  }
    
  const handleClickRemove = async ()=>{
    // send delete request
    try{
    const deleteResponse = await axios.delete(`${DELETE_SAVED_CARS}${car.id}`)
    await RefreshSavedCarsFunction()
    fechData()
    setNotification({open:true,
      msg:'the car has been removed from the saved cars',severity:'success'})
  }
    catch(e){
      console.log(e)
      setNotification({open:true,
        msg:e.response.data,severity:'error'})
    }

  }
  const handleDeleteCar = async ()=>{
    try{
    const deleteResponse = await axios.delete(`${CAR_BY_ID}/${car.id}`)
    fechData()
    setNotification({open:true,
      msg:'the car has been deleted ',severity:'success'})

    }
    catch (e){
      setNotification({open:true,
        msg:e.response.data,severity:'error'})
    }


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
    {'is_saved' in car &&
    <>
    {user?.user&&
    <>
    {!car.is_saved?
    <IconButton disabled={isDisabled} onClick={handleClickAdd}>
      <BookmarkAddIcon/>
    </IconButton>:
    <IconButton onClick={handleClickRemove} >
      <BookmarkRemoveIcon/>
    </IconButton>}
    </>
}
</>
}

    {car.user===user?.user?.id &&'is_saved' in car &&
    <IconButton onClick={handleDeleteCar}>
      <DeleteTwoToneIcon/>
    </IconButton>}
  </ListItem>
  <Divider sx={{maxWidth:'50em' , margin:'auto'}} light />
  </>
  )
}

export default CarItem