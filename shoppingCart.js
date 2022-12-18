//exporting module
console.log('Exporting Module');

export const shippingCost = 10;
const cart = [];

export const addToCart = function (product, qunatity) {
  cart.push({ product, qunatity });
  console.log(`${qunatity} ${product} added to cart`);
};
