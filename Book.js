function purchaseBook(bookDetails, discountPercentage, taxPercentage, stockAmount, purchasedAmount) {
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
        console.log(`Not enough stock for ${bookTitle}.`);
        break;
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
  
    // Display the result
    console.log(`Book title: ${bookTitle}`);
    console.log(`Original price: ${bookPrice}`);
    console.log(`Discount percentage: ${discountPercentage}%`);
    console.log(`Amount of discount: ${discountAmount}`);
    console.log(`Price after discount: ${priceAfterDiscount}`);
    console.log(`Tax percentage: ${taxPercentage}%`);
    console.log(`Amount of tax: ${taxAmount}`);
    console.log(`Price after tax: ${priceAfterTax}`);
    console.log(`Purchased amount: ${purchasedAmount}`);
    console.log(`Total price: ${totalPrice}`);
  
    // Check if there is still enough stock for another purchase
    if (stockAmount > 0) {
      console.log(`There are ${stockAmount} more ${bookTitle} available for purchase.`);
    } else {
      console.log(`There is no more stock for ${bookTitle}.`);
    }
  }
  
  // Usage example:
  let bookDetails = {
    title: "Don Quixote",
    price: 100,
  };
  
  let discountPercentage = 20;
  let taxPercentage = 10;
  let stockAmount = 5;
  let purchasedAmount = 3;
  
  purchaseBook(bookDetails, discountPercentage, taxPercentage, stockAmount, purchasedAmount);
  