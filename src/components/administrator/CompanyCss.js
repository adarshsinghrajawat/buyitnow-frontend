// import { makeStyles } from "@mui/material";
import { makeStyles } from "@mui/styles"

export const useStyles=makeStyles({

    mainContainer:{
        display:'flex',
        background:'#fd79a8',
        justifyContent:'center',
        alignItem:'center', 
        height:'100vh',
        width:'100vw'
    },

    box:{
      padding:'20px',
      marginTop:100,
      background:'#FFF',
    
      width:800,
      height:550
    },

    headingStyles:{
      fontWeight:'bold',
      fontSize:18,
      fontFamily:'Poppins',
      marginBottom:'20px',
      letterSpacing:1 

    },
    
    rowStyle:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between'
    }
})