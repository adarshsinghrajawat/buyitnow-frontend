import React, { createRef, useEffect, useState } from "react";

import { getData, ServerURL } from "../../Services/ServerServices";
import { useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

export default function ExplorCategory() {

  const theme = useTheme();
  const navigate=useNavigate()
  const md = useMediaQuery(theme.breakpoints.down('md'))
  const sm = useMediaQuery(theme.breakpoints.down('sm'))
  const xs = useMediaQuery(theme.breakpoints.down('xs'))
  const xl = useMediaQuery(theme.breakpoints.down('xl'))
  const lg = useMediaQuery(theme.breakpoints.down('lg'))
  
  const [categoryList, setCategoryList] = useState([])




  const fetchCategories = async () => {
    var result = await getData('userinterface/fetch_all_category')
    setCategoryList(result.data)
  }
  useEffect(function () {
    fetchCategories()
  }, []);


  const handleClick=(categoryid)=>{
     navigate(`/AllCategory`,{state:{categoryid:categoryid,page:'ExploreCategory'}})
  }

  function ExplorImage() {
    return categoryList.map((item) => {
      return (<div onClick={()=>handleClick(item.categoryid)} style={{
        width: '10%', padding: 3, background: '#f7eaf9', borderRadius:
          '10%', margin: 3, display: 'flex', alignItems: 'center', flexDirection: 'column'
      }}><div style={{
        color: '#792c85', fontFamily: 'Poppins',
        fontSize: xs ? 4 : sm ? 6 : md ? 8 : lg ? 20 : 20, fontWeight: 'bolder', textAlign: 'center'
      }}>{item.categoryname}</div><img src={`${ServerURL}/images/${item.icon}`} style={{ width: '60%', marginTop:'30%' }} /></div>)
    })
  }





  return (<div style={{ position: 'relative' }}>

    <h3>Explore By Categories</h3>
    <div style={{ padding: 10, marginLeft: 40, display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
      {ExplorImage()}
    </div>



  </div>)

}

