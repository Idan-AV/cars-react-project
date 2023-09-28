import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import NewCar from '../NewCar/NewCar';
import { useState } from 'react';
import axios from 'axios';
import { ALL_CARS_LIST, ALL_COMPANIES_LIST, UPLOAD_EXTRA_CAR_PIC, UPLOAD_MAIN_CAR_PIC } from '../infra/urls';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import { FetchDataCarsContext } from '../CarsFunctionContext';
import { SetNotificationContext } from '../NotificationContext/NotificationContext';
import { Box, CircularProgress } from '@mui/material';

export default function NewCarModal({open, setOpen}) {
  const setNotification = useContext(SetNotificationContext)
  const fetchData = useContext(FetchDataCarsContext)
  const [carCondition, setCarCondition] = useState('')
  const [pastOwners, setPastOwners] = useState(null)
  const [carModel, setCarModel] = useState(null)
  const [year, setYear] = useState(null)
  const [copmanies ,setCompanies] = useState([])
  const [allCopmaniesName ,setAllCopmaniesName] = useState([])
  const [selectedCopmany ,setSelectedCopmany] = useState('')
  const [numberSeats , setNumberSeats] = useState(null)
  const [color , setColor] = useState('')
  const [mileage , setMileage] = useState(null)
  const[engineCapacity , setEngineCapacity] = useState(null)
  const [transmission, setTransmission] = useState('')
  const[description , setDescription] = useState('')
  const [mainFile , setMainFile] = useState('')
  const [price, setPrice] = useState(null)
  // try:
  const [file1 , setFile1] = useState('')
  const [file2 , setFile2] = useState('')
  const [file3 , setFile3] = useState('')
  const user = useContext(UserContext)


  React.useEffect(() => {
    async function fetchCompanies() {
      try {
        const response = await axios.get(ALL_COMPANIES_LIST);
        setCompanies(response.data);
      } catch (error) {
      }
    }

    fetchCompanies();
  }, []);


  const handleClose = () => {
    setCarCondition('')
    setPastOwners(null)
    setCarModel(null)
     setYear(null)
   setSelectedCopmany('')
    setNumberSeats(null)
     setColor('')
    setMileage(null)
    setEngineCapacity(null)
    setTransmission('')
    setDescription('')
    setMainFile('')
    setPrice(null)
    setFile1('')
    setFile2('')
    setOpen(false);
  };

  const handleCreate = async ()=>{
    try{
      
    console.log('selectedCompany:',selectedCopmany)

    const selectedCompanyData =copmanies?.filter((company) => company.company_name === selectedCopmany)[0];
    copmanies?.find((company) => company.companyName === selectedCopmany);
    const companyId = selectedCompanyData?.id;
    console.log('id:',companyId)
    const response = await axios.post(ALL_CARS_LIST,{
      'year_of_manufacture':year,
      'model_name':carModel,
      'number_of_past_owners':pastOwners,
      'color':color,
      'engine_capacity':engineCapacity,
      'number_of_seats':numberSeats,
      'car_condition':carCondition,
      'mileage':mileage,
      'transmission': transmission,
      'price':price,
      'company_id':companyId,
      'description':description,
      'user':user.user.id
    })

    console.log(response.data)
    console.log('main file',mainFile)
        if(mainFile==''){
          // setNotification({open:true,
          //   msg:'main file is a must field',severity:'error'}) 
          alert('Please select a file.')

        }
    
      else{
        const responseMainFile = await axios.post(
          `${UPLOAD_MAIN_CAR_PIC}${response.data.id}`,
          {file: mainFile},
          {headers: {
              'Content-Type': 'multipart/form-data'
          }
          })
      }
      if(file1!==''){

      
    const resposeFile1 = await axios.post(`${UPLOAD_EXTRA_CAR_PIC}${response.data.id}`,
    {file: file1},
    {headers: {
        'Content-Type': 'multipart/form-data'
    }
    }
    )
    console.log('file 1',resposeFile1.data)}
    if(file2!==''){
    const resposeFile2 = await axios.post(`${UPLOAD_EXTRA_CAR_PIC}${response.data.id}`,
    {file: file2},
    {headers: {
        'Content-Type': 'multipart/form-data'
    }
    }
    )
    console.log('file 2',resposeFile2.data)}
    // const resposeFile3 = await axios.post(`${UPLOAD_EXTRA_CAR_PIC}${response.data.id}`,
    // {file: file3},
    // {headers: {
    //     'Content-Type': 'multipart/form-data'
    // }
    // }
    // )
     setCarCondition('')
  setPastOwners(null)
  setCarModel(null)
   setYear(null)
 setSelectedCopmany('')
  setNumberSeats(null)
   setColor('')
  setMileage(null)
  setEngineCapacity(null)
  setTransmission('')
  setDescription('')
  setMainFile('')
  setPrice(null)
  setFile1('')
  setFile2('')
  setOpen(false)
  fetchData() 
  setNotification({open:true,
    msg:'the car has been created',severity:'success'}) 

}

  catch (e){
    setNotification({open:true,
      msg:JSON.stringify(e.response.data),severity:'error'}) 
  }
}

const isButtonDisabled = (
  carCondition === '' ||
  pastOwners === null ||
  carModel === null ||
  year === null ||
  selectedCopmany === '' ||
  numberSeats === null ||
  color === '' ||
  mileage === null ||
  engineCapacity === null ||
  transmission === '' ||
  description === '' ||
  mainFile === '' ||
  price === null ||
  mainFile == 'undefined'||
  mainFile == null
);



  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Car</DialogTitle>
        <DialogContent>
          <NewCar
          price={price} setPrice={setPrice}
          mainFile={mainFile} setMainFile={setMainFile}
          transmission={transmission} setTransmission={setTransmission}
          description={description} setDescription={setDescription}
          color={color} setColor={setColor}
          numberSeats={numberSeats} setNumberSeats={setNumberSeats}
          mileage={mileage} setMileage={setMileage}
          engineCapacity={engineCapacity} setEngineCapacity={setEngineCapacity}
          carCondition={carCondition} setCarCondition={setCarCondition} 
          setPastOwners={setPastOwners} pastOwners={pastOwners}
          setCarModel={setCarModel} carModel={carModel}
          setCompanies={setCompanies} copmanies={copmanies}
          setSelectedCopmany={setSelectedCopmany} selectedCopmany={selectedCopmany}
          setYear={setYear} year={year} file1={file1} setFile1={setFile1}
          file2={file2} setFile2={setFile2} file3={file3} setFile3={setFile3}
          setAllCopmaniesName={setAllCopmaniesName} allCopmaniesName={allCopmaniesName}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreate} disabled={isButtonDisabled}>Post a car</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}