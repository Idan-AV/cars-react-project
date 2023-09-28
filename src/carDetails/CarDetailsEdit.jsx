import { Button, CardMedia, Divider, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material'
import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import CarPicture from '../CarPicture/CarPicture'
import { CAR_BY_ID, COMPANIES_NAMES_LIST, IMAGES_URL_FOR_CAR } from '../infra/urls'
import './CarDetails.css'
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery'
import CircleProgress from '../CircleProgress/CircleProgress'
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { SetNotificationContext } from '../NotificationContext/NotificationContext'
const CarDetailsEdit = ({setEditMode,setYear,setModel,
   setMileage,
  setPrice,
 setDescription,
   setOwnersNum,
   setColor,
   setEngineCapacity,
  setSeatsNum,
   setCondition,
  setTransmission,car}) => {
    const setNotification = useContext(SetNotificationContext)
    const [tempYear, setTempYear] = useState(car.year_of_manufacture)
    const [tempModel , setTempModel] = useState(car.model_name)
    const [tempMileage , setTempMileage] = useState(car.mileage)
    const [tempPrice , setTempPrice] = useState(car.price)
    const [tempDescription , setTempDescription] = useState(car.description)
    const [tempOwnerNum , setTempOwnerNum] = useState(car.number_of_past_owners)
    const [tempColor, setTempColor] = useState(car.color)
    const [tempEngineCapacity, setTempEngineCapacity] = useState(car.engine_capacity)
    const [tempSeatsNum, setTempSeatsNum] = useState(car.number_of_seats)
    const [tempCondition , setTempCondition] = useState(car.car_condition)
    const [tempTransmission , setTempTransmission] = useState(car.transmission)
    // const {carId} = useParams()
    // const [isLoaded,setIsLoaded] = useState(true)
    // const [car, setCar] = useState({})
    const [images,setImages] = useState([])
    // useEffect(()=>{
    //     const fetchData=async()=>{
    //       // setIsLoaded(true)
    //         const response =  await axios.get(`${CAR_BY_ID}/${carId}`)
    //         const imageResponse = await axios.get(`${IMAGES_URL_FOR_CAR}${carId}`)
    //         // setCar(response.data)
    //         console.log(imageResponse.data)
    //         setImages(imageResponse.data)
    //         setIsLoaded(false)
    //     }
    //     fetchData()
    // },[carId]
    // )

    const handleSave = async ()=>{
      try{
      const updatedDetails = {};
      if (tempYear !== car.year_of_manufacture) {
        updatedDetails.year_of_manufacture = tempYear;
      }
      if (tempModel !== car.model_name) {
        updatedDetails.model_name = tempModel;
      }
      if (tempMileage !== car.mileage) {
        updatedDetails.mileage = tempMileage;
      }
      if (tempPrice !== car.price) {
        updatedDetails.price = tempPrice;
      }
      if (tempDescription !== car.description) {
        updatedDetails.description = tempDescription;
      }
      if (tempOwnerNum !== car.number_of_past_owners) {
        updatedDetails.number_of_past_owners = tempOwnerNum;
      }
      if (tempColor !== car.color) {
        updatedDetails.color = tempColor;
      }
      if (tempEngineCapacity !== car.engine_capacity) {
        updatedDetails.engine_capacity = tempEngineCapacity;
      }
      if (tempSeatsNum !== car.number_of_seats) {
        updatedDetails.number_of_seats = tempSeatsNum;
      }
      // 
      if (tempCondition !== car.car_condition) {
        updatedDetails.car_condition = tempCondition;
      }
      if (tempTransmission !== car.transmission) {
        updatedDetails.transmission = tempTransmission;
      }

      const response = axios.patch(`${CAR_BY_ID}/${car.id}`, updatedDetails)
      console.log(response.data)
      setEditMode(false)
      setNotification({open:true,
        msg:'your changes has been saved',severity:'success'})
    }
    catch (e){
      setNotification({open:true,
        msg:e.response.data ,severity:'error'})
    }

    }

  return (
    <>
{/* 
    {!isLoaded && */}
    <>
    <Stack direction={'column'} sx={{maxWidth:'50em',margin:'auto'}}>
        <h1>Welcome to edit mode</h1>
      <Stack direction={'row'} gap={'2em'} marginBottom={'2em'}>
               <TextField variant='standard' type={'number'}
               onChange={(e)=>{setTempYear(e.target.value)}} InputLabelProps={{shrink: true, required: false}} value={tempYear} label={'year_of_manufacture'}/>
               <TextField variant='standard'
               onChange={(e)=>{setTempModel(e.target.value)}} InputLabelProps={{shrink: true, required: false}} value={tempModel}  label={'model_name'}/>


      </Stack>
      <Stack direction={'row'} gap={'2em'}>
      <TextField variant='standard' type={'number'}
               onChange={(e)=>{setTempPrice(e.target.value)}} InputLabelProps={{shrink: true, required: false}} value={tempPrice} label={'price'}/>
      <TextField variant='standard' type={'number'}
               onChange={(e)=>{setTempMileage(e.target.value)}} InputLabelProps={{shrink: true, required: false}} value={tempMileage} label={'mileage'}/>
      </Stack>
      {/* {images.length!==0&&
      <ImageGallery items={images} />} */}
      
      <h1>Overview:</h1>
      <h2>Description:</h2>
      <TextField
          label="Description"
          multiline
          maxRows={4}
          variant="filled"
          onChange={(e)=>{setTempDescription(e.target.value)}} InputLabelProps={{shrink: true, required: false}} 
          value={tempDescription}
          
        />
      <br/>
      <h2 style={{marginTop:0}}>More details:</h2>
      <Stack direction={'row'} gap={'2em'}>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel  id="demo-simple-select-standard-label">Past Owners</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={tempOwnerNum}
          onChange={(e)=>{setTempOwnerNum(e.target.value)}}
          label="Past Owners"
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel  id="demo-simple-select-standard-label">Seats Nmber</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={tempSeatsNum}
          onChange={(e)=>{setTempSeatsNum(e.target.value)}}
          label="seats number"
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
        </Select>
      </FormControl>
      <FormControl  variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Condition</InputLabel>
        <Select
        
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={tempCondition} 
          onChange={(e)=>{setTempCondition(e.target.value)}}
          label="Condition"
        >
          <MenuItem value={'new'}>new</MenuItem>
          <MenuItem value={'used'}>used</MenuItem>
        </Select>
      </FormControl>

      </Stack>

      <Stack direction={'row'} gap={'2em'} marginBottom={'2em'}>
        
      <TextField variant='standard' InputLabelProps={{shrink: true, required: false}} value={tempColor} 
          onChange={(e)=>{setTempColor(e.target.value)}}  label={'color'}/>
      <TextField variant='standard'   value={tempEngineCapacity} 
          onChange={(e)=>{setTempEngineCapacity(e.target.value)}}
      InputLabelProps={{shrink: true, required: false}} type={'number'} label={'Engine Capacity'}/>

      <TextField variant='standard'value={tempTransmission} 
          onChange={(e)=>{setTempTransmission(e.target.value)}} InputLabelProps={{shrink: true, required: false}}  label={'transmission'}/>
      
     

      </Stack>
    </Stack>
    <hr style={{maxWidth:'50em',margin:'auto'}}/>
    <Stack direction={'row'} maxWidth={'50em'} margin='auto' gap={'2em'}>  
                  <IconButton onClick={handleSave}>
            <SaveIcon/>
            </IconButton>
            <IconButton onClick={()=>{setEditMode(false)}}>
            <CancelIcon/>
            </IconButton>
      </Stack>
    </>
    </>
  )
}


export default CarDetailsEdit