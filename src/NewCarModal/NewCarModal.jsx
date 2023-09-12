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
import { ALL_COMPANIES_LIST } from '../infra/urls';

export default function NewCarModal({open, setOpen}) {
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




  const [companyId, setCompanyId] = useState(null)
  // try:
  const [file1 , setFile1] = useState('')
  const [file2 , setFile2] = useState('')
  const [file3 , setFile3] = useState('')


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
    setOpen(false);
  };

  const handleCreate = async ()=>{
    // to do this with my files 
  //   const response = await axios.post(
  //     UPLOAD_PROFILE_IMG_URL,
  //     {file: file},
  //     {headers: {
  //         'Content-Type': 'multipart/form-data'
  //     },
  //     onUploadProgress: handleUploadProgress
  //     }
  // )
    // console.log('selectedCompany:',selectedCopmany)

    // const selectedCompanyData =copmanies?.filter((company) => company.company_name === selectedCopmany)[0];
    // copmanies?.find((company) => company.companyName === selectedCopmany);
    // setCompanyId(selectedCompanyData?.id)
    // console.log('id:',companyId)
    // console.log('selectedCompanyData:',selectedCompanyData)




  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Car</DialogTitle>
        <DialogContent>
          <NewCar
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
          <Button onClick={handleCreate}>Post a car</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}