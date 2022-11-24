export function calculate_shipping(weight: any = 0, days: any = 5) {
  days = parseFloat(days);

  let cost_per_ounce;
  let shipping_cost_multiplier;

  let shipping_cost_dollars;
  let weight_in_ounces = parseFloat(weight) * 16;

  if (days === 3) {
    shipping_cost_multiplier = 1.5;
  } else if (days === 2) {
    shipping_cost_multiplier = 2;
  } else {
    shipping_cost_multiplier = 1;
  }

  if (weight_in_ounces < 20) {
    cost_per_ounce = 2 * shipping_cost_multiplier;
  } else if (weight_in_ounces > 32) {
    cost_per_ounce = 20 * shipping_cost_multiplier;
  } else {
    cost_per_ounce = 10 * shipping_cost_multiplier;
  }

  shipping_cost_dollars = (cost_per_ounce * weight_in_ounces * 0.01).toFixed(2);

  return {
    cost: shipping_cost_dollars,
  };
}
