import { create } from "zustand";
import type { ConnectionStatus, PriceDirection } from "../types/market";
import { getPriceDirection } from "../lib/price";

type MarketStore = {
  prices: Record<string, number>;
  directions: Record<string, PriceDirection>;
  baselines: Record<string, number>;
  connectionStatus: ConnectionStatus;
  setPrice: (symbol: string, price: number) => void;
  setBaseline: (symbol: string, price: number) => void;
  setConnectionStatus: (status: ConnectionStatus) => void;
};

export const useMarketStore = create<MarketStore>((set) => ({
  prices: {},
  directions: {},
  baselines: {},
  connectionStatus: "loading",

  setPrice: (symbol, price) => {
    set((state) => {
      const previousPrice = state.prices[symbol];

      if (previousPrice === undefined) {
        return {
          prices: {
            ...state.prices,
            [symbol]: price,
          },
        };
      }

      return {
        prices: {
          ...state.prices,
          [symbol]: price,
        },
        directions: {
          ...state.directions,
          [symbol]: getPriceDirection(price, previousPrice),
        },
      };
    });
  },
  setBaseline: (symbol, price) => {
    set((state) => {
      if (state.baselines[symbol] !== undefined) {
        return state;
      }

      return {
        baselines: {
          ...state.baselines,
          [symbol]: price,
        },
      };
    });
  },
  setConnectionStatus: (status) => {
    set({ connectionStatus: status });
  },
}));
