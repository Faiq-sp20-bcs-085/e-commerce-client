import { Dialog, DialogTitle, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { persistor } from '../store';
const Successfull = () => {
const navigate=useNavigate();
    const [open,setOpen]=useState(false)

useEffect(()=>{
setOpen(true)
if(open===true){
    setTimeout(()=>{
      persistor.pause();
      persistor.flush().then(()=>{persistor.purge()})
        navigate('/')
    },2000)
}
},[])

    return ( <>
    
    <Dialog open={open}  >

        <DialogTitle>
          <Typography> Thank You for Purchasing with us. </Typography>
        </DialogTitle>
    </Dialog>
    
    </> );
}
 
export default Successfull;