import { CircularProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'

const NotFound = () => {
    return ( <>
    
    <Box sx={{height:'500px',display:'flex',alignItems:'center',justifyContent:'center'}}>
<Box> 
<CircularProgress/>
<Box sx={{marginLeft:'-40px'}}>
 <Typography > Page Not Found! </Typography>
</Box>
</Box>      
    </Box>
    
    </> );
}
 
export default NotFound;