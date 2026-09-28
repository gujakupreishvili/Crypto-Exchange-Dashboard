import {useEffect, useRef, useState} from 'react';
import {useMarketStream} from '@hooks/useMarketStream';
import {calculatePercentageChange} from '@lib/price';

const ALERT_THRESHOLD = 2;

type Alert = {
  id: string;
  symbol: string;
  initialPrice: number;
  currentPrice: number;
  percentageChange: number;
  direction: 'increased' | 'decreased';
};

export const useAlerts = () => {
  const {prices, baselines} = useMarketStream();

  const alertedSymbols = useRef<Set<string>>(new Set());
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    for (const [symbol, price] of Object.entries(prices)) {
      const baseline = baselines[symbol];

      if (baseline === undefined) {
        continue;
      }

      const percentageChange = calculatePercentageChange(price, baseline);
      const isThresholdReached = Math.abs(percentageChange) >= ALERT_THRESHOLD;

      if (!isThresholdReached) {
        alertedSymbols.current.delete(symbol);
        continue;
      }

      if (alertedSymbols.current.has(symbol)) {
        continue;
      }

      alertedSymbols.current.add(symbol);

      const newAlert: Alert = {
        id:crypto.randomUUID(),
        symbol,
        initialPrice: baseline,
        currentPrice: price,
        percentageChange,
        direction: percentageChange > 0 ? 'increased' : 'decreased',
      };

      setAlerts(currentAlerts => [...currentAlerts, newAlert]);
    }
  }, [prices, baselines]);

  const dismissAlert = (id: string) => {
    setAlerts(currentAlerts => currentAlerts.filter(alert => alert.id !== id));
  };

  return {alerts, dismissAlert};
};
