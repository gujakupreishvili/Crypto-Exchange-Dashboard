import { useMarketStream } from "../../hook/useMarketStream";
import type { ConnectionStatus } from "../../types/market";

function getStatusColor(status: ConnectionStatus): string {
  switch (status) {
    case "connected": {
      return "text-green-500";
    }
    case "disconnected": {
      return "text-red-400";
    }
    case "loading":
    case "reconnecting": {
      return "text-amber-300";
    }
    default: {
      return "text-red-500";
    }
  }
}

export default function ConnectStatus() {
  const { connectionStatus } = useMarketStream();

  return (
<div className="border border-dashed border-gray-600 rounded-3xl px-4 flex items-center">
      <p className={getStatusColor(connectionStatus)}>{connectionStatus}</p>
    </div>
  );
}
