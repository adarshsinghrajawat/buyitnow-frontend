import * as React from 'react';
import {AppBar,Grid,Paper} from '@mui/material';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CategoryIcon from '@mui/icons-material/Category';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DraftsIcon from '@mui/icons-material/Drafts';
import LogoutIcon from '@mui/icons-material/Logout';
import { Logout } from '@mui/icons-material';
import {Routes,Route} from 'react-router-dom';
import DisplayAllCategories from './DisplayAllCategories';
import { useNavigate } from 'react-router-dom';
import DisplayAllProducts from "./DisplayAllProducts";
import Category  from "./Category";
import Product  from "./Product";
import ProductList from "./ProductList";
import Banner from './Banner';
import { ServerURL } from '../Services/ServerServices';
export default function DashBoard(props)
{
  var navigate=useNavigate()
  var admin=JSON.parse(localStorage.getItem('ADMIN'))
  console.log("ADMIN",admin)
 return(<div>
<AppBar position="static" style={{background:'#ED4C67'}}>
  <Toolbar variant="dense">
    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
      <MenuIcon style={{color:'#FFF'}} />
    </IconButton>
    <Typography variant="h6" component="div">
      <span>BuyitNOW</span>
    </Typography>
  </Toolbar>
</AppBar>

<Grid container spacing={3}>
  <Grid item xs={2}>
<div style={{display:'flex',flexDirection:'column'}}>
    <img src={`${ServerURL}/images/${admin.logo}`} style={{width:50,margin:20,borderRadius:40}}/>
    <Paper style={{width:220,height:70,background:'#dfe6e9',margin:20,display:'flex',alignItems:'center',justifyContent:'space-between'}} elevation={1} >
    <img src="/assets/adminlogin.png" style={{width:50,borderRadius:25,marginLeft:10,alignSelf:'center'}}/>
    <span style={{fontWeight:'bold',fontFamily:'poppins',marginRight:60}}>{admin.ownername}</span>
    </Paper>


<div style={{width:220,margin:20}}>

      <List component="nav">
         
            <ListItemButton
             
              onClick={()=>navigate("/dashboard/displayallcategories")}
               >
              <ListItemIcon>
              <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary= {<span style={{fontWeight:500,letterSpacing:1, fontFamily:'Poppins'}}>Category</span>} />
            
            </ListItemButton>
            <ListItemButton
             
             onClick={()=> navigate("/dashboard/displayallproducts")}
              >
             <ListItemIcon>
             <AddShoppingCartIcon/>
             </ListItemIcon>
             <ListItemText primary= {<span style={{fontWeight:500,letterSpacing:1, fontFamily:'Poppins'}}>Products</span>} />
           
           </ListItemButton>

           <ListItemButton onClick={()=> navigate("/dashboard/productlist")}>
             <ListItemIcon>
             <AddPhotoAlternateIcon/>
             </ListItemIcon>
             <ListItemText primary= {<span style={{fontWeight:500,letterSpacing:1, fontFamily:'Poppins'}}>Products List</span>} />
           
           </ListItemButton>

           <ListItemButton  onClick={()=> navigate("/dashboard/Banner")}
              >
             <ListItemIcon>
             <AddPhotoAlternateIcon/>
             </ListItemIcon>
             <ListItemText primary= {<span style={{fontWeight:500,letterSpacing:1, fontFamily:'Poppins'}}>Banners</span>} />
           
           </ListItemButton>
            <Divider/>

            <ListItemButton
             
             // onClick={(event)=> handleListItemClick(event,0)}
              >
             <ListItemIcon>
             <Logout/>
             </ListItemIcon>
             <ListItemText primary= {<span style={{fontWeight:500,letterSpacing:1, fontFamily:'Poppins'}}>Logout</span>} />
           
           </ListItemButton>
      
            </List>
</div>
</div>
</Grid>
<Grid item xs={10}>
 <Routes>
 <Route element={<DisplayAllCategories/>} path={"/displayallcategories"} />
 <Route element={<Category/>} path={"/category"} />
 <Route element={<DisplayAllProducts/>} path={"/displayallproducts"} />
 <Route element={<Product/>} path={"/product"} />
 <Route element={<ProductList/>} path={"/productlist"} />
 <Route element={<Banner/>} path={"/banner"} />

 </Routes>
</Grid>
</Grid>
 </div>)
     
}