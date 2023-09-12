import axios from "axios";
import { createContext, useState } from "react";
import { SAVED_CARS } from "../infra/urls";

export const RefreshSavedCarsContext = createContext(null)
export const SavedCarsContext = createContext(null)
export const SetSavedCarsContext = createContext(null)

export const SavedCarsProvider = ({children})=>{
    const [savedCarsState, setSavedCarsState] = useState({results:[]})  
    const onRefreshSavedCars = async () => {
        const savedCarsResponse =  await axios.get(`${SAVED_CARS}`)
        setSavedCarsState(savedCarsResponse.data)
    }

    return(
        <SetSavedCarsContext.Provider value={setSavedCarsState}>
        <SavedCarsContext.Provider value={savedCarsState}>
        <RefreshSavedCarsContext.Provider value={onRefreshSavedCars}>
                {children}      
        </RefreshSavedCarsContext.Provider>
        </SavedCarsContext.Provider>
        </SetSavedCarsContext.Provider>

        

    )
}

