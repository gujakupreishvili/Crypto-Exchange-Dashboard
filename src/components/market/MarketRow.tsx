import {
  FaChevronDown,
  FaChevronUp,
  FaRegEye,
  FaRegEyeSlash,
  FaRegStar,
  FaStar,
} from "react-icons/fa";
import type { MarketRowProps } from "../../types/market";
import { useState } from "react";

export default function MarketRow({
  symbol,
  price,
  direction,
  percentageChange,
  isFavorite,
  onToggleFavorite,
  isHidden,
  onToggHideen,
}: MarketRowProps) {
  const directionColor =
    direction === "up"
      ? "text-green-400"
      : direction === "down"
      ? "text-red-400"
      : "text-gray-400";

  const priceChanged = direction !== "unchanged";

  return (
    <tr
      className={`cursor-pointer border-b border-gray-800/50 last:border-b-0 transition-colors duration-300 hover:bg-gray-800/40 ${
        priceChanged ? "bg-yellow-400/10" : "bg-gray-900/60"
      }`}
    >
      <td className="px-5 py-4 font-medium text-white">
        {symbol.replace("USDT", "")}
        <span className="ml-2 text-sm font-normal text-gray-500">/ USDT</span>
      </td>

      <td className="px-5 py-4 text-center font-medium text-white">
        $
        {price.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </td>

      <td className={`px-5 py-4 text-center font-medium ${directionColor}`}>
        {percentageChange >= 0 ? "+" : ""}
        {percentageChange.toFixed(2)}%
      </td>

      <td className="px-5 py-4 text-center">
        <button
          type="button"
          aria-label="Add to favorites"
          className="text-white transition-transform hover:scale-110"
          onClick={onToggleFavorite}
        >
          {isFavorite ? (
            <FaStar className="mx-auto text-yellow-400" />
          ) : (
            <FaRegStar className="mx-auto text-white" />
          )}
        </button>
      </td>

      <td className="px-5 py-4 text-center">
        <button
          type="button"
          aria-label="Hide market"
          className="text-white transition-transform hover:scale-110"
          onClick={onToggHideen}
        >
          {isHidden ? <FaRegEyeSlash /> : <FaRegEye />}
        </button>
      </td>

      <td className={`px-5 py-4 text-center  ${directionColor}`}>
        <div className="flex justify-center w-3">
          {direction === "up" && <FaChevronUp size={13} />}
          {direction === "down" && <FaChevronDown size={13} />}
        </div>
      </td>
    </tr>
  );
}
