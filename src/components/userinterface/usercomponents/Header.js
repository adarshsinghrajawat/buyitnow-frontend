
import {AppBar,Button,Paper,useMediaQuery} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import HomePageDrawer from "./HomePageDrawer";
import { useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Badge from '@mui/material/Badge';

import React, { useEffect, useState } from "react";
export default function Header(props) {

  const theme = useTheme();
  var navigate=useNavigate()
  var products=useSelector((state)=>state.cart)
  var totalproducts=Object.keys(products)
  console.log("Total Product:",totalproducts)
  var location = useLocation()
  const matches = useMediaQuery(theme.breakpoints.down('md'))
  const [open,SetOpen]=useState(false)

  const handleOpenDrawer=()=>{
    SetOpen(true)
  }
  return (
  <div style={{display:'flex',flexDirection:'column'}}>
  
      <AppBar position="static" style={{ display: 'flex', alignItems: 'left', background: 'rgba(93,9,121,1)', height: 50, justifyContent: 'center', flexDirection: 'row' }}>
        <div style={{ marginLeft: 25, display: 'flex', alignItems: 'center', justifyContent: 'space-between', width:'100%' }}>
           {matches?<MenuIcon onClick={handleOpenDrawer}/>:<></>}
         <div> 
          <div style={{marginLeft:30,display:'flex',alignItems:'center'}}>
          <LocationOnIcon />
            <span style={{ fontFamily: 'poppins', fontWeight: 'bold', marginLeft: 5 }}>BuyitNOW</span></div>
            </div>
          <div style={{ fontFamily: 'poppins', fontWeight: 500, width: !matches?250:60, display: 'flex', justifyContent: 'space-between',paddingRight:20}}>
           
            {!matches?<><span>Offers</span>
            <span>Deals</span>
            <span>Coupons</span>
            <span onClick={()=>navigate("/cart")}> <Badge badgeContent={totalproducts.length} color="primary">
            <ShoppingCartIcon/>
             </Badge></span>
            <span><PersonIcon/></span></>
            :<> <span><ShoppingCartIcon/></span>
            <span><PersonIcon/></span></>}
          </div>
        </div>
      </AppBar>
{location.pathname=='/home'?
      <Paper style={{width:'100%',height:70,display:'flex',alignItems:'left',justifyContent:'left'}} elevation={1}>
      <img src="/assets/appbar.png" style={{width:60,marginLeft:50,height:60}}/>
       <div style={{marginLeft:30,width:500,display:'flex',justifyContent:'space-between'}}>
        <Button style={{color:'rgba(93,9,121,1)', alignContent:'center',fontWeight:600,justifyContent:'center'}}>Category</Button>
        <Button style={{color:'rgba(93,9,121,1)', alignContent:'center',fontWeight:600,justifyContent:'center'}}>Deals</Button>
        <Button style={{color:'rgba(93,9,121,1)', alignContent:'center',fontWeight:600,justifyContent:'center'}}>What's New</Button>
        <Button style={{color:'rgba(93,9,121,1)', alignContent:'center',fontWeight:600,justifyContent:'center'}}>Trending</Button>
       </div>
      </Paper>
    :<></>}
       <HomePageDrawer open={open} SetOpen={SetOpen} />
    </div>
 
  );
}