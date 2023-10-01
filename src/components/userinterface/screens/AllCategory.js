import { Avatar, Button, Card, CardActions, CardContent, Grid, Typography, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { getData, postData, ServerURL } from "../../Services/ServerServices";
import Header from "../usercomponents/Header";
import { useLocation } from "react-router-dom";
import Spacer from "../usercomponents/Spacer";
import { useDispatch } from "react-redux"
//import { useLocation } from "react-router-dom"; 
//import Spacer from "../usercomponents/Spacer"
//import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const AllCategory = (props) => {
  let location = useLocation()
  const dispatch = useDispatch()
  //let location=useLocation()
  const navigate = useNavigate()
  //const dispatch=useDispatch()
  // console.log("LOCATION:",location)
  const matches = useMediaQuery("(max-width:600px)");
  const [tabIdx, setTabIdx] = useState(""); // to highlight selected category
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [categoryId, setCategoryId] = useState(location.state.categoryid);

  const [productId, setProductId] = useState(location.state.productid);
  const [refresh, setRefresh] = useState(false)
  async function getCategories() {
    let result = await getData("userinterface/fetch_all_category");
    setCategories(result.data);
  }

  useEffect(() => {
    getCategories()
  }, []);

  // Fetching Categories
  async function getProducts() {
    let result = await postData("userinterface/fetch_products", { categoryid: categoryId });
    setProducts(result.data);
  }

  async function getProductList() {
    let result = await postData("userinterface/fetch_all_productlist_by_product", { productid: productId });
    setProducts(result.data);
  }
  useEffect(() => {
    if (location.state.page == "ExploreCategory") { getProducts(); }
    else if (location.state.page == "Trending") { getProductList() }
  }, [categoryId, productId]);


  const displaySideCategory = () => {
    return categories.map((item, i) => {
      return (
        <Box
          onClick={() => {
            setTabIdx(i);
            setCategoryId(item.categoryid);
          }}
          key={i}
          sx={{ cursor: "pointer" }}
          display="flex"
          mb={0.5}
          flexDirection="column"
          borderRadius={1}
          bgcolor={tabIdx == i && "#f7e4ff"}>
          <Box display="flex" gap={1} fontFamily="arial" textAlign="center" alignItems="center" justifyContent="left" fontSize={matches ? 13 : 15} p={1.5} flexDirection={matches ? "column" : "row"}>
            <Avatar alt="Logo" variant="circular" src={`${ServerURL}/images/${item.icon}`} sx={{ width: 50, height: 50 }} />
            <p style={{ margin: matches && 0, textDecoration: "none" }}>{item.categoryname}</p>
          </Box>
        </Box>
      );
    })
  }

  const handleClick = (item) => {
    item['qty'] = 1
    dispatch({ type: 'ADD_CART', payload: [item.productlistid, item] })
    setRefresh(!refresh)
  }


  const handleExploreProduct = (item) => {
    navigate("/exploreproduct", { state: { data: JSON.stringify(item) } })
  }


  const showProducts = () => {
    return products.map((item, i) => {
      return (
        <Grid key={i} item xs={6} md={2.8} style={{ height: matches ? 240 : 300 }}>
          <Card onClick={() => handleExploreProduct(item)} sx={{ border: "1px solid #ced4d6", height: "90%", width: "80%", boxShadow: "none",background:"#f1f2f6" }}>
            <div style={{ height: "45%", marginTop: 5 }}>
              <img src={`${ServerURL}/images/${item.productimage}`} alt="product" style={{ objectFit: "contain", width: "100%", height: "100%"  }} />
            </div>
            <CardContent sx={{ p: matches ? "2px 2px 2px 4px" : "" }}>
              <Typography gutterBottom variant="h5" sx={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: "2", WebkitBoxOrient: "vertical", fontFamily: "poppins", fontWeight: 600, fontSize: "0.86rem", cursor: "pointer" }}>
                {item.productname}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.weight} {item.pricetype}

              </Typography>
            </CardContent>
            <CardActions>
              <div style={{ fontSize: 15, marginRight: "auto", padding: "0 2px" }}>
                <s style={{ color: "gray", display: "block", fontSize: 12 }}> &#x20B9; {item.price}</s>
                <b> &#x20B9; {item.offerprice}</b>
              </div>
              <Button onClick={() => handleClick(item)} size="small" variant="outlined" color="warning">
                Add
              </Button>
            </CardActions>
          </Card>
        </Grid>
      );
    })
  }



  //   async function getProductList() {
  //     let result = await postData("userinterface/fetch_all_productlist_by_product",{productid:productId});

  //     setProducts(result.data);
  //   }
  //   // Fetching Products
  //   useEffect(() => {
  //     if(location.state.page=="ExploreCategory")
  //     {getProducts();}
  //     else if(location.state.page=="Trending")
  //     {getProductList()}


  // }, [categoryId,productId]);

  //const displaySideCategory=()=>{
  //   return categories.map((item, i) => {

  //   return (
  //       <Box
  //         onClick={() => {
  //           setTabIdx(i);
  //           setCategoryId(item.categoryid);
  //         }}
  //         key={i}
  //         sx={{ cursor: "pointer" }}
  //         display="flex"
  //         mb={0.5}
  //         flexDirection="column"
  //         borderRadius={1}
  //         bgcolor={tabIdx == i && "#f7e4ff"}>
  //         <Box display="flex" gap={1} fontFamily="arial" textAlign="center" alignItems="center" justifyContent="left" fontSize={matches ? 13 : 15} p={1.5} flexDirection={matches ? "column" : "row"}>
  //           <Avatar alt="Logo" variant="circular" src={`${ServerURL}/images/${item.icon}`} sx={{ width: 50, height: 50 }} />
  //           <p style={{ margin: matches && 0, textDecoration: "none" }}>{item.categoryname}</p>
  //         </Box>
  //       </Box>
  //     );
  //   })}
  //   const handleClick=(item)=>{
  //    item['qty']=1
  //   dispatch({type:'ADD_CART',payload:[item.productlistid,item]})   
  //   setRefresh(!refresh)
  //   }

  //   const handleExploreProduct=(item)=>{
  //     navigate("/exploreproduct",{state:{data:JSON.stringify(item)}})

  //   }
  //   const showProducts=()=>{

  //     return products.map((item, i) => {
  //       return (
  //         <Grid key={i} item xs={6} md={2.8} style={{ height: matches ? 240 : 300 }}>
  //           <Card onClick={()=>handleExploreProduct(item)} sx={{ border: "1px solid #ced4d6", height: "90%", width: "80%", boxShadow: "none" }}>
  //             <div style={{ height: "45%", marginTop: 5 }}>
  //               <img src={`${ServerURL}/images/${item.productimage}`} alt="product" style={{ objectFit: "contain", width: "100%", height: "100%" }} />
  //             </div>
  //             <CardContent sx={{ p: matches ? "2px 2px 2px 4px" : "" }}>
  //               <Typography gutterBottom variant="h5" sx={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: "2", WebkitBoxOrient: "vertical", fontFamily: "poppins", fontWeight: 600, fontSize: "0.86rem", cursor: "pointer" }}>
  //                 {item.productname}
  //               </Typography>
  //               <Typography variant="body2" color="text.secondary">
  //                 {item.weight} {item.pricetype}
  //               </Typography>
  //             </CardContent>
  //             <CardActions>
  //               <div style={{ fontSize: 15, marginRight: "auto", padding: "0 2px" }}>
  //                 <s style={{ color: "gray", display: "block", fontSize: 12 }}> &#x20B9; {item.price}</s>
  //                 <b> &#x20B9; {item.offerprice}</b>
  //               </div>
  //               <Button onClick={()=>handleClick(item)} size="small" variant="outlined" color="warning">
  //                 Add
  //               </Button>
  //             </CardActions>
  //           </Card>
  //         </Grid>
  //       );
  //     })}




  return (
    <>
      <Header />
      <Spacer />
      <Grid container maxWidth={1300} mx="auto">


        <Grid item xs={2} position="sticky" top={0} overflow="auto" maxHeight="100vh" borderRight="1px solid #ced4d6" >
          {displaySideCategory()}
        </Grid>

        {/* Right Part */}
        <Grid item xs={10} py={2} container spacing={matches ? 1 : 2} overflow="hidden" justifyContent="center">
          {showProducts()}
        </Grid>
      </Grid>
    </>
  );
};

export default AllCategory;
