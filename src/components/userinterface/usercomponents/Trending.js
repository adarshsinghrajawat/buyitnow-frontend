import React, {useState,useEffect, createRef } from "react";
import Slider from "react-slick";
import { ServerURL,getData,postData } from "../../Services/ServerServices";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button, Grid, useMediaQuery, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";


// import Button from "@mui/material";
import { useNavigate } from "react-router-dom"; 
export default function Trending() {
  const theme = useTheme();
  const navigate=useNavigate()
 
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: matches?2:7,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 5000,
    arrow: false,
    responsive: [
      
      {
        breakpoint: 1324,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  
    var slider=createRef();
 

  
  
  
  function handleLeftClick(){
    slider.current.slickNext();
   }
 function handleRightClick(){
  slider.current.slickPrev();
 }

 const [trendingProduct,setTrendingProduct]=useState([])
 const handleClick=async(pid)=>{
  navigate(`/AllCategory`,{state:{productid:pid,page:'Trending'}})
  
}
 const fetchProducts=async()=>{
     var result=await getData("userinterface/fetch_all_productstrending")
 
     setTrendingProduct(result.data)
 };
useEffect(function(){
 fetchProducts();
},[]);

  function playImages() {
    return trendingProduct.map((item) => {
      return (
        <div>
          <Paper onClick={()=>handleClick(item.productid)} elevation={3} style={{ width: '80%', height: 260, margin: 10 }}>
            <div style={{ padding: 10 }}>
              <div
                style={{
                  width: 160,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  src={`${ServerURL}/images/${item.image}`}
                  style={{ width: 75, height: 75 }}
                />
              </div>

              <div
                style={{
                  fontWeight: "bolder",
                  fontSize: 14,
                  fontFamily: "Poppins",
               
                }}
              >
                <p>{item.productname}</p>
              </div>
              <div style={{ color: "#888", fontWeight: 400, marginTop: 9 }}>
                <p>Get Best Deals</p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: 160,
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div>
                    Hurry Limited Stock
                  </div>
                  <div style={{ fontSize:16,fontWeight:500,marginBottom:0 }}>
                    <a></a>
                  </div>
                </div>

                
             
           
            </div>

            <Button
                  style={{
                    borderColor: "red",
                    color: "red",
                    width: "97%",
                    height: 32,
                    marginTop:"3%"
                  }}
                  variant="outlined"
                >
                  ADD
                </Button>
            </div>
          </Paper>
        </div>
      );
    });
  }

  return (
    <div style={{ position: "relative" }}>
      {matches ? (
        <></>
      ) : (
        <div
          style={{
            background: "#FFF",
            width: 36,
            height: 36,
            borderRadius: 18,
            display: "flex",
            alignItems: "center",
            position: "absolute",
            left: "1%",
            top: "50%",
            zIndex: 1,
            opacity: 0.7,
          }}
        >
          <KeyboardArrowLeftIcon
            onClick={handleLeftClick}
            style={{ fontSize: 34 }}
          />
        </div>
      )}
      <h3>Trending Products</h3>
      <Slider ref={slider} {...settings}>
        {playImages()}
      </Slider>

      {matches ? (
        <></>
      ) : (
        <div
          style={{
            background: "#FFF",
            width: 36,
            height: 36,
            borderRadius: 18,
            display: "flex",
            alignItems: "center",
            position: "absolute",
            right: "1%",
            top: "50%",
            zIndex: 1,
            opacity: 0.7,
          }}
        >
          <KeyboardArrowRightIcon
            onClick={handleRightClick}
            style={{ fontSize: 34 }}
          />
        </div>
      )}
    </div>
  );
        }