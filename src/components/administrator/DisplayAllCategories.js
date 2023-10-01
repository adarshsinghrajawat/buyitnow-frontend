import { useEffect, useState } from "react";
import MaterialTable from "@material-table/core";
import { getData,postData,ServerURL } from "../Services/ServerServices";
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
  Switch,
  Select,
  BorderColorIcon,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Swal from "sweetalert2";
import { useStyles } from "./DisplayAllCategoriesCss";
export default function DisplayAllCategories(props) {
  var navigate = useNavigate();
  var classes = useStyles();
  const [categories, setCategories] = useState([]);
  const [companyId, setCompanyId] = useState("");
  const [category, setCategory] = useState("");
  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [btnStatus, setBtnStatus] = useState(false);
  const [oldPicture, setOldPicture] = useState("");
  const [message, setMessage] = useState("");

  const [icon, setIcon] = useState({
    fileName: "/assets/watermark.png",
    bytes: "",
  });

  const handleImage = (event) => {
    setIcon({
      fileName: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
    setBtnStatus(true);
  };

  const handleOpenDialog = (rowData) => {
    setCategoryId(rowData.categoryid);
    setCompanyId(rowData.companyid);
    setCategory(rowData.categoryname);
    setDescription(rowData.description);

    setIcon({
      fileName: `${ServerURL}/images/${rowData.icon}`,
      bytes: "",
    });
    setOldPicture(rowData.icon);

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
      categoryid: categoryId,
      companyid: companyId,
      category: category,
      description: description,
      updateat: dd,
      createdby: "ADMIN",
    };

    var result = await postData("category/edit_company_category", body);
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
    fetchAllCategories();
  };

  const handleCancel = () => {
    setIcon({ fileName: `${ServerURL}/images/${oldPicture}`, bytes: "" });
    setOldPicture("");
    setBtnStatus(false);
    setMessage("");
  };

  const handleDelete = async (rowData) => {
    setOpen(false);
    Swal.fire({
      title: "Do you want to delete this category?",

      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        var res = await postData("category/delete_category", {
          categoryid: rowData.categoryid,
        });

        if (res.status) {
          Swal.fire("Deleted!", "", "Success");
          fetchAllCategories();
        } else
          Swal.fire({
            icon: "error",
            title: result.message,
          });
      }
    });
  };

  const handleSaveIcon = async () => {
    var formData = new FormData();
    formData.append("categoryid", categoryId);
    formData.append("icon", icon.bytes);
    var result = await postData("category/edit_category_icon", formData);
    if (result.status) {
      setMessage("assets/tick.gif");
    } else {
      setMessage("");
    }
    fetchAllCategories();
    setBtnStatus(false);
  };

  const PictureButton = () => {
    return (
      <div>
        {btnStatus ? (
          <div style={{ display: "flex", padding: 10 }}>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleSaveIcon}>Save</Button>
          </div>
        ) : (
          <div style={{ fontSize: 20, color: "green", fontWeight: "bold" }}>
            <img src={`${message}`} width="60" />
          </div>
        )}
      </div>
    );
  };

  const showCategoryDetails = () => {
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
              Category Details
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
                <TextField
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  fullWidth
                  label="Company Category"
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
                  alt="Remy Sharp"
                  variant="rounded"
                  src={icon.fileName}
                  sx={{ width: 56, height: 56 }}
                />
                <PictureButton />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditData}>Edit</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  const fetchAllCategories = async () => {
    var result = await getData("category/fetch_all_category");
    setCategories(result.data);
  };
  useEffect(function () {
    fetchAllCategories();
  }, []);

  function showAllCategory() {
    return (
      <MaterialTable
        title={<span className={classes.headingStyle}>Category List</span>}
        columns={[
          {
            title: "Company Id",
            field: "companyid",
            render: (rowData) => <div>{rowData.companyid}</div>,
          },

          {
            title: "Category",
            field: "categoryname",
            render: (rowData) => <div>{rowData.categoryname}</div>,
          },

          {
            title: "Description",
            render: (rowData) => <div>{rowData.description}</div>,
          },

          {
            title: "Last Updation",
            field: "createdby",
            render: (rowData) => (
              <div>
                {rowData.createdat}
                <br />
                {rowData.updateat}
                <br />
                {rowData.createdby}
              </div>
            ),
          },

          {
            title: "Icon",
            render: (rowData) => (
              <Avatar
                src={`${ServerURL}/images/${rowData.icon}`}
                style={{ width: 70, height: 70 }}
                variant="rounded"
              />
            ),
          },
        ]}
        data={categories}
        actions={[
          {
            icon: "add",
            isFreeAction: true,
            tooltip: "Add Category",
            onClick: (event) => navigate("/dashboard/category"),
          },

          {
            icon: "edit",
            tooltip: "Edit User",
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
        {showAllCategory()}
        {showCategoryDetails()}
      </div>
    </div>
  );
}
