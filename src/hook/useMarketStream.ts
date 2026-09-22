import { useEffect, useState } from "react";
import { connectToBinance } from "../services/binanceSocket";
import { getPriceDirection } from "../lib/price";
import type {
  ConnectionStatus,
  MarketPrice,
  PriceDirection,
} from "../types/market";

export const useMarketStream = () => {
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [baselines, setBaselines] = useState<Record<string, number>>({});
  const [directions, setDirections] = useState<Record<string, PriceDirection>>(
    {}
  );
  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatus>("loading");

  useEffect(() => {
    setConnectionStatus("loading");

    const socket = connectToBinance((tick: MarketPrice) => {
      setPrices((currentPrices) => {
        const previousPrice = currentPrices[tick.symbol];

        if (previousPrice !== undefined) {
          setDirections((currentDirections) => ({
            ...currentDirections,
            [tick.symbol]: getPriceDirection(tick.price, previousPrice),
          }));
        }

        return {
          ...currentPrices,
          [tick.symbol]: tick.price,
        };
      });

      setBaselines((currentBaselines) => {
        if (currentBaselines[tick.symbol] !== undefined) {
          return currentBaselines;
        }

        return {
          ...currentBaselines,
          [tick.symbol]: tick.price,
        };
      });
    });

    socket.onopen = () => {
      setConnectionStatus("connected");
    };

    socket.onerror = () => {
      setConnectionStatus("error");
    };

    socket.onclose = () => {
      setConnectionStatus("disconnected");
    };

    return () => {
      socket.close();
    };
  }, []);

  return {
    prices,
    baselines,
    directions,
    connectionStatus,
  };
};
