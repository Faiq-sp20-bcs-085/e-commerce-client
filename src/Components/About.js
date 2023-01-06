import { Button, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import image from '../Assets/Images/about.jpg'
import React from 'react'
import { Link } from 'react-router-dom';


const About = () => {
    return ( <>
   
  

   <Box sx={{backgroundImage:`url(${image})`, backgroundSize:'cover',height:'500px',display:'flex',alignItems:'center',justifyContent:'center' }}>
   <Box sx={{height:'400px'}}>
    <Box sx={{display:'flex',justifyContent:'center',marginTop:'130px'}}>
        
        
    </Box>
    <Box sx={{display:'flex',justifyContent:'center', marginLeft:'70px'}}> 
    <p>Join the world's leading, brands and content creators on our #1 Platform. <br/> Having established back in 2005, We have emerged to be one of the <br /> leading E Commerce Sites here in Pakistan. Fullfilling Our Customers <br /> needs  is our #1 priority. </p>
    
    </Box>
    <Box mt={1} sx={{display:'flex',justifyContent:'center'}}>
    <Button variant='contained' sx={{backgroundColor:'#CF9FFF',"&:hover":{backgroundColor:'#CF9FFF'}}} > <Link to='/' style={{textDecoration:'none'}} > Lets Get To Shopping Shall We?! </Link>  </Button>
    </Box>
   </Box>
   </Box>
        
   
    </> );
}
 
export default About;