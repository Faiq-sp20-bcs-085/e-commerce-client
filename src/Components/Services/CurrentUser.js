

import jwt_decode from 'jwt-decode';


export const LoggedInUser=()=>{
const token=sessionStorage.getItem('token');
if(token){
    let decodedToken=jwt_decode(token);
    
    return decodedToken;
}
else{
    return ''
}
}