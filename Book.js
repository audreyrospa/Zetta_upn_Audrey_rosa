const express = require("express");
const bodyParser = require("body-parser");
const basicAuth = require("express-basic-auth");

const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Middleware to require basic authentication
app.use(
  basicAuth({
    users: {
      admin: "password123",
    },
  })
);

// Route for the book purchase API
app.post("/purchase", (req, res) => {
  let bookDetails = req.body.bookDetails;
  let discountPercentage = req.body.discountPercentage;
  let taxPercentage = req.body.taxPercentage;
  let stockAmount = req.body.stockAmount;
  let purchasedAmount = req.body.purchasedAmount;
  let termOfCredit = req.body.termOfCredit;

  // Constant variables
  const DISCOUNT_BASE = 100;
  const TAX_BASE = 100;

  // Boolean, number, and string variables
  let hasDiscount = discountPercentage > 0;
  let hasTax = taxPercentage > 0;
  let bookTitle = bookDetails.title;
  let bookPrice = bookDetails.price;

  // Check if there is enough stock
  for (let i = 1; i <= purchasedAmount; i++) {
    if ((i + stockAmount) > 0) {
      stockAmount -= 1;
    } else {
      return res.status(400).json({
        error: `Not enough stock for ${bookTitle}.`,
      });
    }
  }

  // Calculate discount and price after discount
  let discountAmount = (bookPrice * discountPercentage) / DISCOUNT_BASE;
  let priceAfterDiscount = bookPrice - discountAmount;

  // Calculate tax and price after tax
  let taxAmount = (priceAfterDiscount * taxPercentage) / TAX_BASE;
  let priceAfterTax = priceAfterDiscount + taxAmount;

  // Calculate total price
  let totalPrice = purchasedAmount * priceAfterTax;

  // Calculate the price for each term of credit
  let pricePerTerm = totalPrice / termOfCredit;

  // Create an array of objects representing the credit payments
  let creditPayments = [];
  for (let i = 1; i <= termOfCredit; i++) {
    let remainingBalance = totalPrice - (pricePerTerm * (i - 1));
    let creditPayment = {
      term: i,
      amount: pricePerTerm.toFixed(2),
      remainingBalance: remainingBalance.toFixed(2),
    };
    creditPayments.push(creditPayment);
  }

  // Return the result
  return res.json({
    bookTitle: bookTitle,
    originalPrice: bookPrice,
    discountPercentage: discountPercentage,
    discountAmount: discountAmount,
    priceAfterDiscount: priceAfterDiscount,
    taxPercentage: taxPercentage,
    taxAmount: taxAmount,
    priceAfterTax: priceAfterTax,
    purchasedAmount: purchasedAmount,
    totalPrice: totalPrice,
    creditPayments: creditPayments,
  });
});

// Start the server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
