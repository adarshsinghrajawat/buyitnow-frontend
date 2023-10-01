import React, { useEffect, useState } from 'react'
import Location from './Location'
import { Grid } from '@mui/material'
import ProductNamePrice from './ProductNamePrice'
import Divider from '@mui/material/Divider'
import Quantity from './Quantity'

export default function ProductDetails(props) {
    console.log("Product Detalis:", props.data)

    return (<div style={{ display: 'flex', justifyContent: 'center' }}>
        <Grid container spacing={0}>
            <Grid item xs={12} style={{ width: '100%', margin: '10px 5px 0px 10px' }}>
                <Location />
            </Grid>
            <Grid item xs={12} style={{ width: '100%', margin: '10px 5px 0px 10px' }}>
                <ProductNamePrice data={props.data} />
            </Grid>
            <Grid item xs={12} style={{ width: '100%', margin: '30px 5px 0px 10px' }}>
                <Divider />
            </Grid>
            <Grid item xs={12} style={{ width: '100%', margin: '30px 5px 0px 10px' }}>
                <Quantity data={props.data} pageRefresh={props.pageRefresh} />
            </Grid>

        </Grid>


    </div>
    )
}