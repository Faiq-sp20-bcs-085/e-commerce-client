import { Alert, Box, Button, Card, CardContent, CircularProgress, FormControlLabel, Modal, Radio, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import {useNavigate}from 'react-router-dom'

const Payment = () => {
const navigate=useNavigate();

    const {ShippingAddress}=useSelector((state)=>state.cart);
   
    const [value,setValue]=useState()
const [open,setOpen]=useState(false);

useEffect(()=>{
    
    if(Object.keys(ShippingAddress).length===0){
    setTimeout(()=>{
        navigate('/Shipping')
    },2200)
    setTimeout(()=>{
        setOpen(true)
    },500)
    }
    
})


    return ( <>
    
    <Box mt={5} sx={{height:'300px',display:'flex',alignItems:'center',justifyContent:'center'}}>
    <Card sx={{boxShadow:7,height:'155px',width:'250px'}} >
        <CardContent sx={{display:'flex',justifyContent:'center'}}>
            <Box>
            <Typography > SELECT PAYMENT METHOD </Typography>
           <Box sx={{marginTop:'10px'}}> 
            <FormControlLabel value={value} onChange={(e)=>setValue(e.target.value)} label='PayPal or Credit Card' control={<Radio/>}>
            <Radio   />
           </FormControlLabel>
              </Box>
            </Box>
        </CardContent>
       <CardContent sx={{marginTop:'-28px',display:'flex',justifyContent:'center'}}> 
            <Button  variant='contained' sx={{backgroundColor:'green',width:'200px',"&:hover":{backgroundColor:'green'}}}
            disabled={value == null ? true: false}
            onClick={()=>navigate('/Placeorder')}
            >
            Continue
           </Button>
           </CardContent>
       
           
        
    </Card>
   </Box>

   <Modal open={open} onClose={()=>setOpen(false)}>
    <Alert severity='error' onClose={()=>setOpen(false)}> Unable to Process Your Shipping Address, Redirecting you back... </Alert>
   </Modal>
    
    </> );
}
 
export default Payment;