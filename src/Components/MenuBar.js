import { AppBar, Badge, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { Link } from 'react-router-dom';
import {useState,useEffect} from 'react'
import Image from '../Assets/Images/ship.jpg'
import axios from 'axios'
import { useDispatch,useSelector } from 'react-redux';
import { setCategory } from '../Features/CategorySlicer';
import { CreditCard, Dashboard, HowToReg, Login, Logout, Person, Person2, ShoppingBag, ShoppingCart } from '@mui/icons-material';
import {useNavigate} from 'react-router-dom'
import jwt_decode from 'jwt-decode';
import { persistor } from '../store';



const MenuBar = () => {


const [categories,setCategories]=useState([]);
  const navigate=useNavigate();

const dispatch=useDispatch();
const {products}=useSelector((state)=> state.category);
const amount=useSelector((state)=>state.cart.amount);

useEffect(()=>{
    axios.get('http://localhost:5000/api/categories').then((res)=>{
        setCategories(res.data)
    }).catch((e)=>{
        console.log(e);
    })
    },[])

    useEffect(()=>{
        const token=sessionStorage.getItem('token');
        if(token){
            let id=jwt_decode(token);
            let {_id}=id;
            axios.get(`http://localhost:5000/api/users/${_id}`).then((res)=>{
               setUser(res.data);
               
            }).catch((e)=>{
               console.log(e);
            })
        }
       
    },[])

    
    
    const [anchorEl,setAnchorEl]=useState(null);
    const [open,setOpen]=useState(false);
    const [profileanchorEl,setProfileachorEl]=useState(null);
    const [openprofile,setOpenprofile]=useState(false);
    

    const LoggedIn=()=>{
        if(!user){
            return(
                <>
                <Box>
   <IconButton onClick={(e)=>{
  setProfileachorEl(e.currentTarget);
  setOpenprofile(true);
   }} > <Person2 sx={{fontSize:'40px'}} />  </IconButton>
</Box>
                </>
            )
        }
        else if(user.isAdmin ===true) {
            return(
                <>
                <Box gap={2} sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                    
                    <Box> 
                        <Box sx={{"&:hover":{cursor:'pointer'}}}  onClick={(e)=>{setProfileachorEl(e.currentTarget);setOpenprofile(true)} } > 
                    <img src={`${user.image}`} style={{height:'40px',borderRadius:'60%'}} alt="" />
                    </Box>
                    <Typography variant='body2' sx={{color:'black',marginLeft:'-8px'}}> Welcome </Typography> 
                    </Box>

                </Box>
                
                </>
            )
        }
        else{
            return(
                <>
                <Box  sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                    
                    <Box> 
                        <Box sx={{"&:hover":{cursor:'pointer'}}}  onClick={(e)=>{setProfileachorEl(e.currentTarget);setOpenprofile(true)} } > 
                    <img src={`${user.image}`} style={{height:'2.5rem',borderRadius:'50%',objectFit:'cover',width:'2.5rem'}} alt="" />
                    </Box>
                    
                    <Typography variant='body2' sx={{color:'black',marginLeft:'-8px'}}> Welcome </Typography> 
                    
                    </Box>
                    <Box>
                      <IconButton sx={{marginBottom:'17px'}}  disabled={amount ===0?true :false} onClick={()=> navigate(`/${user._id}/Cart`)}>  <Badge badgeContent={amount} color='primary'   ><ShoppingBag sx={{height:'25px'}}/> </Badge>    </IconButton> 
                    </Box>
                </Box>
                </>
            )
        }
    }

    const userProfile=()=>{
        if(!user){
            return(
                <>
                <Box sx={{display:'flex',alignItems:'center'}}> 
                 <MenuItem  onClick={()=>{
    navigate('/Login');
    setOpenprofile(false);
    }} > <Login/> <Typography variant='body2' sx={{marginLeft:'4px'}}>  Login  </Typography>  </MenuItem>
    </Box>
    <Box sx={{display:'flex',alignItems:'center'}}> 
    <MenuItem onClick={()=>{
        navigate('/Register');
        setOpenprofile(false);
    }} > <HowToReg/>  <Typography variant='body2' sx={{marginLeft:'4px'}}>  Register  </Typography> </MenuItem>
    </Box>
                </>
            )
        }
        else if(user.isAdmin ===true){
          return(
            <>
            <Box sx={{display:'flex',alignItems:'center'}}> 
            <MenuItem onClick={()=>{navigate('/admin/dashboard');setOpenprofile(false)}}  > <Dashboard/> <Typography variant='body2' sx={{marginLeft:'4px'}}>  Dashboard </Typography> </MenuItem>
           
            </Box>
            <Box sx={{display:'flex',alignItems:'center'}}>
              <MenuItem> <CreditCard/> <Typography variant='body2' sx={{marginLeft:'4px'}}> Orders </Typography> </MenuItem>
            </Box>
            <Box sx={{display:'flex',alignItems:'center'}}>
              <MenuItem onClick={()=>{sessionStorage.removeItem('token');  persistor.pause(); persistor.flush().then(()=>{persistor.purge()});  navigate('/'); setOpenprofile(false); window.location.reload() }}> <Logout/> <Typography variant='body2' sx={{marginLeft:'4px'}}> Logout </Typography> </MenuItem>
            </Box>
            </>
          )
        }
        else{
          return(
            <>
            <Box sx={{display:'flex',alignItems:'center'}}> 
            <MenuItem onClick={()=>{navigate('/user/profile'); setOpenprofile(false) } }> <Person/> <Typography variant='body2' sx={{marginLeft:'4px'}}>  My Profile </Typography> </MenuItem>
           
            </Box>
            <Box sx={{display:'flex',alignItems:'center'}}>
              <MenuItem onClick={()=>{navigate('/user/orders');setOpenprofile(false)}}> <CreditCard/> <Typography variant='body2' sx={{marginLeft:'4px'}}> My Orders </Typography> </MenuItem>
            </Box>
            <Box sx={{display:'flex',alignItems:'center'}}>
              <MenuItem onClick={()=>{sessionStorage.removeItem('token');  persistor.pause();  persistor.flush().then(()=>{persistor.purge()}) ; navigate('/'); setOpenprofile(false); window.location.reload() }}> <Logout/> <Typography variant='body2' sx={{marginLeft:'4px'}}> Logout </Typography> </MenuItem>
            </Box>
            </>
          )  
        }
    }

  
    const [user,setUser]=useState('');

    return (
         <>
    
    <AppBar position='static'>
<Toolbar sx={{display:'flex',justifyContent:'space-between', backgroundImage:`url(${Image})`,backgroundSize:'cover'}}>
<Box>
   <Link to='/'>  <img src={require('../Assets/Images/Logo.png')} style={{height:'80px',color:'blue'}}  alt="" /> </Link>
</Box>

<Box gap={4} sx={{display:'flex', }}>
    <Typography sx={{"&:hover":{textDecoration:'underline'}}} > <Link to='/About' style={{textDecoration:'none',color:'black' }} > About  </Link> </Typography>
    <Typography sx={{"&:hover":{textDecoration:'underline'}}}  > <Link style={{textDecoration:'none',color:'black'}} > Contact Us </Link> </Typography>
    <Typography > <Link onClick={(e)=>{
        setAnchorEl(e.currentTarget);
        setOpen(true);
    }} style={{textDecoration:'none',color:'black'}} > Categories </Link> </Typography>
</Box>


{LoggedIn()}



</Toolbar>

   </AppBar> 
    
<Menu anchorEl={anchorEl} open={open} onClose={()=>{setOpen(false)}}  >
    {categories.map((category)=>{
        return(

            <>
            <MenuItem  onClick={()=>{
                if(category.name ==='All Products'){
                    axios.get('http://localhost:5000/api/products').then((res)=>{
                        dispatch(setCategory(res.data))
                        setOpen(false)
                    }).catch((e)=>{
                        console.log(e);
                    })
                }
                else{
                    axios.get(`http://localhost:5000/api/categories/${category._id}`).then((res)=>{
                        dispatch(setCategory(res.data))
                        setOpen(false)
                    }).catch((e)=>{
                        console.log(e);
                    })
                }
            }} > {category.name} </MenuItem>
            
            </>
        )

    })}
</Menu>
 

<Menu  anchorEl={profileanchorEl} open={openprofile} onClose={()=>setOpenprofile(false)} >
 {userProfile()}
   
   
</Menu>


    </> );
}
 
export default MenuBar;