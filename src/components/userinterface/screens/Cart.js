import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import DiscountIcon from "@mui/icons-material/Discount";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Button, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItemPricing from "../usercomponents/CartItemPricing";
import CartItems from "../usercomponents/CartItems";
import Header from "../usercomponents/Header";
import LoginDialog from "../usercomponents/LoginDialog";
import Address from "../usercomponents/Address";
import { useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";
export default function Cart() {
  var userdata = null
  const navigate = useNavigate()
  const [btnMsg, setBtnMsg] = useState("Add Address to Proceed")
  try {
    var user = useSelector((state) => state.user)
    var userdata = Object.values(user)[0]
  }
  catch (e) {
    console.log(e)
  }

  console.log("user data..........", userdata)
  const styles = {
    nav: { flexGrow: 1, background: "linear-gradient(89deg ,#21D9FD,#B721FF)", display: "flex", alignItems: "center", gap: 2, justifyContent: "center", fontSize: 20, position: "static", py: 1.5, color: "whitesmoke" },
    offr: { backgroundColor: "#bbf7d0", padding: "4px 20px", borderRadius: 6, marginLeft: 18, fontSize: 12 },
  };
  const [refresh, setRefresh] = useState(false);
  const [dialogState, setDialogState] = useState(false)
  const [addressState, setAddressState] = useState(false)
  const [userData, setUserData] = useState({ userid: '', mobileno: '' })
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart);
  const productList = Object.values(products)
  const keys = Object.keys(products);
  const pageRefresh = () => {
    setRefresh(!refresh)

  }
  const handleDelete = () => {
    keys.forEach((key) => {
      dispatch({ type: "DELETE_CART", payload: [key] });
    });
    setRefresh(!refresh);
  };
  const handleClick = () => {
    if (btnMsg == "Make Payment")
      navigate("/makepayment")
    else
      setDialogState(true)
  }
  return (
    <>
      <Header />
      <div style={{ backgroundColor: "#f2f2f2", width: "100%" }}>

        {/* Top Strip */}
        <Box sx={styles.nav}>
          <LocalShippingIcon fontSize="medium" /> Delivering to you very fast.
        </Box>

        {/* Cart Action */}
        <Grid container maxWidth={1300} mx="auto">
          <Grid item xs={12} p={2} display="flex" justifyContent="space-between">
            <div>
              <span>Cart ({Object.keys(products).length} Items)</span>
            </div>
            <Button onClick={handleDelete} variant="outlined" color="warning" size="small">
              Empty cart
            </Button>
          </Grid>

          {/* Left Part */}
          <CartItems products={productList} pageRefresh={pageRefresh} />

          {/* Right Part */}
          <Grid item xs={12} md={5}>

            {/* Coupons */}
            <Grid item xs={11.6} p={2} mx="auto" bgcolor="white" display="flex" alignItems="center" gap={2}>
              <DiscountIcon fontSize="large" style={{ color: "#05c46b" }} />
              <span>Avail Offers and Coupons</span>
              <ArrowRightIcon fontSize="large" style={{ color: "red", marginLeft: "auto" }} />
            </Grid>

            <CartItemPricing pageRefresh={pageRefresh} data={productList} />

            {/* Address */}
            <Grid item xs={11.6} p={2} py={4} mx="auto" bgcolor="white" mt={3} container gap={3}>
              <div style={{ display: "flex", flexDirection: 'column' }}>
                <div style={{ display: "flex", alignItems: 'center', justifyContent: 'center', width: 480 }}>
                  <LocationOnIcon fontSize="large" color="primary" />
                  <b style={{ color: "gray" }}>Delivery address</b>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', fontFamily: 'Poppins', fontSize: 'large', color: 'gray' }}>
                  {userdata != undefined ? <>

                    <div>{userdata[0]?.fullname}</div>
                    <div>{userdata[0]?.city} {userdata[0]?.state}</div>
                    <div>{userdata[0]?.zipcode}</div></> : <></>}
                </div>
              </div>
              {keys.length == 0 ? <Button disabled={true} onClick={handleClick} fullWidth size="large" variant="contained">
                {btnMsg}
              </Button> : <Button onClick={handleClick} fullWidth size="large" variant="contained">
                {btnMsg}
              </Button>}
            </Grid>
          </Grid>
        </Grid>
      </div>
      <LoginDialog setBtnMsg={setBtnMsg} userData={userData} setUserData={setUserData} setDialogState={setDialogState} state={dialogState} setAddressState={setAddressState} addressState={addressState} pageRefresh={pageRefresh} />
      <Address setBtnMsg={setBtnMsg} userData={userData} setUserData={setUserData} setAddressState={setAddressState} addressState={addressState} pageRefresh={pageRefresh} />
      {/* <LoginDialog userData={userData} setUserData={setUserData} setDialogState={setDialogState} state={dialogState} setAddressState={setAddressState}/>
      <Address userData={userData} setUserData={setUserData} setAddressState={setAddressState} addressState={addressState}/> */}

    </>
  );
}
