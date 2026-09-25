export type MarketPair = {
  symbol: string;
  name: string;
};

export type MarketPrice = {
  symbol: string;
  price: number;
};
export type MarketRowProps = {
  symbol: string;
  price: number;
  baseline: number;
  direction?: PriceDirection;
  percentageChange: number;
};

export type PriceDirection = "up" | "down" | "unchanged";

export type ConnectionStatus =
  | "loading"
  | "connected"
  | "reconnecting"
  | "disconnected"
  | "error";
