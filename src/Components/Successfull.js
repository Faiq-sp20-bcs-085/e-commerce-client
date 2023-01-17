import { CircularProgress, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { persistor } from '../store';
import { useSelector,useDispatch } from 'react-redux';
import { ClearCart } from '../Features/CartSlicer';
const Successfull = () => {

const navigate=useNavigate();
    const [open,setOpen]=useState(false)
const dispatch=useDispatch();
useEffect(()=>{
setOpen(true)
dispatch(ClearCart())
setTimeout(()=>{
setOpen(false)

},2000)
},[])

if(open===false){
    navigate('/')
}

    return ( <>
    
    <Dialog open={open}   >

        <DialogTitle>
            <Box sx={{display:'flex',justifyContent:'center'}}> 
          <Typography> Thank You for Purchasing with us. </Typography>
          </Box>
          <DialogContent>
            <Box sx={{display:'flex',justifyContent:'center'}}> 
                <Typography> Redirecting You Now To HomePage... </Typography> 
            
            </Box>
            <Box sx={{display:'flex',justifyContent:'center'}} >
                <CircularProgress/>
            </Box>
          </DialogContent>
        </DialogTitle>
    </Dialog>
    
    </> );
}
 
export default Successfull;