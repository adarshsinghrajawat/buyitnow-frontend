import React,{createRef,useEffect,useState} from "react";
import Slider from "react-slick";
import { useTheme } from '@mui/material/styles';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ServerURL, getData } from "../../Services/ServerServices";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useMediaQuery } from "@mui/material";
export default function MainSlider()
{    const[images,setImages]=useState([])
    const fetchBannerImages=async()=>{
      var result=await getData('banner/fetch_banner_images')
    
      var dataImages=await result.data[0].bannerpicture
     
      var im=dataImages.substring(0,dataImages.length-1).split(",")
     
      setImages(im)
    }
    useEffect(function(){
      fetchBannerImages()

    },[]);
    const theme=useTheme();
   const matches=useMediaQuery(theme.breakpoints.down('sm'))
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed:5000,
        arrow:false,
      };

   var slider=createRef()
            
      function handleLeftClick(){
        slider.current.slickNext()
      }
      function handleRightClick(){
        slider.current.slickPrev()
      }

      function playImages() {
        return images.map((item) => {
          return (
            <div><img src={`${ServerURL}/images/${item}`} style={{ width: "100%" }}/></div>)
        })
      }
   
   
      return(
       <div style={{position:'relative'}}>
        <div style={{background:'#fff',width:45,height:45,borderRadius:18,display:'flex',alignItems:'center',position:'absolute',left:'1%',top:'40%',zIndex:1,opacity:0.7}}>
       <KeyboardArrowLeftIcon onClick={handleLeftClick} style={{fontSize:35}}/>
       </div>
        <Slider ref={slider} {...settings}>
            {playImages()}
            </Slider> 
            <div style={{background:'#fff',width:45,height:45,borderRadius:18,display:'flex',alignItems:'center',position:'absolute',right:'1%',top:'40%',zIndex:1,opacity:0.7}}>
        <KeyboardArrowRightIcon onClick={handleRightClick} style={{fontSize:35}}/>
        </div>
        </div>
    )

}