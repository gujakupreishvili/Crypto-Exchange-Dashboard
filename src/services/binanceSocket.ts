import { MARKET_PAIRS } from '../data/pairs';
import type { MarketPrice } from '../types/market';

const streams = MARKET_PAIRS
  .map((symbol) => `${symbol.toLowerCase()}@miniTicker`)
  .join('/');

const BINANCE_WS_URL = `wss://stream.binance.com:9443/stream?streams=${streams}`;

export const connectToBinance = (
  onTick: (marketPrice: MarketPrice) => void,
) => {
  const socket = new WebSocket(BINANCE_WS_URL);

  socket.onopen = () => {
    console.log('Connected to Binance');
  };

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);

    const { s: symbol, c: price } = message.data;

    onTick({
      symbol,
      price: Number(price),
    });
  };

  socket.onerror = (error) => {
    console.error('Binance WebSocket error:', error);
  };

  socket.onclose = () => {
    console.log('Disconnected from Binance');
  };

  return socket;
};