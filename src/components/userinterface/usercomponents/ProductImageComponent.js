import React, { useEffect, useState } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ServerURL, postData } from "../../Services/ServerServices";
import { AltRoute } from "@mui/icons-material";

var productImage = {
    dots: false,
    arrow: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    focusOnSelect: true,

}

var sliderNav = {
    slidesToShow: 2,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    dots: false,
    centerMode: true,
    focusOnSelect: true,
    vertical: true,
    centerMode: true
}


export default function ProductImageComponent(props) {
    // var images=props.data
    const [nav1, setNav1] = useState();
    const [nav2, setNav2] = useState();
    // const [i,setI]=useState(props.data.images);
    
    var img = JSON.parse(props.data)
    
    var i = img.images.split(",")
   
    // i.map((item)=>{
    //     alert(item.images)
    // })
    // const images = ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp",]
    // alert("images"+images)
    const setImageSlider = () => {
        return i.map((item) => {

            return (<div style={{ display: 'flex', justifyContent: 'center', width: '50%' }}>
                <img src={`${ServerURL}/images/${item}`} alt="xx" style={{ display: 'flex', justifyContent: 'center', width: '50%', paddingLeft: '25%' }} />
            </div>)
        })
    }

    return (<div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '100%', border: '1px solid #b2bec3', borderRadius: '7px', margin: '10px 5px 5px 40px' }}>
                <Slider {...productImage}>
                    {setImageSlider()}
                </Slider>
            </div>
        </div>
    </div>)
}