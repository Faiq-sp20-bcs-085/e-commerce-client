import MenuBar from "./Components/MenuBar";
import {Routes,Route} from 'react-router-dom';
import HomePage from "./Components/HomePage";
import Login from "./Components/Login";
import ProductDescription from "./Components/ProductDescription";
import Register from "./Components/Register";
import About from "./Components/About";
import Cart from "./Components/Cart";
import NotFound from "./Components/NotFound";
import MyProfile from "./Components/MyProfile";
import ShippingAddress from "./Components/ShippingAddress";

import Payment from "./Components/Payment";
import PlaceOrder from "./Components/PlaceOrder";

function App() {

  


  return (
   <>
   <MenuBar/>

<Routes>

<Route  path='/' element={<HomePage/>}   />
<Route path ='/Login' element={<Login/>} />
<Route path='/product/description' element={<ProductDescription/>}/>
<Route path='/Register' element={<Register/>}  />
<Route path='/About' element={<About/>}  />
<Route path ='/:id/Cart' element={<Cart/>} />
<Route  path='/user/profile' element={<MyProfile/>}  />
<Route path='/Shipping' element={<ShippingAddress/>}  />
<Route path ='/Payment' element={<Payment/>} />
<Route path='/Placeorder'  element={<PlaceOrder/>} />
<Route path ='*' element={<NotFound/>}  />


</Routes>

   </>
  );
}

export default App;
