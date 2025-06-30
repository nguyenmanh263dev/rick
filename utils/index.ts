/**
 * Format number with K, M, B suffixes with 2 decimal places
 * Example: 1000 -> "1.00K", 1500 -> "1.50K", 1000000 -> "1.00M"
 */
export const formatNumber = (num?: number): string => {
  if (!num || typeof num !== "number") {
    return "0";
  }

  const formatter = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: Math.abs(num) >= 1000000 ? 1 : 0,
  });

  if (Math.abs(num) >= 1000 && Math.abs(num) < 1000000) {
    return formatter.format(num / 1000) + " K";
  } else if (Math.abs(num) >= 1000000 && Math.abs(num) < 1000000000) {
    return formatter.format(num / 1000000) + " M";
  } else if (Math.abs(num) >= 1000000000) {
    return formatter.format(num / 1000000000) + " B";
  }

  return formatter.format(num);
};

export const formatCompactNumber = (num: number) => {
  if (!num) {
    return "";
  }
  const formatter = Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumSignificantDigits: 2,
  });
  return formatter.format(num);
};
