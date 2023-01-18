import { Alert, Button, Card, CardContent, CardMedia, CircularProgress, Container, Grid, IconButton, InputAdornment, Modal, Snackbar, Stack, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import axios from 'axios';

import {useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import Slider from "react-slick";
import { setCategory } from '../Features/CategorySlicer';
import {useNavigate} from 'react-router-dom'
import { CheckBox, Search, Sync, Visibility } from '@mui/icons-material';

let image='https://c0.wallpaperflare.com/preview/739/734/558/women-fashion-sale-hair.jpg';
let image2='https://img.freepik.com/free-vector/isometric-e-commerce-shopping-basket_79603-1000.jpg?w=2000'
let image3='https://segwitz.com/wp-content/uploads/2021/09/why-ecommerce-need-mobile-apps.jpg';

const HomePage = () => {
const [query,setQuery]=useState('');
const navigate=useNavigate();
const {products}=useSelector((state)=>state.category);
const dispatch=useDispatch();
const [open,setOpen]=useState(false);
const [pageNo,setPageNo]=useState(1);


useEffect(()=>{
  axios.get(`http://localhost:5000/api/products?page=${pageNo}`).then((res)=>{
    dispatch(setCategory(res.data))

  }).catch((e)=>{
    console.log(e);
  })
},[pageNo])

useEffect(()=>{
  if(query===''){
     axios.get(`http://localhost:5000/api/products?page=${pageNo}`).then((res)=>{
    dispatch(setCategory(res.data))

  }).catch((e)=>{
    console.log(e);
  })
  }

else if(query!==''){
     axios.put('http://localhost:5000/api/products/Search',{query}).then((res)=>{
    if(res.data.length===0){
    }
    else{
      dispatch(setCategory(res.data))
    }
  }).catch((e)=>{
    console.log(e);
  })
  }
},[query])






    var settings = {
       
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed:2500
      };
    
      

    return ( <>
    <Box mt={2} sx={{paddingX:'17px'}}> 
    <Slider {...settings} >
     <div>
       <img src={`${image}`} alt="" style={{height:'590px', width:'100%'}} />
     </div>
     <div>
       <img src={`${image2}`} alt="" style={{height:'590px',width:'100%'}} />
     </div>
     <div>
       <img src={`${image3}`} alt="" style={{height:'590px',width:'100%'}} />
     </div>
     </Slider>
    </Box>
    <Container >

      <Box mt={3} sx={{display:'flex',justifyContent:'center'}} >
        
       <TextField
       placeholder='Search for an Item here..'
       value={query}
       type='text'
       sx={{width:'50%'}}
       onChange={(e)=>setQuery(e.target.value)}
       InputProps={{endAdornment:(
        <InputAdornment position='end'> <Search/> </InputAdornment>
       )}}
        />

      </Box>


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
  
{products.length===6 && query === '' ?(
<>
  <Box mt={5} sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
      <Box>
        <IconButton
        onClick={()=>{
     setPageNo(pageNo+1)
        }}
        > <Sync sx={{fontSize:'35px'}}  /> </IconButton>  
        <Typography variant='body2'> Show more... </Typography>
      </Box>
      
    </Box>
</>
): query!==''? (
<>
</>
)
 :(
  
  <>
  <Box mt={5} sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
      <Box>
        <IconButton
        onClick={()=>{
     if(products.length===0){
      setPageNo(1)
     }
     else{
      setPageNo(pageNo -1)
     }
        }}
        > <Sync sx={{fontSize:'35px'}}  /> </IconButton>  
        <Typography variant='body2'> Go Back... </Typography>
      </Box>
      
    </Box>

  </>
)  }

  

{/* <Snackbar open={open} onClose={()=>{setQuery('');setOpen(false)}} >
  <Alert onClose={()=>{setQuery('');setOpen(false)} } severity='error'> No Item Found! </Alert> 
</Snackbar> */}

    </> );
}
 
export default HomePage;