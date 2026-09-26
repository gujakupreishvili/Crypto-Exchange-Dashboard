import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useAlerts } from "../../hook/useAlert";

export default function Alert() {
  const alerts = useAlerts();

  if (alerts.length === 0) {
    return null;
  }

  return (
    <div className="fixed right-5 top-5 z-50 flex w-96 flex-col gap-3">
      {alerts.map(
        ({
          symbol,
          initialPrice,
          currentPrice,
          percentageChange,
          direction,
        }) => {
          const isIncreased = direction === "increased";

          return (
            <div
              key={symbol}
              className="overflow-hidden rounded-2xl border border-white/10 bg-gray-950/95 p-4 text-white shadow-2xl backdrop-blur-xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                    Price Alert
                  </p>

                  <p className="mt-1 text-lg font-semibold">
                    {symbol.replace("USDT", "")}
                    <span className="text-gray-500">/USDT</span>
                  </p>
                </div>

                <div
                  className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                    isIncreased
                      ? "bg-green-500/10 text-green-400"
                      : "bg-red-500/10 text-red-400"
                  }`}
                >
                  {isIncreased ? (
                    <FaChevronUp size={10} />
                  ) : (
                    <FaChevronDown size={10} />
                  )}
                  {Math.abs(percentageChange).toFixed(2)}%
                </div>
              </div>

              <div
                className={`mt-3 flex items-center gap-2 text-sm font-medium ${
                  isIncreased ? "text-green-400" : "text-red-400"
                }`}
              >
                {isIncreased ? (
                  <FaChevronUp size={12} />
                ) : (
                  <FaChevronDown size={12} />
                )}

                <span>
                  {isIncreased ? "Increased" : "Decreased"} by{" "}
                  {Math.abs(percentageChange).toFixed(2)}%
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/10 pt-3">
                <div>
                  <p className="text-xs text-gray-500">Initial price</p>
                  <p className="mt-1 text-sm font-medium text-gray-200">
                    ${initialPrice.toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Current price</p>
                  <p className="mt-1 text-sm font-medium text-gray-200">
                    ${currentPrice.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
}
