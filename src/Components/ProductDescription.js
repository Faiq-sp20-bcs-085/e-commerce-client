import React from 'react'

import { useLocation } from 'react-router-dom';
import {useState,useEffect} from 'react'
import axios from 'axios';
import { Alert, Button, Card, CardContent, CircularProgress, Grid, IconButton, InputAdornment, Modal, Rating, Snackbar, TextField, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { Delete, Edit, Publish, Send, ShoppingBag } from '@mui/icons-material';
import jwt_decode from 'jwt-decode';
import {useNavigate} from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux';
import { AddToCart } from '../Features/CartSlicer';
import { confirmAlert } from 'react-confirm-alert';



const ProductDescription = () => {

   
    const [prodId,setProdId]=useState('')
    const navigate=useNavigate();
    const dispatch=useDispatch();
const [rating,setRating]=useState(Number)

const {cart}=useSelector((state)=>state.cart);

    const [product,setProduct]=useState({});
    const [user,setUser]=useState([]);
    const [text,setText]=useState('');
    const [userId,setUserId]=useState('')
    const [open,setOpen]=useState(null);
    const [modalopen,setModalopen]=useState(false)


useEffect(()=>{
    if(rating >0){
        axios.post(`http://localhost:5000/api/ratings/${prodId}`,{rating}).then(()=>{
            FetchProducts();
            setRating('')
            setOpen(true);
            }).catch((e)=>{
             console.log(e);
            })
    }
})

    useEffect(()=>{
        const prod_id=sessionStorage.getItem('prod_id')
        if(prod_id){
            
        setProdId(prod_id)
        axios.get(`http://localhost:5000/api/reviews/${prod_id}`).then((res)=>{
            setUser(res.data);
        }).catch((e)=>{
            console.log(e)
        })
        axios.get(`http://localhost:5000/api/products/${prod_id}`).then((res)=>{
           console.log(res.data);
           setProduct(res.data)
        }).catch((e)=>{
           console.log(e)
        })
        }

      },[])

      
     

      useEffect(()=>{
        const token=sessionStorage.getItem('token');
        if(token){
        setUserId(jwt_decode(token))
        
        }
    },[])
    


  

    const FetchProducts=()=>{
        axios.get(`http://localhost:5000/api/products/${prodId}`).then((res)=>{
           console.log(res.data);
           setProduct(res.data)
        }).catch((e)=>{
           console.log(e)
        })
    }

    if(product.length===0){
        return(
            <>
            <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'500px'}}>
            <CircularProgress  />
            </Box>
            </>
        )
    }

    const isReviews=()=>{
        if(user.length===0){
            return(
                <>
                <Typography variant='h6'> No Reviews Available! </Typography>  
               
                </>
            )
        }
        else{
            return(
                <>
                {user.map((comment,index)=>{
                    return(
                        <>
                       {comment.user.map((user,index)=>{
                        return(
                            <>
                            <Box sx={{display:'flex',alignItems:'center'}}> 
                            <img src={`${user.image}`} alt="" style={{height:'2.5rem',borderRadius:'50%',objectFit:'cover',width:'2.5rem'}} />
                            <Typography sx={{fontSize:'15px'}} mx={1}>  {user.name}: </Typography>
                            <IconButton disabled={user._id === userId._id? false : true}  > <Edit sx={{fontSize:'14px'}} /> </IconButton>
                            <IconButton disabled={user._id === userId._id? false : true} sx={{marginLeft:'-9px'}} 
                            onClick={()=>{}}
                            > <Delete sx={{fontSize:'14px'}} /> </IconButton>
                            </Box>
                            </>
                        
                        )
                       })}
                       <Box>
                        <Typography variant='body2'> {comment.text} </Typography>
                       </Box>
                       <Box mt={2}>

                       </Box>

                        </>
                    )
                })}
                
                </>
            )
        }
    }

    const isRating=(product)=>{
        if(product.rating>0){
            return(
                <>
                <Rating
                 value={product.totalrating}
                precision={0.5}
                readOnly
                 />
                 <hr />
                </>
            )
        }
       
    }
    
    return ( <>
    
<Container >

<Grid mx={12} gap={4} mt={2} container sx={{display:'flex'}} >
 
<Grid item>
  <img src={`${product.image}`} alt="" style={{height:'25rem',width:'25rem',objectFit:'cover'}} />
</Grid>

<Grid item>
<Card sx={{ marginLeft:'50px', height:'270px',boxShadow:5,width:'280px'}}>
    <CardContent>
     <Typography variant='h6'> {product.name} </Typography>
     <hr />
     {isRating(product)}
     
     <Typography > Description:</Typography>
     <Typography variant='body2'> {product.description} </Typography>
     <Typography mt={2}> Price: <span style={{fontWeight:'bold'}}>  ${product.price} </span>  </Typography>
     <Box mt={2} sx={{display:'flex',justifyContent:'center'}}>
     <Button endIcon={<ShoppingBag/>} variant='contained' sx={{backgroundColor:'lightgrey',"&:hover":{backgroundColor:'grey'}}}
     onClick={()=>{
        if(!userId){
        setModalopen(true);
        setTimeout(()=>{
            navigate('/Login')
        },2000)
        }else{
        
            dispatch(AddToCart(product))

           
            

        }
     }}
     > Add to Cart </Button>
     </Box>
    </CardContent>
</Card>

</Grid>

</Grid>

<Box mt={2}> 
<Typography variant='h6'> Reviews: </Typography>
{isReviews()}
<hr />
</Box>
<Box mt={4}>

<Box sx={{display:'flex',alignItems:'center'}}>
    <Typography variant='h6'> Drop A Rating if You'd Like! </Typography>
    <Rating
    sx={{marginLeft:'20px'}}
    
     value={rating}
     onChange={(e)=>setRating(e.target.value)}
    />
    
</Box>
<Box mt={2}> 
<TextField

value={text}
placeholder='Enter Your Review here!'
fullWidth

onChange={(e)=>{setText(e.target.value)}}
InputProps={{
    endAdornment:(
        <InputAdornment position='end'> <IconButton color='primary' onClick={()=>{
            if(!userId){
                return navigate('/Login')
            }
            else {
               axios.post(`http://localhost:5000/api/reviews/${userId._id}/${prodId}`,{text}).then(()=>{
                window.location.reload();
               }).catch((e)=>{
                console.log(e);
               })
            }
           
        }} > <Send/> </IconButton>  </InputAdornment>
    )
}}
/>
</Box>
</Box> 
</Container>

<Snackbar open={open} onClose={()=>setOpen(false)} >
<Alert onClose={()=>setOpen(false)} severity='success'> Your Rating was Successfully Made! </Alert>
</Snackbar>

<Modal open={modalopen} onClose={()=>setModalopen(false)} >
<Alert onClose={()=>setModalopen(false)} severity='error' > You are not Logged In! Redirecting you to login screen...  </Alert>
</Modal>




    </> );
}
 
export default ProductDescription;