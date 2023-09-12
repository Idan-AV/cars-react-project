import { Stack } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import CarsList from '../carsList/CarsList'
import { GET_ALL_CARS_FOR_USER } from '../infra/urls'
const MyCars = () => {
  const [myCars , setMyCars] = useState({})
  // ask if I should call this func bellow after careating a car and pass it to the 
  // component that creates the car
  useEffect(()=>{
    const fetchData= async()=>{
      const responseMyCars =  await axios.get(GET_ALL_CARS_FOR_USER)
      setMyCars(responseMyCars.data)
    }
    fetchData()
  },[]
  )
  
  console.log('my cars',myCars)
  return (
    <>
    <Stack maxWidth={'60em'} margin={'auto'}><h1>My Beautiful Cars:</h1></Stack>
    
    <CarsList cars={myCars}/>
    </>
  )
}

export default MyCars