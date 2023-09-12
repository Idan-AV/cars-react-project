import { Button, CardMedia, Divider, IconButton, Stack } from '@mui/material'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import CarPicture from '../CarPicture/CarPicture'
import EditIcon from '@mui/icons-material/Edit';
import { CAR_BY_ID, IMAGES_URL_FOR_CAR } from '../infra/urls'
import ContactDialog from '../ContactDialog/ContactDialog';
import './CarDetails.css'
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery'
import CircleProgress from '../CircleProgress/CircleProgress'
const CarDetails = () => {
    const {carId} = useParams()
    const [isLoaded,setIsLoaded] = useState(true)
    const [open, setOpen] = React.useState(false);
    const [car, setCar] = useState({})
    const [images,setImages] = useState([])
    useEffect(()=>{
        const fetchData=async()=>{
          // setIsLoaded(true)
            const response =  await axios.get(`${CAR_BY_ID}/${carId}`)
            const imageResponse = await axios.get(`${IMAGES_URL_FOR_CAR}${carId}`)
            setCar(response.data)
            console.log(imageResponse.data)
            setImages(imageResponse.data)
            setIsLoaded(false)
        }
        fetchData()
    },[carId]
    )

  return (
    <>

    {!isLoaded &&
    <>
    <Stack direction={'column'} sx={{maxWidth:'50em',margin:'auto'}}>
      <Stack direction={'row'} gap={'2em'}>
              <h2>{`${car.year_of_manufacture} ${car.company_name} ${car.model_name} `}</h2>
        <IconButton>
        <EditIcon/>
      </IconButton>
      </Stack>
      <h4 style={{marginTop:0}}>{`price: ${car.price} | mileage: ${car.mileage} miles`}</h4>
      {/* <CardMedia
        component="img"
        image={car.pic_url}
        alt="Paella dish"
      /> */}
      {images.length!==0&&
      <ImageGallery items={images} />}
      
      <h1>Overview:</h1>
      <h2>Description:</h2>
      <p style={{marginTop:0}}>{car.description}</p>
      <br/>
      <h2 style={{marginTop:0}}>More details:</h2>
      
      {/* <dl>
        <dt>number_of_past_owners:</dt>
        <dd>{car.number_of_past_owners}</dd>
        
        <dt>color:</dt>
        <dd>{car.color}</dd>


        <dt>engine_capacity:</dt>
        <dd>{car.engine_capacity}</dd>



        <dt>number_of_seats:</dt>
        <dd>{car.number_of_seats}</dd>



        <dt>car_condition:</dt>
        <dd>{car.car_condition}</dd>

        <dt>transmission:</dt>
        <dd>{car.transmission}</dd>


      </dl> */}
      <p>{`number_of_past_owners:  ${car.number_of_past_owners}`}</p>
      <p>{`color:  ${car.color}`}</p>
      <p>{`engine_capacity:  ${car.engine_capacity}`}</p>
      <p>{`number_of_seats:  ${car.number_of_seats}`}</p>
      <p>{`car_condition:  ${car.car_condition}`}</p>
      <p>{`transmission:  ${car.transmission}`}</p>
    </Stack>
    <hr style={{maxWidth:'50em',margin:'auto'}}/>
    <Stack>  
        <Button onClick={()=>{setOpen(true)}} sx={{maxWidth:'50em',margin:'auto'}}>Contact The Seller </Button>
        <ContactDialog  car={car} setOpen={setOpen} open={open}/>
      </Stack>
    </>
    }
    {isLoaded &&
      <CircleProgress/>}
    </>
  )
}

export default CarDetails