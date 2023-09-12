import { Stack } from '@mui/material'
import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import CarsList from '../carsList/CarsList'
import { RefreshSavedCarsContext, SavedCarsContext,SetSavedCarsContext } from '../SavedCarsContext/SavedCarsContext'
const SavedCars = () => {
  const savedCarsState = useContext(SavedCarsContext)
  const RefreshSavedCarsFunction  = useContext(RefreshSavedCarsContext)

  
  useEffect(()=>{
    const fechData= async ()=>{
      await RefreshSavedCarsFunction()
    }
    fechData()
  },
  []
  )

  return (
    <>
    <Stack maxWidth={'60em'} margin={'auto'}><h1>My Saved Cars:</h1></Stack>

    <CarsList
     cars={savedCarsState}/>
    </>

  )
}

export default SavedCars