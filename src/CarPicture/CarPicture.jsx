import React from 'react'

const CarPicture = ({size,url}) => {
  return (
    <img  style={{width:size,height:size,borderRadius:'15px'}} src={url}/>
  )
}

export default CarPicture