import { Lock, PermIdentity, Person, Send } from '@mui/icons-material';
import { Avatar, Box, Button, InputAdornment, TextField, Typography } from '@mui/material';
import React from 'react'
import LoginBackground from '../Assets/Images/login.jpg'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import {useState,useEffect} from 'react'
import axios from 'axios';
import {Link, useLocation, useNavigate} from 'react-router-dom'
const Login = () => {
const navigate=useNavigate();
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
const {state}=useLocation();





    return ( <>
     
     <Box  sx={{backgroundImage:`url(${LoginBackground})`, backgroundSize:'cover',height:'500px',display:'flex',justifyContent:'center',alignItems:'center'}} >
      
      <Box sx={{height:'300px',width:'400px',borderColor:'black',backgroundColor:'white' }}>
       <Box mt={5} sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>  <AccountCircleIcon sx={{fontSize:'70px'}}  />   </Box> 
       
        <Box sx={{display:'flex',justifyContent:'center'}}>
        <TextField
         placeholder='Enter Your Email'
         value={email}
         type='email'
         variant='standard'
         onChange={(e)=>setEmail(e.target.value)}
          InputProps={{
            startAdornment:(
           <InputAdornment position='start'> <PermIdentity/> </InputAdornment>
            )
          }}
         />

        </Box>

        <Box mt={2} sx={{display:'flex',justifyContent:'center'}}>
        <TextField
         placeholder='Enter Your Password'
         type='password'
         value={password}
         variant='standard'
         onChange={(e)=>setPassword(e.target.value)}
        InputProps={{
            startAdornment:(
                <InputAdornment position='start'> <LockIcon/>  </InputAdornment>
            )
        }}
         />

        </Box>
        <Box mt={2} sx={{display:'flex',justifyContent:'center'}}> 
       <Button disabled={!email || !password? true:false} endIcon={<Send/>} variant='contained' sx={{backgroundColor:'grey'}}
       onClick={()=>{
        axios.post('http://localhost:5000/user/Login',{email,password}).then((res)=>{
            sessionStorage.setItem('token',res.data);
            if(state){
              navigate(state.from)
              window.location.reload();
            }
            else{
            navigate('/');
              window.location.reload();
            }
            
          
           
        }).catch((e)=>{
            alert(e.response.data)
        })
       }}
       > Submit  </Button>
       
        
       
        </Box>
       
      </Box>
        
     </Box>
    
    </> );
}
 
export default Login;