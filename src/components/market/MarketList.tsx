import { marketListHelper } from "./helper/marketListHelper";
import MarketRow from "./MarketRow";

export default function MarketList() {
  const markets = marketListHelper();
  return (
    <section className="mx-4 mt-8 w-[60%]">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-white">Market Place</h1>
        <p className="mt-1 text-sm text-gray-400">
          Live cryptocurrency market prices
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-950">
        <div className="flex items-center border-b border-gray-800 px-5 py-3 text-xs font-medium uppercase tracking-wider text-gray-500">
          <span className="flex-1">Market</span>
          <span className="w-40">Price</span>
          <span className="w-32">Change</span>
          <span className="w-8"></span>
        </div>

        <ul className="flex flex-col gap-2 p-3">
          {markets.map((market) => (
            <MarketRow
              key={market.symbol}
              symbol={market.symbol}
              price={market.price}
              baseline={market.baseline}
              direction={market.direction}
              percentageChange={market.percentageChange}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
