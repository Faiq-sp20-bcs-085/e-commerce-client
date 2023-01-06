import { Alert, Avatar, Button, Card, CardContent, CardMedia, CircularProgress, Container, Grid, IconButton, Snackbar, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import {useState,useEffect} from 'react'
import jwt_decode from 'jwt-decode'
import axios from 'axios';
import { Add, AddCircle, Clear, Delete, Remove, RemoveCircle, WindowSharp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { ClearCart, DecreaseQuantity, DeleteItem, IncreaseQuantity, TotalBill } from '../Features/CartSlicer';


const Cart = () => {
const {cart}=useSelector((state)=>state.cart);
const {amount}=useSelector((state)=>state.cart);
const {bill}=useSelector((state)=>state.cart);
    const [loading,setLoading]=useState(true);
    const [user,setUser]=useState('');
   const dispatch=useDispatch();
    const [products,setProducts]=useState([])
    const [open,setOpen]=useState(false);
    const navigate=useNavigate();


    useEffect(()=>{
        setTimeout(()=>{
if(cart.length===0){
    navigate('/')
}
        },1500)
    })

    useEffect(()=>{
  dispatch(TotalBill())
    },[cart])

    if(cart.length===0){
        return(
            <>
            <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'500px'}}>
            <CircularProgress  />
            </Box>
            </>
        )
    }

 const cartItems=(amount)=>{
 if(amount ===1){
    return(
        <>
        <Typography> Subtotal ({amount} item): <span style={{fontWeight:'bold'}}> ${bill}  </span>   </Typography>
        </>
    )
 }
 else{
    if (amount>1){
        return(
            <>
            <Typography> Subtotal ({amount} items): <span style={{fontWeight:'bold'}}> ${bill} </span>  </Typography>
            </>
        )
    }
 }
 }


return(
    <>
    <Container>

     <Box mt={2} sx={{display:'flex',alignItems:'center'}} > <IconButton onClick={()=>{
        dispatch(ClearCart());
     }}> <Clear /> </IconButton> <Typography variant='body2'> Clear Cart </Typography> </Box> 

        <Box mt={1} sx={{display:'flex',justifyContent:'space-between'}}>
           
         <Grid>
            {cart.map((item)=>{
                return(
                    <>
                    <Grid container mt={2}>
                    <Card sx={{width:'850px',border:1,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <img src={`${item.image}`}  style={{height:'7rem',width:'7rem',objectFit:'cover'}} alt="" />
                        <Container sx={{display:'flex',justifyContent:'space-between'}}>
                            <Box sx={{display:'flex',alignItems:'center'}}> 
                         
                         <Typography mx={1} sx={{color:'blue'}}> {item.name} </Typography>
                         </Box>
                         <Box  sx={{display:'flex',alignItems:'center'}}>
                         <IconButton onClick={()=>{
                            if(item.qty===1){
                              setOpen(true);
                            }
                            else{
                                dispatch(DecreaseQuantity(item))
                            }
                         }} > <Remove/> </IconButton> 
                          <Box sx={{border:1,width:'20px',display:'flex',justifyContent:'center'}}>  {item.qty} </Box>
                          <IconButton  onClick={()=>{
                            dispatch(IncreaseQuantity(item))
                          }} > <Add/>  </IconButton> 
                         </Box>  
                         <Box sx={{display:'flex',alignItems:'center'}}> 
                           <Typography variant='h6'> ${item.price} </Typography>  
                          </Box>
                             
                          <Box sx={{display:'flex',alignItems:'center'}}> 
                          <IconButton onClick={()=>dispatch(DeleteItem(item))}> <Delete/> </IconButton>
                          </Box>

                        </Container>
                        </Card>
                    </Grid>
                    </>
                )
            })}
         </Grid> 

           <Box sx={{marginTop:'17px'}}>
               <Card sx={{width:'250px',height:'150px',boxShadow:5}} >
                <CardContent>
                  <Box sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                     {cartItems(amount)}
                    
                  </Box>
                  <hr />
                  
                </CardContent>
                <Box sx={{display:'flex',justifyContent:'center',alignItems:'center'}}> 
                    <Button variant='contained' sx={{backgroundColor:'lightgrey',"&:hover":{backgroundColor:'grey'}}} 
                    onClick={()=>{
                        navigate('/Shipping')
                    }}
                    > Go To Shipping </Button>
                  </Box>
               </Card>
           </Box>

        </Box>
        
    </Container>

    <Snackbar open={open} onClose={()=>setOpen(false)} >
        <Alert onClose={()=> setOpen(false)} severity='error'> Item quantity cannot be less than 1! </Alert>
    </Snackbar>
    
    </>
)


}
 
export default Cart;