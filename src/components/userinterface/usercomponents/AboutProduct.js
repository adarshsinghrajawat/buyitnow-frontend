import React, { useState } from "react";

import { useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function AboutProduct(props) {

    const [state, setState]=useState(false)

    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection:'column' }}>
            {matches?<>
            <div onClick={() => setState(!state)} style={{ display:'flex',width: '100%',  margin: '3% 3% 1%', fontWeight:500, cursor:'pointer' }}>
                <div style={{display:'flex', flexGrow:1}} >
                About Product
                </div>
                <div style={{display:'flex', marginRight:'4%'}}>
                    <KeyboardArrowDownIcon/>
                </div>
            </div>
            {state?<div style={{ width: '100%', margin: '0%',color:'#95a5a6', fontSize:'12px' }} >
                <ul>
                    <li>Description : Safal Frozen Green Peas 1 kg Green peas are a great source of nourishment that contains a high level of protein and fibre. Safal Frozen Green Peas are frozen to perfection, preserving their unique taste, freshness and nutrition. They make a great addition to curries, salads and sandwiches. Frozen peas have a longer shelf life which saves you the hassle of peeling or acquiring fresh peas when needed.</li>
                    <li>Country of Origin : India</li>
                    <li>Shelf Life : 12 months</li>
                    <li>Ingredients : Peas</li>
                    <li>Manufacturer Name : Mother Dairy Fruit & Vegetable Pvt Ltd</li>
                    <li>Manufacturer Address : Mother Dairy Fruit & Vegetable Pvt Ltd, Fruit And Vegetable Unit, Mangolpuri, Industrial Area, Phase 1, Delhi -110083.</li>
                </ul>
                
            </div>:<></>}

            </>:<>
            
            <div style={{ width: '100%',  margin: '3% 3% 1%', fontWeight:500,  }}>
                About Product
            </div>
            <div style={{ width: '100%', margin: '0%',color:'#95a5a6' }} >
                <ul>
                    <li>Description : Safal Frozen Green Peas 1 kg Green peas are a great source of nourishment that contains a high level of protein and fibre. Safal Frozen Green Peas are frozen to perfection, preserving their unique taste, freshness and nutrition. They make a great addition to curries, salads and sandwiches. Frozen peas have a longer shelf life which saves you the hassle of peeling or acquiring fresh peas when needed.</li>
                    <li>Country of Origin : India</li>
                    <li>Shelf Life : 12 months</li>
                    <li>Ingredients : Peas</li>
                    <li>Manufacturer Name : Mother Dairy Fruit & Vegetable Pvt Ltd</li>
                    <li>Manufacturer Address : Mother Dairy Fruit & Vegetable Pvt Ltd, Fruit And Vegetable Unit, Mangolpuri, Industrial Area, Phase 1, Delhi -110083.</li>
                </ul>
                
            </div>
            </>}
        </div >



    )
}