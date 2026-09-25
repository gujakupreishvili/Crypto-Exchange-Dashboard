import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import type { MarketRowProps } from "../../types/market";

export default function MarketRow({
  symbol,
  price,
  direction,
  percentageChange,
}: MarketRowProps) {
  const directionColor =
    direction === "up"
      ? "text-green-400"
      : direction === "down"
      ? "text-red-400"
      : "text-gray-400";

  const priceChanged = direction !== "unchanged";

  return (
    <li
      className={`flex items-center rounded-xl border px-5 py-4 transition-all duration-300 ${
        priceChanged
          ? "border-yellow-400/50 bg-yellow-400/10"
          : "border-gray-800 bg-gray-900/60"
      }cursor-pointer`}
    >
      <div className="flex-1 font-medium text-white">
        {symbol.replace("USDT", "")}

        <span className="ml-2 text-sm font-normal text-gray-500">/ USDT</span>
      </div>

      <div className="w-40 font-medium text-white">
        $
        {price.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </div>

      <div className={`w-32 font-medium ${directionColor}`}>
        {percentageChange >= 0 ? "+" : ""}
        {percentageChange.toFixed(2)}%
      </div>

      <div className={`flex w-8 justify-center ${directionColor}`}>
        {direction === "up" && <FaChevronUp size={13} />}
        {direction === "down" && <FaChevronDown size={13} />}
      </div>
    </li>
  );
}
