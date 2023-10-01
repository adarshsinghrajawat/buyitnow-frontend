import React, { useState, useEffect } from "react";
import {
  Avatar,
  InputAdornment,
  TextField,
  Button,
  Grid,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem,
  Tooltip

 } from "@mui/material";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useNavigate } from "react-router-dom";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useStyles } from "./CategoryCss";
import { getData, postData } from "../Services/ServerServices";
import Swal from "sweetalert2"
export default function Category(props) {
  var navigate = useNavigate()
 
  var ADMIN = JSON.parse(localStorage.getItem('ADMIN'))
  const [companyId, setCompanyId] = useState(ADMIN.companyid)
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
 

  const [icon, setIcon] = useState({
    fileName: "/assets/watermark.png",
    bytes: "",
  });

  const [error, setError] = useState({})
  var admin = JSON.parse(localStorage.getItem('ADMIN'))
  var classes = useStyles();

  const handleImage = (event) => {
    setIcon({
      fileName: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
  };


  const handleError = (inputs, value) => {
    setError(prev => ({ ...prev, [inputs]: value }))
  }
  const validation = () => {
    var isValid = true
  

    if (!category) {
      handleError(category, "Pls Select Category")
      isValid = false
    }

    if (!description) {
      handleError(description, "Pls Input Description")
      isValid = false
    }

    return isValid
  }


  const clearValue = () => {
    setCategory('')
    setDescription('')
    // setCompanyId('')
    setIcon({
      fileName: "/assets/watermark.png",
      bytes: "",
    })

  }

  const handleClick = async () => {

    console.log("xxxxxxxxxxx", error)
    if (validation()) {

      var cd = new Date()
      var dd = cd.getFullYear() + "/" + (cd.getMonth() + 1) + "/" + cd.getDate() + " " + cd.getHours() + ":" + cd.getMinutes() + ":" + cd.getSeconds()
      var formData = new FormData()
      formData.append('companyid', companyId)
      formData.append('categoryname', category)
      formData.append('description', description)
      formData.append('icon', icon.bytes)
      formData.append('createdat', dd)
      formData.append('updatedat', dd)
      formData.append('createdby', 'ADMIN')
      var result = await postData('category/add_company_category', formData)
      if (result.status) {
        Swal.fire({
          icon: 'success',
          title: result.message,
        })
      }
      else {
        Swal.fire({
          icon: 'error',
          title: result.message,
        })

      }
      clearValue()

    }

  }

  return (
    <div className={classes.mainContainer}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item xs={12} className={classes.rowStyle}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div>
                <img src="/assets/grocery.png" width="40" />
              </div>
              <div className={classes.headingStyle}>Company Category</div>
            </div>

            <div style={{ cursor: 'pointer' }} >
              <Tooltip title="List Category">
                <FormatListBulletedIcon onClick={() => navigate('/dashboard/displayallcategories')} />
              </Tooltip>
            </div>

          </Grid>
          <Grid item xs={6}>
            <TextField onChange={(event) => setCompanyId(event.target.value)}  fullWidth label="Company Id" value={companyId} variant="outlined" />
          </Grid>
          <Grid item xs={6}>
            <TextField error={!error.category ? false : true} helperText={error.category} onFocus={() => handleError("category", null)} value={category} onChange={(event) => setCategory(event.target.value)} fullWidth label="Company Category" variant="outlined" />
          </Grid>
          <Grid item xs={6}>
            <TextField error={!error.description ? false : true} helperText={error.description} onFocus={() => handleError("description", null)} value={description} fullWidth onChange={(event) => setDescription(event.target.value)} label="Description" variant="outlined" />
          </Grid>

          <Grid item xs={6} className={classes.rowStyle}>
            <IconButton
              fullWidth
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handleImage}
              />
              <PhotoCamera />
            </IconButton>

            <Avatar
              alt="Icon"
              variant="rounded"
              src={icon.fileName}
              sx={{ width: 56, height: 56 }}
            />
          </Grid>

          <Grid item xs={6}>
            <Button onClick={handleClick} fullWidth variant="contained">Submit</Button>
          </Grid>
          <Grid item xs={6}>
            <Button onClick={clearValue} fullWidth variant="contained">Reset</Button>
          </Grid>

        </Grid>
      </div>
    </div>
  );
}
