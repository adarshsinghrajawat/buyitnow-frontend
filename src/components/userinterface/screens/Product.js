import React, { useState } from "react";
import Header from "../usercomponents/Header";
import Footer from "../usercomponents/Footer"
import { Grid } from "@mui/material";
import ProductImageComponent from "../usercomponents/ProductImageComponent";
import ProductDetails from "../usercomponents/ProductDetails";
import AboutProduct from "../usercomponents/AboutProduct";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';

export default function Product(props) {
    let location = useLocation()
    var data = location.state.data

    console.log("Products:", data)
    const [refresh, setRefresh] = useState(false)
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('sm'))
    const pageRefresh = () => {
        setRefresh(!refresh)

    }
    return (<div >
        <div style={{ width: '100%' }}>
            <Header />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', margin: 10, }}>
            {matches ? <>
                <Grid container spacing={0} >
                    <Grid item xs={11}>
                        <ProductImageComponent data={data} pageRefresh={pageRefresh} />
                    </Grid>

                    <Grid item xs={12}>
                        <ProductDetails data={data} pageRefresh={pageRefresh} />
                    </Grid>
                    <Grid item xs={12}>
                        <AboutProduct />
                    </Grid>

                </Grid>

            </> : <>
                <Grid container spacing={2} >
                    <Grid item xs={6}>
                        <ProductImageComponent data={data} pageRefresh={pageRefresh} />

                        <Grid item xs={12}>
                            <AboutProduct />
                        </Grid>
                    </Grid>

                    <Grid item xs={6}>
                        <ProductDetails data={data} pageRefresh={pageRefresh} />
                    </Grid>



                </Grid>
            </>}
        </div>
        <div style={{ width: '100%' }}>
            <Footer />
        </div>

    </div>)
}