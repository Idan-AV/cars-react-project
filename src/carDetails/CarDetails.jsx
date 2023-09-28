import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { CAR_BY_ID } from "../infra/urls"
import CarDetailsEdit from "./CarDetailsEdit"
import CarDetailsView from "./CarDetailsView"

const CarDetails = () => {
  const {carId} = useParams()
  const [car, setCar] = useState({})
  useEffect(()=>{
      const fetchData=async()=>{
        // setIsLoaded(true)
          const response =  await axios.get(`${CAR_BY_ID}/${carId}`)
          setCar(response.data)
      
      }
      fetchData()
  },[carId]
  )

  const [year , setYear] = useState(null)
  const [model ,setModel] = useState(null)
  const [editMode , setEditMode] = useState(false)
  const [mileage, setMileage] = useState(null)
  const [price , setPrice] = useState(null)
  const [description,setDescription] = useState('')
  const [ownersNum , setOwnersNum] = useState(null)
  const [color , setColor] = useState('')
  const [engineCapacity ,setEngineCapacity] = useState(null)
  const [seatsNum , setSeatsNum] = useState(null)
  const [condition , setCondition] = useState('')
  const [transmission, setTransmission] = useState('')
  return(
    <>
    {editMode?
    <CarDetailsEdit car={car}
    setYear={setYear}
    setModel={setModel}
    setEditMode={setEditMode}
     setMileage={setMileage}
     setPrice={setPrice}
    setDescription={setDescription}
    setOwnersNum={setOwnersNum}
    setColor={setColor}
    setEngineCapacity={setEngineCapacity}
    setSeatsNum={setSeatsNum}
    setCondition={setCondition}
    setTransmission={setTransmission}
    />
   
  :
  <CarDetailsView setEditMode={setEditMode}/>
 
}
    </>
    
  )
  }

export default CarDetails