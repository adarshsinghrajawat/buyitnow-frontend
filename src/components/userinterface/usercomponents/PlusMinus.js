import {useState,useEffect} from 'react'
import { ButtonGroup,Button,useMediaQuery } from '@mui/material'
import { useDispatch } from 'react-redux'; 
export default function PlusMinus(props){
    const matches = useMediaQuery("(max-width:600px)");
    var dispatch=useDispatch()
 var product=props.product  
 const [value,setValue]=useState(product.qty)
 const handlePlus=()=>{
    var v=value+1
    product['qty']=v
    dispatch({type:'ADD_CART',payload:[product.productlistid,product]})
    setValue(v)
    props.pageRefresh()

 }

 const handleMinus=()=>{
    var v=value-1
    if(v==0)
    {dispatch({type:'DELETE_CART',payload:[product.productlistid]})
    props.pageRefresh()
   }
   else
    if(v>0)
   {  product['qty']=v 
      setValue(v)
      dispatch({type:'ADD_CART',payload:[product.productlistid,product]})
  
      props.pageRefresh()}
 }

    return(
        <div>
             <ButtonGroup sx={{ ml: "auto" }} disableElevation variant="contained" aria-label="Disabled elevation buttons">
                  <Button onClick={handlePlus} variant="outlined" size={matches ? "small" : "medium"} sx={{ fontSize: 16, mr: 0.5 }}>
                    +
                  </Button>
                  <div style={{padding:8}}>{value}</div>
                  <Button onClick={handleMinus} variant="outlined" color="error" size={matches ? "small" : "medium"} sx={{ fontSize: 16 }}>
                    -
                  </Button>
                </ButtonGroup>
        </div>
    )
}