import { IoSwapVertical } from "react-icons/io5";
import CryptoSelect from "./CryptoSelect";
import { useState } from "react";
import { useMarketStream } from "../../hook/useMarketStream";

export default function CryptoConverter() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const { prices } = useMarketStream();
  const fromPrice = prices[from];
  const toPrice = prices[to];

  const result = (Number(amount) * fromPrice) / toPrice;

  return (
    <section className="mx-4 mt-8 w-[30%] min-w-[320px]">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-white">Crypto Converter</h1>
        <p className="mt-1 text-sm text-gray-500">
          Convert between cryptocurrencies using live prices
        </p>
      </div>

      <div className="rounded-2xl border border-gray-800 bg-gray-950 p-5 shadow-xl">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-medium text-gray-400">From</label>

            {fromPrice && (
              <span className="text-xs text-gray-500">
                ${fromPrice.toLocaleString()}
              </span>
            )}
          </div>
          <CryptoSelect value={from} onChange={setFrom} />
        </div>
        <div className="mt-5">
          <label className="mb-2 block text-sm font-medium text-gray-400">
            Amount
          </label>

          <div className="relative">
            <input
              type="number"
              min="0"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              placeholder="0.00"
              className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 text-lg text-white outline-none transition placeholder:text-gray-600 focus:border-gray-600"
            />

            {from && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500">
                {from.replace("USDT", "")}
              </span>
            )}
          </div>
        </div>
        <div className="relative my-5 flex items-center justify-center">
          <div className="absolute h-px w-full bg-gray-800" />

          <button
            type="button"
            onClick={() => {
              setFrom(to);
              setTo(from);
            }}
            className="relative z-10 rounded-full border border-gray-700 bg-gray-950 p-2 text-gray-300 transition hover:border-gray-500 hover:text-white"
          >
            <IoSwapVertical className="text-xl" />
          </button>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-medium text-gray-400">To</label>

            {toPrice && (
              <span className="text-xs text-gray-500">
                ${toPrice.toLocaleString()}
              </span>
            )}
          </div>

          <CryptoSelect value={to} onChange={setTo} />
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-gray-800 bg-gray-900/60 p-5">
        <p className="text-sm font-medium text-gray-500">You will receive</p>

        <div className="mt-2 flex items-baseline gap-2">
          <h2 className="text-3xl font-semibold text-white">
            {Number.isFinite(result)
              ? result.toLocaleString(undefined, {
                  maximumFractionDigits: 8,
                })
              : "0.00"}
          </h2>

          {to && (
            <span className="text-lg font-medium text-gray-400">
              {to.replace("USDT", "")}
            </span>
          )}
        </div>

        {fromPrice && toPrice && (
          <p className="mt-2 text-xs text-gray-500">
            1 {from.replace("USDT", "")} ≈{" "}
            {(fromPrice / toPrice).toLocaleString(undefined, {
              maximumFractionDigits: 8,
            })}{" "}
            {to.replace("USDT", "")}
          </p>
        )}
      </div>
    </section>
  );
}
