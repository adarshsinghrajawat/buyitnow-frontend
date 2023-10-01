import { Facebook, Instagram, LinkedIn, ShowChart, Twitter } from "@mui/icons-material";
import { Divider, Grid, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import ShopIcon from "@mui/icons-material/Shop";
import AppleIcon from "@mui/icons-material/Apple";
export default function Footer() {
  const matches = useMediaQuery("(max-width:600px)");
  return (
    <>
      {/* How it works */}
      <Grid container spacing={3} py={3} gap={3} justifyContent="center">
        <Grid item xs={12} ml={3} textAlign={!matches ? "center" : "left"}>
          <h3 style={{ margin: "0 0" }}>How it works</h3>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box bgcolor="white" sx={{ boxShadow: "0 5px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }} display="flex" textAlign={!matches ? "center" : "left"} flexDirection={!matches ? "column" : "row"} alignItems="center" gap={matches ? 2 : 4} p={2} py={!matches ? 6 : 2}>
            <img src="/assets/placeanorder1.png" width={75} />
            <div>
              <b>Place an order</b>
              <div style={{ fontSize: 14, color: "gray" }}>Choose from a wide range of daily essentials.</div>
            </div>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box bgcolor="white" sx={{ boxShadow: "0 5px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }} display="flex" textAlign={!matches ? "center" : "left"} flexDirection={!matches ? "column" : "row"} alignItems="center" gap={matches ? 2 : 5} p={2} py={!matches ? 6 : 2}>
            <img src="/assets/dontblink.png" width={80} />
            <div>
              <b>Don’t Blink</b>
              <div style={{ fontSize: 14, color: "gray" }}>Our delivery partner will be at your door</div>
            </div>
          </Box>

        </Grid>
        <Grid item xs={12} md={3}>
          <Box bgcolor="white" sx={{ boxShadow: "0 5px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }} display="flex" textAlign={!matches ? "center" : "left"} flexDirection={!matches ? "column" : "row"} alignItems="center" gap={matches ? 0 : 4} p={2} py={!matches ? 6 : 2}>
            <img src="/assets/giftbox.png" width={80} />
            <div>
              <b>Enjoy</b>
              <div style={{ fontSize: !matches ? 14 : 12, color: "gray" }}>Boom! You’ll never have to wait for groceries again</div>
            </div>
          </Box>
        </Grid>
      </Grid>
      <Divider sx={{ mt: 2 }} />

      {/* Footer */}
      <Grid container py={4}>
        <Grid item xs={12} md={3} order={matches ? 1 : 0}>
          <h2>Gwalior Basket</h2>
          <Box color="gray" display="flex" gap={3} pb={1}>
            <Instagram />
            <Twitter />
            <Facebook />
            <LinkedIn />
          </Box>
          <p style={{ color: "gray", fontSize: 14 }}>© Buyitnow Private Limited</p>
        </Grid>
        <Grid item xs={12} md={6} container gap={5} justifyContent={matches ? "start" : "space-evenly"} fontSize={14}>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 15, paddingLeft: matches ? 0 : 40 }}>
            <li>Home</li>
            <li>Delivery Areas</li>
            <li>Careers</li>
            <li>Customer Support</li>
            <li>Press</li>
          </ul>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 15 }}>
            <li>Privacy Policy</li>
            <li>Terms of Use</li>
            <li>Responsible Disclosure Policy</li>
          </ul>
        </Grid>

        <Grid item xs={12} md={3}>
          <p>Download App</p>
          <Box display="flex" alignItems="center" fontSize={14} gap={1} border="1px solid gray" p={1} justifyContent="center">
            <AppleIcon /> <span>Get it on app store</span>
          </Box>
          <Box mt={2} display="flex" alignItems="center" fontSize={14} gap={1} border="1px solid gray" p={1} justifyContent="center">
            <ShopIcon /> <span>Get it on play store</span>
          </Box>
        </Grid>
        {matches ? (
          <Grid item xs={12}>
            <Divider sx={{ mt: 4 }} />
          </Grid>
        ) : (
          ""
        )}
      </Grid>
    </>
  );
}
