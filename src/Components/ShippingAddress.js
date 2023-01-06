import { Alert, Box, Button, Card, CardContent, CircularProgress, Modal, Snackbar, TextField, Typography } from '@mui/material';
import React, { useEffect,useState } from 'react'
import Image from '../Assets/Images/ship.jpg'
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ShipAddress } from '../Features/CartSlicer';



const ShippingAddress = () => {
const navigate=useNavigate();
const {cart}=useSelector((state)=>state.cart);
const {ShippingAddress}=useSelector((state)=>state.cart);

const [country,setCountry]=useState(ShippingAddress.country);
const [city,setCity]=useState(ShippingAddress.city);
const [street,SetStreet]=useState(ShippingAddress.street);

const dispatch=useDispatch();

useEffect(()=>{
    
    if(cart.length===0){

setTimeout(()=>{
    navigate('/')
  },2500)
    }
   

    
   
},)


const handleContinue=()=>{
dispatch(ShipAddress({country,city,street}));
navigate('/Payment')
}

if(cart.length===0){
    return(
        <>
        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'500px'}}>
            <CircularProgress  />
            </Box>
        </>
    )
}

    return (  
        <>
       
        
<Box sx={{display:'flex',justifyContent:'center',alignItems:'center',backgroundImage:`url(${Image})`,backgroundSize:'cover',}}> 
        <Box sx={{height:'500px',display:'flex',alignItems:'center',justifyContent:'center'}}>
         
         <Card sx={{width:'350px',boxShadow:7}}>
            <CardContent sx={{display:'flex',justifyContent:'center'}}>
                <Typography variant='h6' sx={{marginBottom:'-10px'}}> Delivery Address </Typography>
            </CardContent>
            <CardContent sx={{display:'flex',justifyContent:'center'}} >
                <TextField
                sx={{width:'270px'}}
              value={country}
              onChange={(e)=>setCountry(e.target.value)}
               placeholder='Enter Your Country'
              />
            </CardContent>

            <CardContent sx={{display:'flex',justifyContent:'center'}} >
                <TextField
                sx={{width:'270px',marginBottom:'40px'}}
              value={city}
              onChange={(e)=>setCity(e.target.value)}
               placeholder='Enter Your City'
              />
            </CardContent>

            <CardContent sx={{display:'flex',justifyContent:'center'}} >
                <TextField
                sx={{width:'270px',marginTop:'-40px'}}
              value={street}
              onChange={(e)=>SetStreet(e.target.value)}
               placeholder='Enter Your Street/House No'
              />
            </CardContent>
          
            <CardContent sx={{display:'flex',justifyContent:'center'}} >
                <Button disabled={!country || !street || !city? true : false} variant='contained' sx={{backgroundColor:'green',width:'270px',marginTop:'-10px',"&:hover":{backgroundColor:'green'}}} 
                onClick={handleContinue}
                >
                    Continue
                </Button>
            </CardContent>


         </Card>

        </Box>
        </Box>
      
      
        </>
     );
}
 
export default ShippingAddress;