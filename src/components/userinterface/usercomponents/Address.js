import { CloseRounded } from "@mui/icons-material";
import { Dialog, DialogContent, Grid, TextField, useMediaQuery } from "@mui/material";

import { useState } from "react";
import { postData } from "../../Services/ServerServices";
import { UseSelector, useDispatch } from "react-redux";

const Address = (props) => {
  const matches = useMediaQuery("(max-width:600px)");
  var dispatch=useDispatch()
  const [fullName, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [address, setAddress] = useState("");
  const handleClose = () => {
    props.setOpen(false);
  };
  const handleClick = async() => {
    
    var body={"userid":props.userData.userid,"fullname":fullName,"phone":props.userData.mobileno,"mobileno":props.userData.mobileno,"city":city,"state":state,"zipcode":zipCode,"address":address}
    var result=await postData('userinterface/add_user_address',body)
    if(result.status)
    { alert("Address Submiited")
    dispatch({type:'ADD_USER',payload:[body.mobileno,[body]]}) 
      props.setBtnMsg("Make Payment")
    props.setAddressState(false)
  }
    else
    { alert("Fail to Submit Address")}
      

  };
//   const handleClick=()=>{
//   let FormData=new FormData();
  
//   FormData.append("fullname",fullName)
//   FormData.append("phone",phone);
//   FormData.append("city",city);
//   FormData.append("state",state);
//   FormData.append("zipcode",zipCode);
//   FormData.append("address",address);
// };
  return (
    <>
      <Dialog fullScreen={matches} PaperProps={{ style: { borderRadius: 6 } }} maxWidth="md" open={props.addressState} fullWidth aria-labelledby="responsive-dialog-title">
        <DialogContent width={"100%"}>
          <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
            <h2 style={{ fontSize: 20, margin: "3px 0px 14px 0px" }}>Add New Address</h2>
            <CloseRounded onClick={handleClose} sx={{ cursor: "pointer" }} />
          </div>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField onChange={(e) => setName(e.target.value)} fullWidth label="Full Name" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField value={props.userData.mobileno} onChange={(e) => setPhone(e.target.value)} fullWidth label="Phone Number" />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField onChange={(e) => setState(e.target.value)} fullWidth label="State" />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField onChange={(e) => setCity(e.target.value)} fullWidth label="City" />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField onChange={(e) => setZipCode(e.target.value)} fullWidth label="Zip Code" />
            </Grid>
            <Grid item xs={12}>
              <TextField onChange={(e) => setAddress(e.target.value)} multiline rows={3} fullWidth label="Address" />
            </Grid>
            <Grid item xs={12}>
              <button onClick={handleClick} style={{ width: "100%", backgroundColor: "#1dd391", outline: "none", border: "none", padding: "12px 0px", borderRadius: "24px", color: "white", fontSize: "18px", cursor: "pointer" }}>
                Submit
              </button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Address;
