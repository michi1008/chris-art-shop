function addDecimals(num) {
  return (Math.round(num * 100) / 100).toFixed(2);
}

function getTaxRateByLocation(shippingAddress) {

  const taxRates = {
      'AL': 4.00,
      'AK': 0.00,
      'AZ': 5.60,
      'AR': 6.50,
      'CA': 7.25,
      'CO': 2.90,
      'CT': 6.35,
      'DE': 0.00,
      'FL': 6.00,
      'GA': 4.00,
      'HI': 4.00,
      'ID': 6.00,
      'IL': 6.25,
      'IN': 7.00,
      'IA': 6.00,
      'KS': 6.50,
      'KY': 6.00,
      'LA': 4.45,
      'ME': 5.50,
      'MD': 6.00,
      'MA': 6.25,
      'MI': 6.00,
      'MN': 6.875,
      'MS': 7.00,
      'MO': 4.225,
      'MT': 0.00,
      'NE': 5.50,
      'NV': 6.85,
      'NH': 0.00,
      'NJ': 6.625,
      'NM': 4.875,
      'NY': 4.00,
      'NC': 4.75,
      'ND': 5.00,
      'OH': 5.75,
      'OK': 4.50,
      'OR': 0.00,
      'PA': 6.00,
      'RI': 7.00,
      'SC': 6.00,
      'SD': 4.20,
      'TN': 7.00,
      'TX': 6.25,
      'UT': 6.10,
      'VT': 6.00,
      'VA': 5.30,
      'WA': 6.50,
      'WV': 6.00,
      'WI': 5.00,
      'WY': 4.00,
      'DC': 6.00
  };
  
  const stateKey = shippingAddress.state?.trim().toUpperCase().slice(0, 2);
  return taxRates[stateKey] ?? 0;
}

export function calcPrices(orderItems, shippingAddress, deliveryMethod) {
  const itemsPrice = orderItems.reduce(
    (acc, item) => acc + (item.price * 100) / 100,
    0
  );

  // Calculate the shipping price
  let shippingPrice = 100; // Default shipping cost
  if (deliveryMethod === "hand-delivered") {
    shippingPrice = 0; 
  }

  // Get tax rate based on shipping location
  const taxRate = getTaxRateByLocation(shippingAddress);

  // Calculate the tax price
  const taxPrice = taxRate/100 * itemsPrice;

  // Calculate the total price
  const totalPrice = itemsPrice + shippingPrice + taxPrice;
  // return prices as strings fixed to 2 decimal places
  return {
    itemsPrice: addDecimals(itemsPrice),
    shippingPrice: addDecimals(shippingPrice),
    taxPrice: addDecimals(taxPrice),
    totalPrice: addDecimals(totalPrice),
  };
}
