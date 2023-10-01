import { useEffect, useState } from "react";
import MaterialTable from "@material-table/core";
import { getData, postData, ServerURL } from "../Services/ServerServices";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Avatar,
  TextField,
  Grid,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  BorderColorIcon,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Swal from "sweetalert2";
import { useStyles } from "./DisplayAllProductCss";

export default function DisplayAllProducts(props) {
  var navigate = useNavigate();
  var classes = useStyles();
  const [products, setProducts] = useState([]);
  const [companyId, setCompanyId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productName, setProductName] = useState("");
  const [productId, setProductId] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [trending, setTrending] = useState("");
  const [deals, setDeals] = useState("");
  const [priceType, setPriceType] = useState("");
  const [priceTypes, setPriceTypes] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [open, setOpen] = useState(false);
  const [btnStatus, setBtnStatus] = useState(false);
  const [oldPicture, setOldPicture] = useState("");
  const [message, setMessage] = useState("");

  const [image, setImage] = useState({
    fileName: "/assets/watermark.png",
    bytes: "",
  });

  const fetchAllProducts = async () => {
    var result = await getData("product/fetch_all_products");
    setProducts(result.data);
  };
  useEffect(function () {
    fetchAllProducts();
  }, []);

  const fetchAllCategory = async () => {
    var result = await getData("product/fetch_all_category");
    setCategoryIds(result.data);
  };

  useEffect(function () {
    fetchAllCategory();
  }, []);

  const fillCategory = () => {
    return categoryIds.map((item) => {
      return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>;
    });
  };

  const fetchAllPriceTypes = async () => {
    var result = await getData("product/fetch_all_pricetype");
    setPriceTypes(result.data);
  };

  useEffect(function () {
    fetchAllPriceTypes();
  }, []);

  const fillPrTypes = () => {
    return priceTypes.map((item) => {
      return <MenuItem value={item.pricetypid}>{item.prtype}</MenuItem>;
    });
  };

  const handleImage = (event) => {
    setImage({
      fileName: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
    setBtnStatus(true);
  };

  const handleOpenDialog = (rowData) => {
    setProductId(rowData.productid);
    setCompanyId(rowData.companyid);
    setCategoryId(rowData.categoryid);
    setProductName(rowData.productname);
    setDescription(rowData.description);
    setStatus(rowData.status);
    setTrending(rowData.trending);
    setDeals(rowData.deals);
    setPriceType(rowData.pricetype);
    setImage({
      fileName: `${ServerURL}/images/${rowData.image}`,
      bytes: "",
    });
    setOldPicture(rowData.image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setMessage("");
  };

  const handleEditData = async () => {
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

    var body = {
      productid: productId,
      companyid: companyId,
      categoryid: categoryId,
      productname: productName,
      description: description,
      status: status,
      trending: trending,
      deals: deals,
      pricetype: priceType,
      updateat: dd,
      createdby: "ADMIN",
    };

    var result = await postData("product/edit_product", body);
    if (result.status) {
      setOpen(false);
      Swal.fire({
        icon: "success",
        title: result.message,
      });
    } else {
      setOpen(false);
      Swal.fire({
        icon: "error",
        title: result.message,
      });
    }
    setMessage("");
    fetchAllProducts();
  };

  const handleCancel = () => {
    setImage({ fileName: `${ServerURL}/images/${oldPicture}`, bytes: "" });
    setOldPicture("");
    setBtnStatus(false);
    setMessage("");
  };

  const handleDelete = async (rowData) => {
    setOpen(false);
    Swal.fire({
      title: "Do you want to delete the product?",

      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        var res = await postData("product/delete_product", {
          productid: rowData.productid,
        });

        if (res.status) {
          Swal.fire("Deleted!", "", "Success");
          fetchAllProducts();
        } else
          Swal.fire({
            icon: "error",
            title: result.message,
          });
      }
    });
  };

  const handleSaveImage = async () => {
    var formData = new FormData();
    formData.append("productid", productId);
    formData.append("image", image.bytes);
    var result = await postData("product/edit_product_image", formData);
    if (result.status) {
      setMessage("assets/tick.gif");
    } else {
      setMessage("");
    }
    fetchAllProducts();
    setBtnStatus(false);
  };

  const PictureButton = () => {
    return (
      <div>
        {btnStatus ? (
          <div style={{ display: "flex", padding: 10 }}>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleSaveImage}>Save</Button>
          </div>
        ) : (
          <div style={{ fontSize: 20, color: "green", fontWeight: "bold" }}>
            <img src={`${message}`} width="60" />
          </div>
        )}
      </div>
    );
  };

  const showProductDetails = () => {
    return (
      <div>
        <Dialog
          open={open}
          // onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            id="alert-dialog-title"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src="/assets/logo.png" width="40" />
              Product Details
            </div>
            <div>
              <CloseIcon style={{ cursor: "pointer" }} onClick={handleClose} />
            </div>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} style={{ marginTop: 5 }}>
              <Grid item xs={6}>
                <TextField
                  value={companyId}
                  onChange={(event) => setCompanyId(event.target.value)}
                  fullWidth
                  label="Company Id"
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Category Id
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={categoryId}
                    label="CategoryId"
                    onChange={(event) => setCategoryId(event.target.value)}
                  // onChange={handleCategoryChange}
                  >
                    <MenuItem value={"Choose Category..."}>
                      Choose Category...
                    </MenuItem>
                    {fillCategory()}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  value={productName}
                  fullWidth
                  onChange={(event) => setProductName(event.target.value)}
                  label="Product Name"
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  value={description}
                  fullWidth
                  onChange={(event) => setDescription(event.target.value)}
                  label="Description"
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="pType">Price Type</InputLabel>
                  <Select
                    labelId="pType"
                    id="select_ptype"
                    value={priceType}
                    label="PriceType"
                    onChange={(event) => setPriceType(event.target.value)}
                  // onChange={handlePriceTypeChange}
                  >
                    <MenuItem value={"Choose PriceType..."}>
                      Choose PriceType...
                    </MenuItem>
                    {fillPrTypes()}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={3}>
                <FormControl>
                  <FormLabel id="trending">Trending:</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="trending"
                    name="trending"
                    onChange={(event) => setTrending(event.target.value)}
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label="Yes"
                      checked={trending === "yes"}
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label="No"
                      checked={trending === "no"}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={3}>
                <FormControl>
                  <FormLabel id="deals">Deals:</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="deals"
                    name="deals"
                    onChange={(event) => setDeals(event.target.value)}
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label="Yes"
                      checked={deals === "yes"}
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label="No"
                      checked={deals === "no"}
                    />
                  </RadioGroup>
                </FormControl>
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
                  alt="Img"
                  variant="rounded"
                  src={image.fileName}
                  sx={{ width: 56, height: 56 }}
                />
                <PictureButton />
              </Grid>

              <Grid item xs={6}>
                <FormControl>
                  <FormLabel id="status">Status:</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="status"
                    name="status"
                    onChange={(event) => setStatus(event.target.value)}
                  >
                    <FormControlLabel
                      value="available"
                      control={<Radio />}
                      label="Available"
                      checked={status === "available"}
                    />
                    <FormControlLabel
                      value="not_available"
                      control={<Radio />}
                      label="Not_available"
                      checked={status === "not_available"}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditData}>Edit</Button>
            <Button onClick={handleClose}> Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  function showAllProducts() {
    return (
      <MaterialTable
        title={<span className={classes.headingStyle}>Product List </span>}
        columns={[
          {
            title: "Company/Category",
            field: "companyid",
            render: (rowData) =>

              <div>

                <div>{rowData.companyid}</div>
                <div>{rowData.categoryid}</div>

              </div>

          },

          {
            title: "Product Name",
            render: (rowData) => <div>{rowData.productname}</div>,
          },

          {
            title: "Price Type",
            render: (rowData) => <div>{rowData.pricetype}</div>,
          },

          {
            title: "Trending/Deals",
            render: (rowData) =>
              <div>
                <div>
                  {rowData.trending}
                </div>
                <div>
                  {rowData.deals}
                </div>

              </div>

          },

          {
            title: "Status",
            render: (rowData) => <div>{rowData.status}</div>,
          },

          {
            title: "Image",
            render: (rowData) => (
              <Avatar
                src={`${ServerURL}/images/${rowData.image}`}
                style={{ width: 70, height: 70 }}
                variant="rounded"
              />
            ),
          },
        ]}
        data={products}
        actions={[
          {
            icon: "add",
            isFreeAction: true,
            tooltip: "Add Product",
            onClick: (event) => navigate("/dashboard/product"),
          },

          {
            icon: "edit",
            tooltip: "Save User",
            onClick: (event, rowData) => handleOpenDialog(rowData),
          },
          {
            icon: "delete",
            tooltip: "Delete User",
            onClick: (event, rowData) => handleDelete(rowData),
          },
        ]}
      />
    );
  }

  return (
    <div className={classes.mainContainer}>
      <div className={classes.box}>
        {showAllProducts()}
        {showProductDetails()}
      </div>
    </div>
  );
}
