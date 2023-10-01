import React, { useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";
import { getData,postData } from "../Services/ServerServices";
import Swal from "sweetalert2";
import { DropzoneArea } from "material-ui-dropzone";
import { useStyle } from "./BannerCss";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function Banner() {
  // For CSS ---------->>>>>>>>>>>>>>>
  var classes = useStyle();

  // Getter And Setter State For Fetch Data -------->>>>>>>>>>>>>
  const [companies, setCompanies] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // Getter And Setter State For Image ----------->>>>>>>>>>>>>
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState("");

  /// For Button Submit And Reset Button -------------->
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(blueGrey[50]),
    backgroundColor: blueGrey[50],
    "&:hover": {
      backgroundColor: blueGrey[100],
    },
  }));

  useEffect(function () {}, []);

  // Handle For Image ---------->>>>>>>>>>>>>>>
  const handleImage = (files) => {
    setImages(files);
  };

  // Handle-Submit ------>>>>>>>>>>>>>>>
  const handleSubmit = async () => {
    var formData = new FormData();
    formData.append("status", status);

    images.map((item, i) => {
      formData.append("images" + i, item);
    });

    var result = await postData("banner/add_banner_images", formData);
    if (result.status) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: result.message,
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: result.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    clearValue();
  };

  // Handle-Reset Button ----->>>>>>>>>>>>
  const clearValue = () => {
    setImages("");
  };

  return (
    <div className={classes.mainContainer}>
      <div className={classes.box}>
        <Grid container spacing={1}>
          <Grid item xs={12} className={classes.rowStyle2}>
            <div>
              <img src="/assets/grocery.png" alt="Logo" width="70" />
            </div>
            <div className={classes.heading}>Banner Image's</div>
          </Grid>
          <Grid item xs={6}>
            {/* <TextField
              fullWidth
              onChange={(event) => setCompany(event.target.value)}
              label="Company"
              variant="outlined"
              value={company}
            /> */}
          </Grid>

          <Grid item xs={12}>
            <DropzoneArea
              acceptedFiles={["image/*"]}
              filesLimit={10}
              dropzoneText={"Drag and drop an image here or click"}
              onChange={(files) => handleImage(files)}
            />
          </Grid>
          <Grid item xs={12}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  <b
                    style={{
                      fontFamily: "Poppins",
                      fontSize: 20,
                      color: "black",
                      margin: 30,
                    }}
                  >
                    Status
                  </b>
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  onChange={(event) => setStatus(event.target.value)}
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="True"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="False"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </Grid>

          <Grid item xs={6}>
            <ColorButton fullWidth onClick={handleSubmit} variant="contained">
              Submit
            </ColorButton>
          </Grid>

          <Grid item xs={6}>
            <ColorButton fullWidth onClick={clearValue} variant="contained">
              Reset
            </ColorButton>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
