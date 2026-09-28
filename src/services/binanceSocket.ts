import {useMarketStore} from '@/store/marketStore';
import type {MarketPrice} from '@/types/market';
import {MARKET_PAIRS} from '@data/pairs';

const streams = MARKET_PAIRS.map(symbol => `${symbol.toLowerCase()}@miniTicker`).join('/');

const BINANCE_WS_URL = `wss://stream.binance.com:9443/stream?streams=${streams}`;

let socket: WebSocket | null = null;
let subscribers = 0;
let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
let hasSocketError = false;

export const connectToBinance = (onTick: (marketPrice: MarketPrice) => void) => {
  const socket = new WebSocket(BINANCE_WS_URL);

  socket.onmessage = event => {
    const message = JSON.parse(event.data);

    const {s: symbol, c: price} = message.data;

    onTick({
      symbol,
      price: Number(price),
    });
  };

  return socket;
};

const scheduleReconnect = (hasError = false) => {
  if (subscribers === 0) {
    return;
  }

  if (reconnectTimer) {
    return;
  }

  reconnectTimer = setTimeout(
    () => {
      reconnectTimer = null;

      useMarketStore.getState().setConnectionStatus('reconnecting');

      createMarketSocket();
    },
    hasError ? 1000 : 0,
  );
};

const createMarketSocket = () => {
  hasSocketError = false;
  useMarketStore.getState().setConnectionStatus('loading');

  const activeSocket = connectToBinance(tick => {
    const {setPrice, setBaseline} = useMarketStore.getState();

    setPrice(tick.symbol, tick.price);
    setBaseline(tick.symbol, tick.price);
  });

  socket = activeSocket;

  activeSocket.onopen = () => {
    if (socket !== activeSocket) {
      return;
    }

    useMarketStore.getState().setConnectionStatus('connected');
  };

  activeSocket.onerror = () => {
    if (socket !== activeSocket) {
      return;
    }

    hasSocketError = true;

    useMarketStore.getState().setConnectionStatus('error');
  };

  activeSocket.onclose = () => {
    if (socket !== activeSocket) {
      return;
    }

    socket = null;

    if (hasSocketError) {
      scheduleReconnect(true);
      return;
    }

    useMarketStore.getState().setConnectionStatus('disconnected');
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
