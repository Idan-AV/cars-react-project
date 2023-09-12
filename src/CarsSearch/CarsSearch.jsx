import { Autocomplete, Button, Container, Stack, TextField } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { ALL_CARS_LIST, MODELS_LIST } from '../infra/urls'
import { SetNotificationContext } from '../NotificationContext/NotificationContext'

const CarsSearch = ({setCars,fetchDataCars}) => {
    const [selctedCar , setSelctedCar] = useState('')
    const [minPrice,setMinPrice] = useState(null)  
    const [maxPrice,setMaxPrice] = useState(null) 
    const [minYear,setMinYear] = useState(null)  
    const [maxYear,setMaxYear] = useState(null)   
    const [modelsList,setModelsList] = useState([])
    const setNotification = useContext(SetNotificationContext)
    const handleReset = ()=>{
      fetchDataCars()

    }

    useEffect(()=>{
      const fetchData = async ()=>{
        const responseModels = await axios.get(MODELS_LIST)
        setModelsList(responseModels.data)

      }
      fetchData()
    },
    []
    )

    const handleSearch  = async()=>{
      const urlParams = new URLSearchParams()
      if (selctedCar!== ''){
        urlParams.append('model', selctedCar)
      }
      if(minYear!==null&& minYear!==''){
              urlParams.append('from_year_of_manufacture', minYear)

      }
      if(maxYear!==null && maxYear!==''){
      urlParams.append('to_year_of_manufacture', maxYear)
        }
      
      if(minPrice!==null&& minPrice!==''){
      urlParams.append('from_price', minPrice)

  }
  if(maxPrice!==null&& maxPrice!==''){
      urlParams.append('to_price', maxPrice)

}     
try{
        const response = await axios.get(`${ALL_CARS_LIST}?${urlParams.toString()}`)
        setCars(response.data)
        setSelctedCar('')  
        setMaxPrice(null)
        setMinPrice(null)
        setMaxYear(null)
        setMinYear(null)
        if(response.data.count===0){
          setNotification({open:true,msg:'It seems like there arent cars according to your filter try something else',
          severity:'warning'})

        }
      }
      catch (e){
        setNotification({open:true,msg:e.response.data.detail,severity:'error'})
      }
    }
    const isSearchDisabled =
    selctedCar === '' &&
  (minPrice === '' || minPrice === null) &&
  (maxPrice === '' || maxPrice === null) &&
  (minYear === '' || minYear === null) &&
  (maxYear === '' || maxYear === null);
  return (
    <Container onSubmit={(e)=>e.preventDefault()} component={'form'} maxWidth={'40em'} m={'auto'}>
    <Stack direction={'column'} maxWidth={'40em'} m={'auto'} gap={'1em'} marginTop={'1em'}>
     
    <Autocomplete
  disablePortal
  id="combo-box-demo"
  options={modelsList}
  sx={{ width: 250 }}
  value={selctedCar} 
  onChange={(e,newValue)=>setSelctedCar(newValue)}
  renderInput={(params) => <TextField  
  {...params} label="model" />}
/>

    <Stack direction={'row'} maxWidth={'30em'} m={'auto'} marginLeft={0} gap={'1em'}>
    <TextField 
    label={'min price'}
    type={'number'}
    inputProps={{ min: 0}}
    sx={{ width: 100 ,marginLeft:0}}
    // value={minPrice}
    value={minPrice !== null ? minPrice : ''}
    onChange={(e) => setMinPrice(e.target.value)}
  />
   <TextField 
    label={'max price'}
    type={'number'}
    inputProps={{ min: 0}}
    sx={{ width: 100 ,marginLeft:0}}
    // value={maxPrice}
    value={maxPrice !== null ? maxPrice : ''}

    onChange={(e) => setMaxPrice(e.target.value)}
  />

    </Stack>
    <Stack direction={'row'} maxWidth={'30em'} m={'auto'} marginLeft={0} gap={'1em'}>
    <TextField 
    label={'min year'}
    type={'number'}
    inputProps={{ min: 0}}
    sx={{ width: 100 ,marginLeft:0}}
    // value={minPrice}
    // value={minYear}
    value={minYear !== null ? minYear : ''}

    onChange={(e) => setMinYear(e.target.value)}
  />
   <TextField 
    label={'max year'}
    type={'number'}
    inputProps={{ min: 0}}
    sx={{ width: 100 ,marginLeft:0}}
    // value={maxPrice}
    // value={maxYear}
    value={maxYear !== null ? maxYear : ''}


    onChange={(e) => setMaxYear(e.target.value)}
  />

    </Stack>
    <Stack direction={'row'} gap={'4em'}>
    <Button onClick={handleSearch} disabled={isSearchDisabled}>Search</Button>
        <Button onClick={handleReset}>Reset Filters</Button>
    </Stack>   
        </Stack>
    </Container>
    
  )
}

export default CarsSearch