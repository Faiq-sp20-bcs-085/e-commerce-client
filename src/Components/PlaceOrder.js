import { Alert, Avatar, Button, Card, CardContent, Grid, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useState,useEffect, Profiler } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode'
import axios from 'axios';
import { Box, Container } from '@mui/system';
import {  Delete, LocalShipping, LocationOn, Person, } from '@mui/icons-material';

import Image from '../Assets/Images/shinywhite.webp'

const PlaceOrder = () => {
const dispatch=useDispatch();
    const {cart,ShippingAddress,bill,charges,totalbill}=useSelector((state)=>state.cart);
    const [open,setOpen]=useState(false);
    const [user,setUser]=useState('')
    const [loading,setLoading]=useState(true);
    const [userId,setUserId]=useState('')

const navigate=useNavigate();


useEffect(()=>{
    const token=sessionStorage.getItem('token');
    if(token){
    setUserId(jwt_decode(token))
    }
},[])

useEffect(()=>{
    if(cart.length===0 || Object.keys(ShippingAddress).length===0){
        setTimeout(()=>{
         navigate('/')
        },1800)
        setTimeout(()=>{
            setOpen(true)
         },200)
    }
   
})

useEffect(()=>{
const token=sessionStorage.getItem('token');
if(token){
    const userId=jwt_decode(token);
    let {_id}=userId;
    axios.get(`http://localhost:5000/api/users/${_id}`).then((res)=>{
        setUser(res.data)
    }).catch((e)=>{
        console.log(e);
    })
}

},[])

const CheckOut=async()=>{
  axios.post(`http://localhost:5000/api/orders/${userId._id}`,{cart,totalbill}).then((res)=>{
   window.location.assign(res.data)
  
  }).catch((e)=>{
    console.log(e);
  })
}


    return ( 
        <>
        <Container >
            <Box mt={4} sx={{display:'flex',justifyContent:'space-between',backgroundColor:'#08e8de',height:'180px',alignItems:'center',backgroundImage:`url(${Image})`,backgroundSize:'cover'}}>
              <Box mx={2} gap={4} sx={{display:'flex'}}>
                <Avatar sx={{height:'75px',width:'75px',backgroundColor:'lightgrey'}}> <Person sx={{fontSize:'50px'}} /> </Avatar>
                <Box>
                    <Typography variant='h6'> Customer </Typography>
                    <Typography variant='body2' > Name: {user.name} </Typography>
                    <Box>
                    <Typography variant='body2'> Emai: {user.email} </Typography> 
                    </Box>
                   
                </Box>
              </Box>

              <Box gap={4} sx={{display:'flex'}}>
                <Avatar sx={{height:'75px',width:'75px', backgroundColor:'lightgrey'}}> <LocalShipping sx={{fontSize:'50px'}} />  </Avatar>
                <Box>
                    <Typography variant='h6'> Order Details </Typography>
                    <Typography variant='body2' > Shipping: {ShippingAddress.country} </Typography>
                    <Box>
                    <Typography variant='body2'> Pay method: PayPal </Typography> 
                    </Box>
                   
                </Box>
              </Box>

              <Box gap={4} sx={{display:'flex'}}>
                <Avatar sx={{height:'75px',width:'75px', backgroundColor:'lightgrey' }}> <LocationOn sx={{fontSize:'50px'}} /> </Avatar>
                <Box>
                    <Typography variant='h6'> Deliver to </Typography>
                    <Typography variant='body2' > City: {ShippingAddress.city}  </Typography>
                    <Box>
                    <Typography variant='body2' > Street: {ShippingAddress.street}  </Typography>
                    </Box>
                   
                </Box>
              </Box>



            </Box>
            <Box mt={2}>
             
            </Box>
             
      

        <Box mt={1} sx={{display:'flex',justifyContent:'space-between'}}>
           
         <Grid>
            {cart.map((item)=>{
                return(
                    <>
                    <Grid container mt={2}>
                    <Card sx={{width:'850px',display:'flex',justifyContent:'space-between',alignItems:'center',boxShadow:2}}>
                        <Container sx={{display:'flex',justifyContent:'space-between'}}>
                            <Box sx={{display:'flex',alignItems:'center'}}> 
                         <img src={`${item.image}`}  style={{maxHeight:'7rem',maxWidth:'7rem',objectFit:'cover'}} alt="" />
                         <Typography mx={2} > {item.name} </Typography>
                         </Box>
                         <Box  sx={{display:'flex',alignItems:'center'}}>
                            <Box>
                               <Typography variant='body2'> QUANTITY: </Typography> 
                               <Box sx={{display:'flex',justifyContent:'center'}}>
                               <Typography variant='body2'>  {item.qty} </Typography> 
                               </Box> 
                            </Box>
                         </Box>  
                         <Box sx={{display:'flex',alignItems:'center'}}> 
                         <Box> 
                         <Typography variant='body2' > SUBTOTAL:  </Typography>
                           <Typography variant='h6'> ${item.subtotal} </Typography>  
                           </Box>
                          </Box>
                             
                          <Box sx={{display:'flex',alignItems:'center'}}> 
                          
                          </Box>

                        </Container>
                        </Card>
                    </Grid>
                    </>
                )
            })}
         </Grid> 

           <Box sx={{marginTop:'17px',width:'250px'}}>
               <TableContainer sx={{backgroundColor:'#F5F5F5'}} >
                <Table  >
                <TableBody >
                    <TableRow>
                        <TableCell sx={{border:1}}> <Typography variant='body2'> Products </Typography> </TableCell>
                        <TableCell sx={{border:1}}> <span style={{fontWeight:'bold'}}> ${bill}  </span>  </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{border:1}}> <Typography variant='body2'> Shipping </Typography> </TableCell>
                        <TableCell sx={{border:1}}> <span style={{fontWeight:'bold'}}> $0.00 </span>  </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{border:1}}> <Typography variant='body2'> Additional Charges </Typography> </TableCell>
                        <TableCell sx={{border:1}}> <span style={{fontWeight:'bold'}}> ${charges} </span>  </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{border:1}}> <Typography variant='body2'> Total </Typography> </TableCell>
                        <TableCell sx={{border:1}}> <span style={{fontWeight:'bold'}}> ${totalbill} </span>  </TableCell>
                    </TableRow>
                </TableBody>
                </Table>
               </TableContainer>
               <Button variant='body2' sx={{marginTop:'10px',width:'100%',backgroundColor:'grey',"&:hover":{backgroundColor:'grey'}}}
             onClick={CheckOut}
               > Place Order </Button>
           </Box>

        </Box>




        </Container>




<Modal open={open} onClose={()=>setOpen(false)}>
    <Alert onClose={()=>setOpen(false)} severity='error'> Cart or Shipping Address is not present! redirecting you back... </Alert>
</Modal>


        </>
     );
}
 
export default PlaceOrder;