import { Autocomplete, Stack, TextField } from '@mui/material'
// import React from 'react'
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import { COMPANIES_NAMES_LIST } from '../infra/urls';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
const NewCar = ({price,setPrice, mainFile, setMainFile,
  transmission, setTransmission,
  description, setDescription,
  carCondition,setCarCondition, 
  color, setColor,
          numberSeats, setNumberSeats,
          mileage, setMileage,
          engineCapacity, setEngineCapacity,
  file1 , setFile1, file2 , setFile2 , 
    setPastOwners,pastOwners,carModel,setCarModel,year,setYear,
    setSelectedCopmany,selectedCopmany ,setAllCopmaniesName,allCopmaniesName,file3 , setFile3}) => {
      React.useEffect(()=>{
        const fetchData = async ()=>{
          const response = await axios.get(COMPANIES_NAMES_LIST)
          setAllCopmaniesName(response.data)
        }
        fetchData()
      },
      []
      )
      const handleMainFileSelect = (event) => {

        if (event.target.files) {
          setMainFile(event.target.files[0])
        }
      }
      const handleFile2Select = (event) => {

        if (event.target.files) {
          setFile2(event.target.files[0])
        }
      }
      const handleFile1Select = (event) => {

        if (event.target.files) {
          setFile1(event.target.files[0])
        }
      }
  return (
    <Stack direction={'column'}>
        <Stack direction={'row'}>
        <FormControl required variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Condition</InputLabel>
        <Select
        
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={carCondition} 
          onChange={(e)=>{setCarCondition(e.target.value)}}
          label="Condition"
        >
          <MenuItem value={'new'}>new</MenuItem>
          <MenuItem value={'used'}>used</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel required id="demo-simple-select-standard-label">Past Owners</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={pastOwners}
          onChange={(e)=>{setPastOwners(e.target.value)}}
          label="Past Owners"
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
        </Select>
      </FormControl>
        </Stack>
        <Stack direction={'row'} gap={'2em'}>
      <TextField required  sx={{maxWidth:'8em'}} label="Model" variant="standard" 
      value={carModel}
      onChange={(e)=>{setCarModel(e.target.value)}}/>
        <TextField required type={'number'}  sx={{maxWidth:'8em'}} label="Year" variant="standard" 
      value={year}
      onChange={(e)=>{setYear(e.target.value)}}
      InputProps={{ inputProps: { min: 1990, max: new Date().getFullYear() } }}/>
      </Stack>
      <Stack direction={'row'} marginTop={'2em'}> 
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={allCopmaniesName}
        sx={{ width: 250 }}
        value={selectedCopmany} 
        onChange={(e,newValue)=>setSelectedCopmany(newValue)}
        renderInput={(params) => <TextField  
        {...params} label="company" />}
      />
      </Stack>
      <Stack direction={'row'} marginTop={'2em'} gap={'1em'}>
        <TextField  value={mileage}
      onChange={(e)=>{setMileage(e.target.value)}} required variant='standard' label={'mileage'} sx={{maxWidth:'8em'}} type={'number'}/>
        <TextField  value={engineCapacity}
      onChange={(e)=>{setEngineCapacity(e.target.value)}} required variant='standard' label={'engine capacity'} sx={{maxWidth:'8em'}} type={'number'}/>
      </Stack>
      <Stack direction={'row'} marginTop={'2em'} gap={'1em'}>
        <TextField  value={color}
      onChange={(e)=>{setColor(e.target.value)}} required variant='standard' label={'color'} sx={{maxWidth:'8em'}} type={'text'}/>
        <TextField  value={numberSeats}
      onChange={(e)=>{setNumberSeats(e.target.value)}} required variant='standard' label={'seats number'} sx={{maxWidth:'8em'}} type={'number'}/>
      </Stack>
      <Stack direction={'row'} marginTop={'2em'} gap={'1em'}>
        <TextField  value={transmission}
      onChange={(e)=>{setTransmission(e.target.value)}} required variant='standard' label={'transmission'} sx={{maxWidth:'8em'}} type={'text'}/>
        <TextField value={description}
      onChange={(e)=>{setDescription(e.target.value)}} required variant='standard' multiline
          maxRows={4} label={'description'} sx={{maxWidth:'8em'}} type={'number'}/>
      </Stack>
      {/* and add here a state */}
          <Stack marginTop={'3em'}>
            <p>your main picture here </p>
          <input required={true} style={{width:'15em'}} onChange={handleMainFileSelect} type={'file'}/>
          {/* <TextField  sx={{width:'15em'}}  onChange={handleMainFileSelect} variant="standard" type={'file'}/> */}
          </Stack>


      <Stack direction={'column'} marginTop={'2em'} gap={'1em'}>
        <p>Here you can upload pictures of your car:</p>
        <TextField sx={{width:'15em'}}  variant="standard" onChange={handleFile1Select} type={'file'}/>
        <TextField sx={{width:'15em'}} variant="standard" onChange={handleFile2Select} type={'file'}/>
      </Stack>
{/* and here */}
      <TextField value={price}
      onChange={(e)=>{setPrice(e.target.value)}} sx={{marginTop:'3em'}}  required type={'number'} label={'price'}/>

    </Stack>
  )
}

export default NewCar