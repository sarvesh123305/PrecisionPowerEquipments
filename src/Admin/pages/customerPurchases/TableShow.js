import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const TableShow = (products) => {

  function ccyFormat(num) {
    num = parseFloat(num);
    return `${num.toFixed(2)}`;
  }

  
  function amcTotal(items) {
    return items.map(({ amcAmount }) => amcAmount).reduce((sum, i) => sum + i, 0);
  }
  let TAXAMOUNT = 0 , SUBTOTAL = 0 ;
  function calculateTax(tax, price, quantity) {
    let taxPercent = parseFloat(tax);
    let taxPrice = parseFloat(price);
    quantity = parseFloat(quantity);
    let TaxAmount = taxPrice - taxPrice * (taxPercent / 100);
    SUBTOTAL += (TaxAmount * quantity);
    TaxAmount = (taxPrice - TaxAmount) * quantity;
    TAXAMOUNT += TaxAmount;
    return TaxAmount;
  }
  const productsArray = products.products;
  const amcTotalvalue = amcTotal(productsArray ? productsArray : []);
//   const invoiceTotal = subtotal(productsArray ? productsArray : []);
  return (
    <>  
    {   productsArray !== null &&  
      <TableContainer component={Paper}> 
        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: "bold" }} colSpan={1}>
                Details
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }} colSpan={5}>
                Price
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell align="right">Qty.</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">GST</TableCell>
              <TableCell align="right">Tax</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productsArray !== null &&
              productsArray.map((row) => (
                <TableRow key={row.productName}>
                  <TableCell>{row.productName}</TableCell>

                  <TableCell align="right">{row.quantity}</TableCell>
                  <TableCell align="right">
                    {ccyFormat(parseFloat(row.price) - parseFloat(row.price) * (parseFloat(row.tax) / 100) )}
                  </TableCell>
                  <TableCell align="right">{ccyFormat(parseFloat(row.tax))}% </TableCell>
                  <TableCell align="right">
                    {ccyFormat(calculateTax(row.tax, row.price, row.quantity))}{" "}
                  </TableCell>

                  <TableCell align="right">{row.total}</TableCell>
                </TableRow>
              ))}
            <TableRow>
              <TableCell colSpan={1} />
              <TableCell rowSpan={1} />
              <TableCell colSpan={1}>Subtotal</TableCell>
              <TableCell align="right">{ccyFormat(SUBTOTAL)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={1} />
              <TableCell rowSpan={1} />
              <TableCell colSpan={1}>GST</TableCell>
              <TableCell align="right">{ccyFormat(TAXAMOUNT)}</TableCell>
            </TableRow>
            <TableRow>
            <TableCell colSpan={1} />
            <TableCell rowSpan={1} />
            <TableCell colSpan={1}>AMC Amount</TableCell>
            <TableCell align="right">{ccyFormat(amcTotalvalue)}</TableCell>
          </TableRow>
            <TableRow>
              <TableCell rowSpan={1} />
              <TableCell colSpan={1} />
              <TableCell colSpan={1}>Total</TableCell>
              <TableCell align="right">{ccyFormat(parseFloat(amcTotalvalue) +parseFloat(TAXAMOUNT) + parseFloat(SUBTOTAL))}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
              }
    </>
  );
};

export default TableShow;
