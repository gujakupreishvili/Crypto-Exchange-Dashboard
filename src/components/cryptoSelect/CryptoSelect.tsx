import type {CryptoSelectProps} from '@/types/CryptoSelectProps';
import {useMarketStream} from '@hooks/useMarketStream';

export default function CryptoSelect({value, onChange}: CryptoSelectProps) {
  const {baselines} = useMarketStream();

  return (
    <select
      value={value}
      onChange={event => onChange(event.target.value)}
      className="w-full rounded-lg border border-gray-950 bg-white dark:bg-gray-950 py-2 text-gray-900 dark:text-white outline-none">
      <option value="">Select crypto</option>

      {Object.keys(baselines).map(symbol => (
        <option
          key={symbol}
          value={symbol}>
          {symbol.split('USDT')[0]}
        </option>
      ))}
    </select>
  );
}
