import logo from './logo.svg';
import './App.css';
import Header from './Header/Header';
import { Outlet } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { ME_URL } from './infra/urls';
import {  SetUserContext } from './context/userContext';
import axios from 'axios';
import Notification from './Notification/Notification';
import { CarContext, SetCarContext } from './CarContext/CarsContext';
import { SavedCarsProvider } from './SavedCarsContext/SavedCarsContext';
function App() {
  const setUser = useContext(SetUserContext)
  const [cars, setCars] = useState({results:[]})

  useEffect(
    () => {
      const fetchData = async () => {
        const token = localStorage.getItem('token')
        if (token) {
          const meResponse = await axios.get(ME_URL,
            {headers: {Authorization: `Bearer ${token}`}})
          console.log(meResponse)
          setUser({
            user: {...meResponse.data}
          })
        }
      }
      fetchData()
    }
  )
  return (
    <>
    <Header/>
    <br/>
    <SavedCarsProvider>
    <CarContext.Provider value={cars}>
      <SetCarContext.Provider value={setCars}>
              <Outlet/>
      </SetCarContext.Provider>
    </CarContext.Provider>
    </SavedCarsProvider>
    
    <Notification/>
    
    </>
  )
}

export default App;
