import React from 'react'
import {useState,useEffect,useRef} from 'react'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import { Box, Stack } from '@mui/system'
import { Button, CircularProgress, IconButton, TextField, Typography } from '@mui/material';

import Image from '../Assets/Images/profile.jpg';
import { useNavigate } from 'react-router-dom'
import { Edit, Send } from '@mui/icons-material'


const MyProfile = () => {
    const navigate=useNavigate();
    const [user,setUser]=useState({})
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [confirm,setConfirm]=useState('');
    const [image,setImage]=useState('')
const HiddenInput=useRef(null);

useEffect(()=>{
    const token=sessionStorage.getItem('token');
    if(token){
        let userId=jwt_decode(token);
        let {_id}=userId;
       axios.get(`http://localhost:5000/api/users/${_id}`).then((res)=>{
        setUser(res.data)
       }).catch((e)=>{
        console.log(e)
       })
      
    }
    else{
        navigate('/Login')
    }
},[])

if(!user){
    return(
        <>
        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'500px'}}  > <CircularProgress />  </Box>
        </>
    )
}

    return ( <>


      
<Box sx={{backgroundImage:`url(${Image})`, backgroundSize:'cover', display:'flex', height:'520px',alignItems:'center',justifyContent:'center' }} >

<Box sx={{height:'400px',backgroundColor:'white',width:'500px'}} >

<Box flex={1} sx={{display:'flex',justifyContent:'center'}}  >
<img src={`${user.image}`} alt="" style={{height:'6rem',width:'6rem',objectFit:'cover',borderRadius:'60%'}} />
 

</Box>


<Box flex={9} sx={{display:'flex',justifyContent:'center',alignItems:'center'}} >
<Box> 
    <Box> 
<TextField
sx={{width:'220px',marginLeft:'10px'}}
placeholder='Edit Your Email'
type='email'
variant='standard'
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>
</Box>
<Box mt={2}  sx={{display:'flex',justifyContent:'center',alignItems:'center'}} >
<TextField
sx={{width:'220px'}}
value={name}
placeholder='Edit Your Name'
variant='standard'
onChange={(e)=>setName(e.target.value)}
/>
</Box>
<Box mt={2}  sx={{display:'flex',justifyContent:'center',alignItems:'center'}} >
<TextField
sx={{width:'220px'}}
value={password}
type='password'
placeholder='Edit Your Password'
variant='standard'
onChange={(e)=>setPassword(e.target.value)}
/>
</Box>
<Box mt={2}  sx={{display:'flex',justifyContent:'center',alignItems:'center'}} >
<TextField
sx={{width:'220px'}}
value={confirm}
type='password'
placeholder='Confirm'
variant='standard'
onChange={(e)=>setConfirm(e.target.value)}
/>
</Box>
<Box mt={2}>
    <Typography variant='body2'> Edit Your Profile Picture (Optional) </Typography>
</Box>

<Box  sx={{display:'flex',justifyContent:'center',alignItems:'center'}} >
<input type="file" onChange={(e)=>setImage(e.target.files[0])} />
</Box>

<Box mt={2}  sx={{display:'flex',justifyContent:'center',alignItems:'center',marginRight:'35px'}} >
    <Button  disabled={ !name || !email || !password || !confirm? true:false }  variant='contained' sx={{backgroundColor:'lightgrey',"&:hover":{backgroundColor:'grey'}}} endIcon={<Send/>}
    onClick={()=>{
        const formdata=new FormData();
        formdata.append('name',name);
        formdata.append('password',password);
        formdata.append('confirm',confirm);
        formdata.append('email',email);
        formdata.append('Avatar',image);
        axios.put(`http://localhost:5000/api/users/${user._id}`,formdata).then(()=>{
            window.location.reload();
        }).catch((e)=>{
            console.log(e.response.data)
        })
    }}> Submit </Button>
</Box>

</Box>
</Box>


</Box>

</Box>





    </> );
}
 
export default MyProfile;