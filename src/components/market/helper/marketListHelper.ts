import { useMarketStream } from "../../../hook/useMarketStream";
import { useQueryParams } from "../../../hook/useQueryParams";
import { calculatePercentageChange } from "../../../lib/price";
import { useMarketStore } from "../../../store/marketStore";
import type { MarketRowProps } from "../../../types/market";

export const  marketListHelper = () => {
  const {  baselines, directions } = useMarketStream()
  const { getParam } = useQueryParams()
  const search = getParam("search").toLowerCase();
  const sort = getParam("sort");
  const prices = useMarketStore((state) => state.prices);

  const markets: MarketRowProps[] = [];

  for (const [symbol, price] of Object.entries(prices)) {
    const baseline = baselines[symbol];

    if (baseline === undefined) {
      continue;
    }

    if (!symbol.toLowerCase().includes(search)) {
      continue;
    }

    markets.push({
      symbol,
      price,
      baseline,
      direction: directions[symbol],
      percentageChange: calculatePercentageChange(price, baseline),
    });
  }

  if (sort === "currentPrice") {
    markets.sort((a, b) => b.price - a.price);
  }

  if (sort === "priceChange") {
    markets.sort((a, b) => b.percentageChange - a.percentageChange);
  }

  if (sort === "name") {
    markets.sort((a, b) => a.symbol.localeCompare(b.symbol));
  }

  return (markets);
}