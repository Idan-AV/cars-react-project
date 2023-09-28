import { Box, Fab } from '@mui/material'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import CarsList from '../carsList/CarsList'
import CarsSearch from '../CarsSearch/CarsSearch'
import { ALL_CARS_LIST } from '../infra/urls'
import AddIcon from '@mui/icons-material/Add'
import { UserContext } from '../context/userContext'
import NewCarModal from '../NewCarModal/NewCarModal'
import { CarContext, SetCarContext } from '../CarContext/CarsContext'
import { FetchDataCarsContext } from '../CarsFunctionContext'
import { SetNotificationContext } from '../NotificationContext/NotificationContext'
const HomePage = () => {
  // const [cars, setCars] = useState({results:[]})

  const cars = useContext(CarContext)
  const setCars = useContext(SetCarContext)
  const setNotification = useContext(SetNotificationContext)

  const user = useContext(UserContext)
  const [open,setOpen]= useState(false)


  const fetchData = async()=>{
    try{
    console.log('fetchdata', cars)
    let urlToSend = ALL_CARS_LIST
    if(cars.next){
      urlToSend = cars.next
    }
   
    const response = await axios.get(urlToSend)
    // console.log(response)
    // const savedCarsResponse = await axios.get(saved_cars)
    // console.log(response.data)
    if (response.data.previous === null) {
      setCars(response.data)
    } else {
      setCars(
        {...cars,
          next:response.data.next,
          results:[...cars.results, ...response.data.results]
        }
      )
    }
  }
    catch(e){
      console.error(e)
      setNotification({open:true,
        msg:JSON.stringify(e.response.data),severity:'error'}) 
      
    }

  }
  
  // useEffect(
  //   ()=>{
  //     fetchData()
  //   }
  //   ,[]
  // )
  useEffect(() => {
    try {
      fetchData();
      setNotification({open:true,
        msg:'here are our beautiful cars',severity:'success'}) 
    } catch (e) {
      setNotification({open:true,
        msg:JSON.stringify(e.response.data),severity:'error'}) 
    }
  }, []);


  return (
    <>
      <Box sx={{overflow: 'hidden'}}>
    <CarsSearch setCars={setCars} fetchDataCars={fetchData}/>
      <FetchDataCarsContext.Provider value={fetchData}>
    <CarsList cars={cars} loadMore={fetchData}/>
    
    {user.user &&
            <>
            <Fab color="primary" aria-label="add" 
                sx={{position: 'absolute',bottom: 16, right: 16,}}
                onClick={() => setOpen(true)}>
                <AddIcon />
            </Fab>

            <NewCarModal open={open} setOpen={setOpen}/>
            
            </>
        }
        </FetchDataCarsContext.Provider>

      </Box>
    </>

  )
}

export default HomePage