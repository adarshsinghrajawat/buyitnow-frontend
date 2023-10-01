import React,{createRef, useEffect} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {getData, ServerURL } from "../../Services/ServerServices";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
export default function DealsSlider()
{  
  const theme=useTheme();
 const matches=useMediaQuery(theme.breakpoints.down('sm'))
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay:false,
        autoplaySpeed:5000,
        arrow:false,
      };

   
   var slider=createRef()
      var images=['mainslider4.webp','mainslider1.webp','mainslider2.webp','mainslider3.webp','mainslider4.webp']
      
      function handleLeftClick(){
        slider.current.slickNext()
      }
      function handleRightClick(){
        slider.current.slickPrev()
      }

      function playImages() {
        return images.map((item) => {
          return (
            <div style={{marginLeft:10,marginRight:10}}><img src={`${ServerURL}/images/${item}`} style={{ width: "99%" }}/></div>)
        })
      }
   
   
      return(
       <div style={{position:'relative'}}>
         <div style={{background:'#fff',width:45,height:45,borderRadius:18,display:'flex',alignItems:'center',position:'absolute',left:5,top:150,zIndex:1,opacity:0.7}}>
       <KeyboardArrowLeftIcon onClick={handleLeftClick} style={{fontSize:34}}/>
       </div>
        <Slider ref={slider} {...settings}>
            {playImages()}
            
            </Slider> 
            <div style={{background:'#fff',width:45,height:45,borderRadius:18,display:'flex',alignItems:'center',position:'absolute',right:5,top:150,zIndex:1,opacity:0.7}}>
        <KeyboardArrowRightIcon onClick={handleRightClick} style={{fontSize:34}}/>
        </div>
        </div>
    )

}