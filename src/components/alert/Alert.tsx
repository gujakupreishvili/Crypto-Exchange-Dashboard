import {FaChevronDown, FaChevronUp, FaTimes} from 'react-icons/fa';
import {useAlerts} from '@hooks/useAlert';

export default function Alert() {
  const {alerts, dismissAlert} = useAlerts();

  if (alerts.length === 0) {
    return null;
  }

  return (
    <div className="fixed lg:right-5 top-5 z-50 flex w-[93%] lg:w-[30%] flex-col gap-3">
      {alerts.map(({id, symbol, initialPrice, currentPrice, percentageChange, direction}) => {
        const isIncreased = direction === 'increased';

        return (
          <div
            key={id}
            className=" relative overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-950/95 p-4 text-gray-900 dark:text-white shadow-2xl backdrop-blur-xl">
            <div className="flex items-start justify-between gap-4 pr-8">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Price Alert</p>

                <p className="mt-1 text-lg font-semibold">
                  {symbol.replace('USDT', '')}
                  <span className="text-gray-500">/USDT</span>
                </p>
              </div>

              <div
                className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                  isIncreased
                    ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                    : 'bg-red-500/10 text-red-600 dark:text-red-400'
                }`}>
                {isIncreased ? <FaChevronUp size={10} /> : <FaChevronDown size={10} />}
                {Math.abs(percentageChange).toFixed(2)}%
              </div>
            </div>

            <div
              className={`mt-3 flex items-center gap-2 text-sm font-medium ${
                isIncreased ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}>
              {isIncreased ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}

              <span>
                {isIncreased ? 'increased' : 'decreased'} by {Math.abs(percentageChange).toFixed(2)}% since you opened
                the page.
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-gray-200 dark:border-white/10 pt-3">
              <div>
                <p className="text-xs text-gray-500">Initial price</p>
                <p className="mt-1 text-sm font-medium text-gray-800 dark:text-gray-200">
                  ${initialPrice.toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Current price</p>
                <p className="mt-1 text-sm font-medium text-gray-800 dark:text-gray-200">
                  ${currentPrice.toLocaleString()}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => dismissAlert(id)}
              aria-label={`${symbol} alert-ის დახურვა`}
              className="absolute right-2 top-2 rounded-full p-2 text-gray-500 transition hover:bg-gray-100 dark:hover:bg-white/10 hover:text-gray-900 dark:text-white">
              <FaTimes size={12} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
