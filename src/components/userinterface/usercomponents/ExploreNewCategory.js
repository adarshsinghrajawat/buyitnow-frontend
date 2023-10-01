import React, { createRef } from "react";
import Slider from "react-slick";
import { ServerURL } from "../../Services/ServerServices";
import { useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { Rowing } from "@mui/icons-material";

export default function ExplorNewCategory(){
      
    const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'))
 var settings = {
    dots: false,
    infinite: true,
    speed: false,
    slidesToShow: 6,
    slidesToScroll: false,
    autoplay: false,
    autoplaySpeed: false,
    arrow: false,
    
    
  };

  var slider=createRef()
  var images=['explore.webp','explore1.webp','explore2.webp','explore3.webp','explore4.webp','explore5.webp']
 
  function ExplorImage()
  { return images.map((item)=>{
        return(<div ><img src={`${ServerURL}/images/${item}`} style={{width:'70%'}}/></div>)
  })
  } 





    return(<div style={{position:'relative'}}>
        
<h3>Explore New Categories</h3>
<Slider ref={slider} {...settings}>
 {ExplorImage()}
 </Slider>


    </div>)





}