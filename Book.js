function purchaseBook(bookDetails, discountPercentage, taxPercentage) {
    // Constant variables
    const DISCOUNT_BASE = 100;
    const TAX_BASE = 100;
  
    // Boolean, number, and string variables
    let hasDiscount = discountPercentage > 0;
    let hasTax = taxPercentage > 0;
    let bookTitle = bookDetails.title;
    let bookPrice = bookDetails.price;
  
    // Calculate discount and price after discount
    let discountAmount = (bookPrice * discountPercentage) / DISCOUNT_BASE;
    let priceAfterDiscount = bookPrice - discountAmount;
  
    // Calculate tax and price after tax
    let taxAmount = (priceAfterDiscount * taxPercentage) / TAX_BASE;
    let priceAfterTax = priceAfterDiscount + taxAmount;
  
    // Display all the parameters with additional data
    console.log("Book title:", bookTitle);
    console.log("Original price:", bookPrice);
    console.log("Discount percentage:", discountPercentage + "%");
    console.log("Amount of discount:", discountAmount);
    console.log("Price after discount:", priceAfterDiscount);
    console.log("Tax percentage:", taxPercentage + "%");
    console.log("Amount of tax:", taxAmount);
    console.log("Price after tax:", priceAfterTax);
  }
  
  // Usage example:
  let bookDetails = {
    title: "The Great Book",
    price: 100,
  };
  
  let discountPercentage = 20;
  let taxPercentage = 10;
  
  purchaseBook(bookDetails, discountPercentage, taxPercentage);
  