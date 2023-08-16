import React, { useEffect, useRef, useState } from "react";
import Layout from "../../../components/Layout";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import TableShow from "./TableShow";
import Autocomplete from "@mui/material/Autocomplete";
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../../../Database/Firebase1";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Purchase = () => {
  const [names, setCustomerName] = useState([]);
  const [products, setProductsName] = useState([]);
  const [warranty, setWarranty] = useState("");
  // const [newProducts, setNewProducts] = useState([]);
  const productNameRef = useRef(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [total, setTotal] = useState(0);
  const [newData, setNewData] = useState([]);
  const [formData, setFormData] = useState({
    category: "",
    price: 0,
    serialNo: "",
    quality: "",
    amc: "",
    amcAmount: "",
    quantity: 0,
    tax: 0,
  });
  const { category, price, serialNo, quality, amc, tax, amcAmount, quantity } =
    formData;
  useEffect(() => {
    const fetchData = onSnapshot(
      collection(db, "customers"),
      (querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setCustomerName(list);
      }
    );
    const fetchProducts = onSnapshot(
      collection(db, "products"),
      (querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setProductsName(list);
      }
    );

    return () => {
      fetchData();
      fetchProducts();
    };
  }, []);
  const navigate = useNavigate();
  const handlePrintBill = () => {
    navigate("/Admin/invoice");
  };

  const handleChangeDynamic = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleProductChange = (e, newWarranty) => {
    setWarranty(newWarranty);
  };
  const handleCustomerChange = (event, value) => {
    setSelectedCustomer(value);
  };

  const AddNewProduct = async () => {
    const productName = productNameRef.current.value;
    console.log(selectedCustomer.email);

    if (selectedCustomer.Purchase && newData.length === 0) {
      setNewData(selectedCustomer.Purchase);
    }
    console.log("New Data ", newData);
    const object = {
      category: category,
      productName: productName,
      warranty: warranty,
      price: price,
      serialNo: serialNo,
      quality: quality,
      amc: amc,
      tax: tax,
      amcAmount: amcAmount,
      quantity: quantity,
      total: total,
    };
    newData.push(object);
    console.log(newData);
   
  };
  const AddProductToCustomerCart = async () =>{
    try {
      selectedCustomer.products = newData;
      await setDoc(doc(db, "customers", selectedCustomer.email), {
        ...selectedCustomer,
      });
  
      toast.success("Products successfully!!!");
    } catch (err) {
      toast.error("Error adding product" + err);
      console.log(err);
    }
    }
  useEffect(() => {
    const handleTotal = () => {
      const newTotal = quantity * price;
      setTotal(newTotal);
    };
    handleTotal();
  }, [quantity, price]);
  return (
    <Layout>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Paper
          sx={{
            textAlign: "center",
            padding: "20px",
            maxWidth: "800px",
            width: "100%",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Add New Product Purchase
          </Typography>

          <Grid container spacing={2}>
            {/* First Row */}
            <Grid item xs={6}>
              <Autocomplete
                disablePortal
                id="combo-box-customers"
                options={names}
                value={selectedCustomer} // Set the selected value
                onChange={handleCustomerChange}
                getOptionLabel={(option) => option.name} // Make sure to use the correct property name for the customer name
                renderInput={(params) => (
                  <TextField {...params} label="Customer Name" />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Select Category</InputLabel>
                <Select
                  name="category"
                  placeholder="Enter category"
                  labelId="category"
                  id="category"
                  label="category"
                  value={category}
                  onChange={handleChangeDynamic}
                >
                  <MenuItem value={"Inverter"}>Inverter</MenuItem>
                  <MenuItem value={"Battery"}>Battery</MenuItem>
                  <MenuItem value={"Solar"}>Solar</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                disablePortal
                id="combo-box-products"
                options={products}
                onChange={handleProductChange}
                getOptionLabel={(option) => option.modelName} // Make sure to use the correct property name for the customer name
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Product Name"
                    inputRef={productNameRef}
                    name="productname"
                  />
                )}
              />
            </Grid>

            {/* Second Row */}
            <Grid item xs={6}>
              <TextField
                label="Warranty"
                InputLabelProps={{ shrink: true }}
                name="warranty"
                placeholder="Enter warranty"
                value={warranty ? warranty.warranty : ""}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Price"
                type="number"
                InputLabelProps={{ shrink: true }}
                placeholder="Enter Price"
                value={price}
                name="price"
                onChange={handleChangeDynamic}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Quantity"
                type="number"
                InputLabelProps={{ shrink: true }}
                placeholder="Enter Quantity"
                value={quantity}
                name="quantity"
                onChange={handleChangeDynamic}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="GST"
                type="number"
                InputLabelProps={{ shrink: true }}
                placeholder="Dont write % symbol"
                value={tax}
                name="tax"
                onChange={handleChangeDynamic}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Select quality</InputLabel>
                <Select
                  name="quality"
                  placeholder="Enter quality"
                  labelId="quality"
                  id="quality"
                  label="quality"
                  value={quality}
                  onChange={handleChangeDynamic}
                >
                  <MenuItem value={"Branded"}>Branded</MenuItem>
                  <MenuItem value={"Local"}>Local</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel> Annual Maintainance Contract </InputLabel>
                <Select
                  name="amc"
                  placeholder="select AMC"
                  labelId="amc"
                  id="amc"
                  label="amc"
                  value={amc}
                  onChange={handleChangeDynamic}
                >
                  <MenuItem value={"1Year"}>1 Year</MenuItem>
                  <MenuItem value={"Not intersted"}>
                    I would do that by myself
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {amc !== "" && amc !== "Not intersted" && (
              <Grid item xs={6}>
                <TextField
                  label="AMC Amount"
                  type="number"
                  InputLabelProps={{ shrink: true }}
                  placeholder="Enter AMC Amount"
                  value={amcAmount}
                  name="amcAmount"
                  onChange={handleChangeDynamic}
                  fullWidth
                />
              </Grid>
            )}
            <Grid item xs={6}>
              <TextField
                label="Serial Number"
                InputLabelProps={{ shrink: true }}
                placeholder="Enter serial Number"
                value={serialNo}
                name="serialNo"
                onChange={handleChangeDynamic}
                fullWidth
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Total"
                type="number"
                InputLabelProps={{ shrink: true }}
                placeholder="Enter Total"
                value={total}
                name="total"
                // onChange={handleTotal}
                disabled
                fullWidth
              />
            </Grid>
            <Grid xs={6}> </Grid>
          </Grid>
          <Box sx={{ margin: "10px" }}>
            <Button
              variant="contained"
              onClick={() => AddNewProduct()}
              sx={{ marginRight: "10px" }}
              color="success"
            >
              Add Product
            </Button>
            <Button
              variant="contained"
              onClick={handlePrintBill}
              color="primary"
            >
              Print Bill
            </Button>
          </Box>
        </Paper>
      </Box>
      <Box>
        <TableShow
          products={
            (selectedCustomer !== null && selectedCustomer.products) === false
              ? null
              : selectedCustomer.products
          }
        />
      </Box>
      <Box sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

      }}>
        <Button
          variant="contained"
          sx={{ margin : "20px"}}
          color="warning"
          onClick={() => {AddProductToCustomerCart()}}
        >
          Add products to customer
        </Button>
      </Box>
    </Layout>
  );
};
/*
  Add products : 
  productname ------------
  category  ------------
  Bill amount ------------
  warranty  ------------
  print bill 
  Serial Number of product ------------
  if(battery) ------------
    local || standard ------------
  AMC ------------

*/
export default Purchase;
