import { makeStyles } from "@mui/styles";
export const useStyles= makeStyles({
 mainContainer:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    background:'#fd79a8',
    height:'100vh',
   // width:'100vw'

 },
box:{
    padding:10,
    margin:10,
    background:'#FFF',
    width:"60%",
    borderRadius:10
     
},
headingStyle:{
    fontWeight:'bold',
    fontSize:18,
    fontFamily:'Poppins',
    letterSpacing:1

}, 
rowStyle:{
    display:'flex',
    flexDirection:'row',
    justifyContent: 'space-between'
}

})

