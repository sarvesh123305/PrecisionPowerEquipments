import React from "react";
import "./invoice.css";
const Invoice = () => {
  return (
    <>
      <div class="header">TAX INVOICE</div>
      <div class="invoice">
        <div class="invoice-header">
          <div class="invoice-info">
            <p class="from-header"> Precision Power Equipments</p>
            <p>Shri krishna Chember</p>
            <p>
              11<sup>th</sup> lane Rajarampuri ,
            </p>
            <p>Kolhapur</p>
          </div>
          <div class="invoice-details">
            <p>Invoice Number: INV-12345</p>
            <p>Invoice Date: 2023-08-07</p>
          </div>
        </div>

        <div class="invoice-info">
          <p style={{ marginBottom: "30px", fontSize: "medium" }}> To</p>
          <p class="from-header">Sarvesh Kulkarni</p>
          <p>123 Main Street</p>
          <p>City, State, ZIP</p>
        </div>
        <table class="invoice-table">
          <thead>
            <tr>
              <th>Sr.No</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Rate</th>
              <th>Warranty</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> 1</td>
              <td>Lorem ipsum dolor sit amet</td>
              <td>2</td>
              <td>$50.00</td>
              <td>18 months</td>
              <td>$100.00</td>
            </tr>
            <tr>
              <td> 2</td>
              <td>Consectetur adipiscing elit</td>
              <td>1</td>
              <td>$75.00</td>
              <td>6 months</td>
              <td>$75.00</td>
            </tr>
            <tr>
              <td> 3</td>
              <td>Sed do eiusmod tempor incididunt</td>
              <td>3</td>
              <td>$30.00</td>
              <td>12 months</td>
              <td>$90.00</td>
            </tr>

            <tr>
              <td colspan="1">
                <strong>TOTAL</strong>
              </td>
              <td colspan="4">
                <strong>Two hunred and sixty five only</strong>
              </td>
              <td>$265.00</td>
            </tr>
          </tbody>
        </table>
        <div class="invoice-total">
          <p>Total: $265.00</p>
        </div>
        <div>
          <h3>Terms and conditions</h3>
          <ul style={{ listStyleType: "decimal" }}>
            <li>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Doloribus accusantium delectus in libero dolor illo. Natus
              pariatur perspiciatis nisi sint velit, eos blanditiis omnis illum
              non, magnam culpa{" "}
            </li>
          </ul>
        </div>
        <div class="dealer-signature">
          <p>Dealer's Signature</p>
        </div>

        <div class="customer-signature">
          <p>Customer's Signature</p>
        </div>
      </div>
    </>
  );
};

export default Invoice;
