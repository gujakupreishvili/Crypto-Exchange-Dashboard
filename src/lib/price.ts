import type { PriceDirection } from "../types/market";

export const calculatePercentageChange = (
  currentPrice: number,
  baselinePrice: number
): number => {
  if (baselinePrice === 0) {
    return 0;
  }

  return ((currentPrice - baselinePrice) / baselinePrice) * 100;
};

export const getPriceDirection = (
  currentPrice: number,
  previousPrice: number
): PriceDirection => {
  if (currentPrice > previousPrice) {
    return "up";
  }

  if (currentPrice < previousPrice) {
    return "down";
  }

  return "unchanged";
};
