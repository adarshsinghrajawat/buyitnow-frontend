import React, { useEffect, useState } from 'react'

import { Button, Grid } from '@mui/material'
import { postData } from '../../Services/ServerServices'
import { useDispatch } from 'react-redux'
export default function Quantity(props) {
    var data = JSON.parse(props.data)
    
    var dispatch = useDispatch()
    const [productList, setProductList] = useState([])

    const fetchProductList = async () => {
        var result = await postData('userinterface/fetch_all_productlist_by_product', { productid: data.productid })
        setProductList(result.data)
    }
    useEffect(function () {
        fetchProductList()
    }, [])

    const fetch_products_data = () => {
        return productList.map((item) => {
            return (<Grid item xs={12} style={{ width: '100%', margin: '0px', padding: "0% 4%", fontWeight: 400, fontSize: '19px' }}>
                <div border={0} style={{ width: '100%', border: '1px solid #b2bec3 ', borderRadius: '10px', padding: '10px', margin: '10px 0px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} >

                    <div style={{ width: '50%' }} >

                        <div style={{ padding: '0% 2%' }} >
                            {item.weight} {item.pricetype}
                        </div>

                        <div style={{ width: '100%', padding: "0% 0%", display: "flex", flexDirection: 'row' }}>
                            <div style={{ width: '100%', margin: '0px', fontWeight: 400, fontSize: '16px', display: 'flex', color: '#515151', alignItems: 'center', justifyContent: 'left' }}>
                                <div style={{ margin: '0% 2%', fontWeight: 700, fontSize: '19px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                                    &#8377; {item.offerprice}
                                </div>
                                <div style={{ margin: '0% 2%', fontWeight: 400, fontSize: '16px', display: 'flex', color: '#515151', alignItems: 'center', justifyContent: 'center' }} >
                                    <s>&#8377; {item.price}</s>
                                </div>
                                <div style={{ margin: '0% 2%', fontWeight: 400, display: 'flex', alignItems: 'center', justifyContent: "center" }} >
                                    <div style={{ width: '70%', fontSize: '14px', display: 'flex', alignItems: 'center', border: '1px solid', padding: '4px 15px', borderRadius: "10px", background: '#00d3ff', fontWeight: 700, color: '#fff' }} >
                                        {parseInt((item.price - item.offerprice) / item.price * 100)}% Off
                                    </div>
                                </div>
                            </div>


                        </div>

                    </div>


                    <div style={{ display: 'flex', justifyContent: 'right', alignItems: 'center' }} >
                        <Button onClick={() => handleDispatch(item)} variant='contained' style={{ lineHeight: '35px', background: "#00d3ff" }} >Add Cart</Button>
                    </div>



                </div>
            </Grid>
            )
        })
    }

    const handleDispatch = (item) => {

        item['qty'] = 1
        dispatch({ type: 'ADD_CART', payload: [item.productlistid, item] })
        props.pageRefresh()

    }




    return (<div style={{ display: 'flex', justifyContent: 'center' }}>
        <Grid container spacing={0}>
            <Grid item xs={12} style={{ width: '100%', margin: '0px', padding: "0% 4%", fontWeight: 600, fontSize: '19px' }}>
                Select the Quantity
            </Grid>


            {fetch_products_data()}

        </Grid>


    </div>
    )
}