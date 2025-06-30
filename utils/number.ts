/**
 * Format number with decimal places
 * @param {number} num - number to format
 * @param {number} decimals - number of decimal places
 * @param {string} decPoint - decimal point separator
 * @param {string} thousandsSep - thousands separator
 * @returns {string} formatted number
 */
export const formatCurrency = (
  num: number,
  decimals = 2,
  thousandsSep = ","
): string => {
  if (!num) return "";

  const parseInt = typeof num === "string" ? formatCurrencyToNumber(num) : num;
  return String(parseInt).replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSep);
};

export const formatCurrencyToNumber = (num: string): number => {
  return Number(num.replace(/[^0-9.-]+/g, ""));
};
