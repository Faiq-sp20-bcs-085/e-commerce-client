import { Button, Card, CardContent, CardMedia, CircularProgress, Container, Grid, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import axios from 'axios';

import {useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import Slider from "react-slick";
import { setCategory } from '../Features/CategorySlicer';
import {useNavigate} from 'react-router-dom'
import { CheckBox, Visibility } from '@mui/icons-material';
let image='https://img.freepik.com/premium-vector/e-commerce-icon-robotic-hand-internet-shopping-online-purchase-add-cart_127544-586.jpg?w=2000';
let image2='https://i.pinimg.com/originals/82/0c/98/820c981247cc8be38e2bc3c433fc77f4.jpg'
let image3='https://media.istockphoto.com/id/1206800961/photo/online-shopping-and-payment-man-using-tablet-with-shopping-cart-icon-digital-marketing.jpg?s=612x612&w=0&k=20&c=qG_9JB9ll4P5to97_HVxzMqhhzF0Gi1nWM_hNeiotbk=';
const HomePage = () => {

const navigate=useNavigate();
const {products}=useSelector((state)=>state.category);
const dispatch=useDispatch();




useEffect(()=>{
  axios.get('http://localhost:5000/api/products').then((res)=>{
    dispatch(setCategory(res.data))

  }).catch((e)=>{
    console.log(e);
  })
},[])



    var settings = {
       
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed:2500
      };
    
      if(products.length===0){
        return(
          <>
           <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'500px'}}>
            <CircularProgress  />
            </Box>
          </>
        )
      }

    return ( <>
    
    <Slider {...settings} >
     <div>
       <img src={`${image}`} alt="" style={{height:'700px', width:'100%'}} />
     </div>
     <div>
       <img src={`${image2}`} alt="" style={{height:'700px',width:'100%'}} />
     </div>
     <div>
       <img src={`${image3}`} alt="" style={{height:'700px',width:'100%'}} />
     </div>
     </Slider>
    
    <Container >
        <Grid  container  mt={2} sx={{display:'flex',justifyContent:'center'}} >
        {products.map((product)=>{
          return(
            <>
            <Grid m={1} item lg={3}  > 
              
              <Card sx={{width:'250px'}} >
                <Box sx={{display:'flex',justifyContent:'flex-end',alignItems:'center'}}>
                  <Visibility/> <Typography variant='body2' mx={1} > {product.views} </Typography>
                </Box>
              <Box onClick={()=>{
                axios.post(`http://localhost:5000/api/products/${product._id}`,{views:1}).then(()=>{
                  sessionStorage.setItem('prod_id',product._id);
                  navigate('/product/description' )
                }).catch((e)=>{
                  console.log(e)
                })
              } } sx={{"&:hover":{cursor:'pointer'}}}> 
                 <CardMedia 
                 component='img'
                 src={`${product.image}`}
                 height='250'
                 
                 />
                 <Box>
                <CardContent>
                 <Typography variant='body' > Title: <span style={{fontWeight:'bold'}}> {product.name} </span>  </Typography>
                  <Typography variant='body2'> Description: {product.description.substr(0,15).concat('...')} </Typography>
                  <Typography variant='h6'> ${product.price} </Typography>
                  
                </CardContent>
                </Box>
                </Box>
              </Card>

            </Grid>
            
            </>
          )
        })}
      
     </Grid>
        
    </Container>


    </> );
}
 
export default HomePage;