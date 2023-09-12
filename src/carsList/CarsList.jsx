import { Container, List } from '@mui/material'
import React from 'react'
import CarItem from '../carItem/CarItem'
import InfiniteScroll from "react-infinite-scroller";


const CarsList = ({cars,loadMore}) => {

  const {count,next,results} = cars
  const items = results && results.map((car)=>{
    return  <CarItem  key={car.id}  car={car}/>
  })

  return (
    <Container sx={{overflow: 'auto', height: '600px'}}>
    <List sx={{maxWidth: '100%', padding: 0}}>
        <InfiniteScroll
            pageStart={0}
            loadMore={loadMore}
            hasMore={next !== null}
            loader={<div className="loader" key={0}>Loading ...</div>}
            useWindow={false}>
                {items}
        </InfiniteScroll>
    </List>
</Container>
    // <List>
    // <InfiniteScroll
    // pageStart={0}
    // loadMore={loadMore}
    // hasMore={next!== null}
    // loader={<div className="loader" key={0}>Loading ...</div>}>
    //   {items}
    // </InfiniteScroll>
    // </List>
    
  )
}

export default CarsList