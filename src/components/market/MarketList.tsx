import { useState } from "react";
import Alert from "../alert/Alert";
import { favoriteHelper } from "./helper/favoriteHelper";

import { marketListHelper } from "./helper/marketListHelper";
import MarketRow from "./MarketRow";
import { hiddenHelper } from "./helper/hiddenHelpet";

export default function MarketList() {
  const markets = marketListHelper();
  const { favoriteArr, toggleFavorite } = favoriteHelper();
  const { hiddenArr, toogleHidden } = hiddenHelper();
  const [chooseRow, setChooseRow] = useState<"all" | "favorite" | "hidden">(
    "all"
  );
  const filteredMarkets = markets.filter((market) => {
    if (chooseRow === "hidden") {
      return hiddenArr.includes(market.symbol);
    }

    if (hiddenArr.includes(market.symbol)) {
      return false;
    }

    if (chooseRow === "favorite") {
      return favoriteArr.includes(market.symbol);
    }

    return true;
  });

  return (
    <section className="mx-4 mt-8 lg:w-[60%] w-[95%]">
      <div className="mb-4 flex flex-col lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Market Place</h1>
          <p className="mt-1 text-sm text-gray-400">
            Live cryptocurrency market prices
          </p>
        </div>
        <div className="mt-5 inline-flex rounded-xl border border-gray-800 bg-gray-950 p-1 justify-around">
          <button
            type="button"
            onClick={() => setChooseRow("all")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              chooseRow === "all"
                ? "bg-white text-gray-950 shadow-sm"
                : "text-gray-400 hover:bg-gray-900 hover:text-white"
            }`}
          >
            All
          </button>

          <button
            type="button"
            onClick={() => setChooseRow("favorite")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              chooseRow === "favorite"
                ? "bg-white text-gray-950 shadow-sm"
                : "text-gray-400 hover:bg-gray-900 hover:text-white"
            }`}
          >
            Favorite
          </button>

          <button
            type="button"
            onClick={() => setChooseRow("hidden")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              chooseRow === "hidden"
                ? "bg-white text-gray-950 shadow-sm"
                : "text-gray-400 hover:bg-gray-900 hover:text-white"
            }`}
          >
            Hidden
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-950">
        {filteredMarkets.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            {chooseRow === "favorite"
              ? "You don't have any favorite cryptocurrencies yet."
              : chooseRow === "hidden"
              ? "You don't have any hidden cryptocurrencies."
              : "No cryptocurrencies available."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-125 border-collapse">
              <thead>
                <tr className="border-b border-gray-800 text-xs font-medium uppercase tracking-wider text-gray-500">
                  <th className="px-5 py-3 text-left">Market</th>
                  <th className="px-5 py-3 text-center">Price</th>
                  <th className="px-5 py-3 text-center">Change</th>
                  <th className="px-5 py-3 text-center">Favorites</th>
                  <th className="px-5 py-3 text-center">Hidden</th>
                  <th className="px-5 py-3 text-center"></th>
                </tr>
              </thead>

              <tbody>
                {filteredMarkets.map((market) => (
                  <MarketRow
                    key={market.symbol}
                    symbol={market.symbol}
                    price={market.price}
                    baseline={market.baseline}
                    direction={market.direction}
                    percentageChange={market.percentageChange}
                    isFavorite={favoriteArr.includes(market.symbol)}
                    onToggleFavorite={() => toggleFavorite(market.symbol)}
                    isHidden={hiddenArr.includes(market.symbol)}
                    onToggHideen={() => toogleHidden(market.symbol)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Alert />
    </section>
  );
}
