import { MARKET_PAIRS } from "../data/pairs";
import { useMarketStore } from "../store/marketStore";
import type { MarketPrice } from "../types/market";

const streams = MARKET_PAIRS.map(
  (symbol) => `${symbol.toLowerCase()}@miniTicker`
).join("/");

const BINANCE_WS_URL = `wss://stream.binance.com:9443/stream?streams=${streams}`;

let socket: WebSocket | null = null;
let subscribers = 0;
let reconnectTimer: ReturnType<typeof setTimeout> | null = null;

export const connectToBinance = (
  onTick: (marketPrice: MarketPrice) => void
) => {
  const socket = new WebSocket(BINANCE_WS_URL);

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);

    const { s: symbol, c: price } = message.data;

    onTick({
      symbol,
      price: Number(price),
    });
  };

  return socket;
};
const scheduleReconnect = () => {
  if (subscribers === 0) {
    return;
  }

  if (reconnectTimer) {
    return;
  }
  reconnectTimer = setTimeout(() => {
    reconnectTimer = null;
    createMarketSocket();
  }, 1000);
};

const createMarketSocket = () => {
  const activeSocket = connectToBinance((tick) => {
    const { setPrice, setBaseline } = useMarketStore.getState();

    setPrice(tick.symbol, tick.price);
    setBaseline(tick.symbol, tick.price);
  });
  socket = activeSocket;

  activeSocket.onopen = () => {
    if (socket !== activeSocket) {
      return;
    }

    useMarketStore.getState().setConnectionStatus("connected");
  };
  activeSocket.onerror = () => {
    if (socket !== activeSocket) {
      return;
    }

    useMarketStore.getState().setConnectionStatus("error");
  };
  activeSocket.onclose = () => {
    if (socket !== activeSocket) {
      return;
    }
    socket = null;

    useMarketStore.getState().setConnectionStatus("disconnected");
    scheduleReconnect();
  };
};

export const acquireMarketStream = () => {
  subscribers += 1;

  if (socket) {
    return;
  }
  if (reconnectTimer) {
    clearTimeout(reconnectTimer);
    reconnectTimer = null;
  }

  createMarketSocket();
};
export const releaseMarketStream = () => {
  subscribers = Math.max(0, subscribers - 1);
  if (subscribers > 0) {
    return;
  }
  if (reconnectTimer) {
    clearTimeout(reconnectTimer);
    reconnectTimer = null;
  }

  socket?.close();
  socket = null;
};
