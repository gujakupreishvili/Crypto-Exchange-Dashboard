import { useEffect } from "react";
import {
  acquireMarketStream,
  releaseMarketStream,
} from "../services/binanceSocket";
import { useMarketStore } from "../store/marketStore";

export const useMarketStream = () => {
  const prices = useMarketStore((state) => state.prices);
  const directions = useMarketStore((state) => state.directions);
  const baselines = useMarketStore((state) => state.baselines);
  const connectionStatus = useMarketStore((state) => state.connectionStatus);

  useEffect(() => {
    acquireMarketStream();
    return () => {
      releaseMarketStream();
    };
  }, []);

  return {
    prices,
    baselines,
    directions,
    connectionStatus,
  };
};
