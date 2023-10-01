import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { DropzoneDialog, DropzoneArea } from "material-ui-dropzone";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./ProductListCss";
import { getData,postData } from "../Services/ServerServices";
import Swal from "sweetalert2";

export default function ProductList(props) {
  var ADMIN = JSON.parse(localStorage.getItem('ADMIN'))
  const [companyId, setCompanyId] = useState(ADMIN.companyid)

  const [categoryId, setCategoryId] = useState("");
  const [productId, setProductId] = useState("");
  const [productList, setProductList] = useState([]);
  const [description, setDescription] = useState("");
  const [weight, setWeight] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [categoryIds, setCategoryIds] = useState([]);

  const [images, setImages] = useState([]);

  const [error, setError] = useState({});

  var classes = useStyles();

  const fetchAllCategory = async () => {
    var result = await getData("category/fetch_all_category");
    setCategoryIds(result.data);
  };

  useEffect(function () {
    fetchAllCategory();
  }, []);

  const fetchAllProducts = async (categoryid) => {
    var body = { categoryid: categoryid };

    var result = await postData("productlist/fetch_all_products", body);
    setProductList(result.data);
  };

  const fillProducts = () => {
    return productList.map((item) => {
      return <MenuItem value={item.productid}>{item.productname}</MenuItem>;
    });
  };

  const handleCategoryChange = (event) => {
    setCategoryId(event.target.value);
    fetchAllProducts(event.target.value);
  };
  const handleProductChange = (event) => {
    setProductId(event.target.value);
  };

  const handleError = (inputs, value) => {
    setError((prev) => ({ ...prev, [inputs]: value }));
  };
  const validation = () => {
    var isValid = true;
    if (!companyId) {
      handleError("companyId", "Invalid Company Id");
      isValid = false;
    }
    if (!categoryId || categoryId == "Choose Category...") {
      handleError("categoryId", "Pls Select Category");
      isValid = false;
    }

    if (!productId || productId == "Choose Product...") {
      handleError("productId", "Pls Select Product Name");
      isValid = false;
    }

    if (!price) {
      handleError("price", "Pls Input Price");
      isValid = false;
    }

    if (!description) {
      handleError("description", "Pls Input Description");
      isValid = false;
    }

    if (!weight) {
      handleError("weight", "Pls Input Weight");
      isValid = false;
    }

    if (!offerPrice) {
      handleError("offerPrice", "Pls Input offer Price");
      isValid = false;
    }

    return isValid;
  };

  const fillCategory = () => {
    return categoryIds.map((item) => {
      return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>;
    });
  };

  const handleImage = (files) => {
    setImages(files);
  };

  const clearValue = () => {
    // setCompanyId("");
    setCategoryId("Choose Category...");
    setProductId("");
    setDescription("");
    setWeight("");
    setPrice("");
    setOfferPrice("");
  };

  const handleClick = async () => {
    console.log("xxxxxxxxxxx", error);

    if (validation()) {
      var cd = new Date();
      var dd =
        cd.getFullYear() +
        "/" +
        (cd.getMonth() + 1) +
        "/" +
        cd.getDate() +
        " " +
        cd.getHours() +
        ":" +
        cd.getMinutes() +
        ":" +
        cd.getSeconds();
      var formData = new FormData();
      formData.append("companyid", companyId);
      formData.append("categoryid", categoryId);
      formData.append("productid", productId);
      formData.append("weight", weight);
      formData.append("price", price);
      formData.append("offerprice", offerPrice);
      formData.append("description", description);

      formData.append("createdat", dd);
      formData.append("updatedat", dd);
      formData.append("createdby", "ADMIN");
      images.map((item, i) => {
        formData.append("picture" + i, item);
      });

      var result = await postData("productlist/add_productlist", formData);
      if (result.status) {
        Swal.fire({
          icon: "success",
          title: result.message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: result.message,
        });
      }
      clearValue();
    }
  }; 

  const mainFormPage = () => {
    return (
      <div className={classes.mainContainer}>
        <div className={classes.box}>
          <Grid container spacing={2}>
            <Grid item xs={12} className={classes.rowStyle}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div>
                  <img src="/assets/grocery.png" width="40" />
                </div>
                <div className={classes.headingStyle}>Product List</div>
              </div>
              <div style={{ cursor: "pointer" }}></div>
            </Grid>
            <Grid item xs={4}>
              <TextField
                error={!error.companyId ? false : true}
                helperText={error.companyId}
                onFocus={() => handleError("companyId", null)}
                value={companyId}
                onChange={(event) => setCompanyId(event.target.value)}
                fullWidth
                label="Company Id"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={4}>
              <FormControl fullWidth error={!error.categoryId ? false : true}>
                <InputLabel id="demo-simple-select-label">
                  Category Name
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={categoryId}
                  onFocus={() => handleError("categoryId", null)}
                  label="CategoryId"
                  //onChange={(event) => setCategoryId(event.target.value)}
                  onChange={handleCategoryChange}
                >
                  <MenuItem value={"Choose Category..."}>
                    Choose Category...
                  </MenuItem>
                  {fillCategory()}
                </Select>
                <div
                  style={{
                    padding: 5,
                    fontSize: 12,
                    marginLeft: "10px",
                    color: "#d32f2f",
                    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                  }}
                >
                  {error.categoryId}
                </div>
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <FormControl fullWidth error={!error.productId ? false : true}>
                <InputLabel id="demo-simple-select-label">
                  Product Name
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={productId}
                  label="Product Name"
                  onChange={handleProductChange}
                  onFocus={() => handleError("productId", null)}
                >
                  <MenuItem value={"Choose Product..."}>
                    Choose Product...
                  </MenuItem>
                  {fillProducts()}
                </Select>
                <div
                  style={{
                    padding: 5,
                    fontSize: 12,
                    marginLeft: "10px",
                    color: "#d32f2f",
                    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                  }}
                >
                  {error.productId}
                </div>
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <TextField
                error={!error.weight ? false : true}
                helperText={error.weight}
                onFocus={() => handleError("weight", null)}
                value={weight}
                fullWidth
                onChange={(event) => setWeight(event.target.value)}
                label="Weight"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                error={!error.price ? false : true}
                helperText={error.price}
                onFocus={() => handleError("price", null)}
                value={price}
                fullWidth
                onChange={(event) => setPrice(event.target.value)}
                label="Price"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                error={!error.offerPrice ? false : true}
                helperText={error.offerPrice}
                onFocus={() => handleError("offerPrice", null)}
                value={offerPrice}
                fullWidth
                onChange={(event) => setOfferPrice(event.target.value)}
                label="Offer Price"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                error={!error.description ? false : true}
                helperText={error.description}
                onFocus={() => handleError("description", null)}
                value={description}
                fullWidth
                onChange={(event) => setDescription(event.target.value)}
                label="Description"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <DropzoneArea
                acceptedFiles={["image/*"]}
                dropzoneText={"Drag and drop an image here or click"}
                filesLimit={5}
                onChange={(files) => handleImage(files)}
              /> 
            </Grid>

            <Grid item xs={6}>
              <Button onClick={handleClick} fullWidth variant="contained">
                Submit
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button onClick={clearValue} fullWidth variant="contained">
                Reset
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  };

  return (
    <div className={classes.mainContainer}>
      <div>{mainFormPage()}</div>
    </div>
  );
}
