import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import { Box, Button, ButtonGroup, Divider, Grid, useMediaQuery } from "@mui/material";
import { ServerURL } from "../../Services/ServerServices";
import PlusMinus from "./PlusMinus";
import { useEffect,useState } from "react";
const CartItems = (props) => {
  const matches = useMediaQuery("(max-width:600px)");
 
  return (
    <Grid container item xs={12} md={7} gap={3}>
      <Grid item xs={11.6} mx="auto" bgcolor="white" px={2} maxHeight={450} overflow="auto">
        <div style={{ textAlign: "center", color: "red", fontWeight: "bold", fontSize: 20, display: props.products[0] ? "none" : "block" }}>Cart is Empty.</div>
        {props.products.map((item, i) => {
          return (
            <div>
              <Box display="flex" p={matches ? 1 : 2} alignItems="center" justifyContent="space-between">
                <div style={{display:'flex' }}>
                <img src={`${ServerURL}/images/${item.productimage}`} alt="item" style={{ width: matches ? 55 : 70 }} />
                <div style={{ display: "flex", flexDirection: "column", marginLeft: 20, fontSize: matches ? 12 : 14 }}>
                  <span>{item.productname}</span>
                  <span>
                    {item.weight} {item.pricetype}
                  </span>
                  <b style={{ fontSize: matches ? 14 : 16, marginTop: 10 }}>Rs. {item.offerprice}</b>
                </div>
                </div>
               <PlusMinus product={item} pageRefresh={props.pageRefresh} />
              </Box>
              <Divider />
            </div>
          );
        })}
      </Grid>
      <Grid item xs={11.6} mx="auto" bgcolor="white" px={2} pb={1.5}>
        <h3>Delivery Partner Tip</h3>
        <p style={{ color: "gray", fontSize: matches && 14 }}>The enitire amount will be sent to your delivery partner.</p>
        <div style={{ display: "flex", gap: 10 }}>
          {["Rs. 10", "Rs. 20", "Rs. 40", "Rs. 70"].map((item, i) => {
            return (
              <Button key={i} variant="outlined" size={matches ? "small" : "medium"} sx={{ borderRadius: 50 }} color="primary">
                {item}
              </Button>
            );
          })}
        </div>
      </Grid>
      <Grid item xs={11.6} mb={3} mx="auto" bgcolor="white" display="flex" alignItems="center" justifyContent="center" gap={3}>
        <DeliveryDiningIcon fontSize="large" />
        <p>
          See how we ensure our delivery partner's safetey <span style={{ color: "orange", cursor: "pointer" }}>Learn more</span>
        </p>
      </Grid>
    </Grid>
  );
};

export default CartItems;
