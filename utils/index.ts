/**
 * Format number with K, M, B suffixes with 2 decimal places
 * Example: Math.pow(10, 6)  -> "1.00K", 1500 -> "1.50K", 1000000 -> "1.00M"
 */

const THOUSAND = Math.pow(10, 3);
const MILLION = Math.pow(10, 6);
const BILLION = Math.pow(10, 9);

export const formatNumber = (num?: number): string => {
  if (!num || typeof num !== 'number') {
    return '0';
  }

  const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: Math.abs(num) >= MILLION ? 1 : 0,
  });

  if (Math.abs(num) >= THOUSAND && Math.abs(num) < MILLION) {
    return formatter.format(num / THOUSAND) + ' K';
  } else if (Math.abs(num) >= MILLION && Math.abs(num) < BILLION) {
    return formatter.format(num / MILLION) + ' M';
  } else if (Math.abs(num) >= BILLION) {
    return formatter.format(num / BILLION) + ' B';
  }

  return formatter.format(num);
};

export const formatCompactNumber = (num: number) => {
  if (!num) {
    return '';
  }
  const formatter = Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumSignificantDigits: 2,
  });
  return formatter.format(num);
};
