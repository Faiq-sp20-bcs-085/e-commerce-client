import axios from 'axios';
import React, { useEffect,useState } from 'react'
import jwt_decode from 'jwt-decode'
import { Box, Container } from '@mui/system';
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Cancel, Done, Remove } from '@mui/icons-material';

const UserOrders = () => {

    const[orders,setOrders]=useState([])

useEffect(()=>{
const token=sessionStorage.getItem('token');
if(token){
   let id=jwt_decode(token);
   let {_id}=id;
   axios.get(`http://localhost:5000/api/orders/${_id}`).then((res)=>{
    console.log(res.data)
setOrders(res.data)
   }).catch((e)=>{
    console.log(e);
   })
}
},[])

   if(orders.length===0){
return(
    <>
    <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'500px'}}>
            <CircularProgress  />
            </Box>
    </>
)
   }

    return ( <>
    
    <Container>
       <Box mt={6} sx={{display:'flex',justifyContent:'center'}}>  </Box>
       <Box sx={{display:'flex',justifyContent:'center'}}>
       <TableContainer>
        <Table>
            <TableHead >
                <TableRow>
                    <TableCell>
                        <Typography variant='h6' > ID</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant='h6'> STATUS</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant='h6'> DATE</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant='h6'> BILL</Typography>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody sx={{}}>
                {orders.map((order)=>{
                    return(
                        
                         <TableRow >
                            <TableCell > <Typography variant='body2' sx={{fontWeight:'bold'}} > {order._id} </Typography> </TableCell>
                            
                            {order.status==='Pending' ? (
                                <TableCell> <Remove sx={{fontSize:'30px',marginLeft:'20px'}} /></TableCell>
                            ): (
                                <>
                                <TableCell> <Done sx={{fontSize:'30px',marginLeft:'20px'}} /></TableCell>
                                </>
                            )  }

                            <TableCell > <Typography variant='body2' sx={{fontWeight:'bold'}} > {order.orderDate.substr(0,10)} </Typography> </TableCell>
                            <TableCell > <Typography variant='body2' sx={{fontWeight:'bold'}} > ${order.bill} </Typography> </TableCell>

                         </TableRow>
                        
                    )
                })}
            </TableBody>
        </Table>
       </TableContainer>
       </Box>
    </Container>
    
    </> );
}
 
export default UserOrders;