import type {ConnectionStatus} from '@/types/market';
import {useMarketStream} from '@hooks/useMarketStream';

function getStatusColor(status: ConnectionStatus): string {
  switch (status) {
    case 'connected': {
      return 'text-green-500';
    }
    case 'disconnected': {
      return 'text-red-600 dark:text-red-400';
    }
    case 'loading':
    case 'reconnecting': {
      return 'text-amber-300';
    }
    default: {
      return 'text-red-500';
    }
  }
}

export default function ConnectStatus() {
  const {connectionStatus} = useMarketStream();

  return (
    <div className="flex items-center rounded-3xl border border-dashed border-gray-300 px-3 py-2 dark:border-gray-600">
      <span className={`h-2.5 w-2.5 rounded-full bg-current mr-1 ${getStatusColor(connectionStatus)}`} />

      <p className={` text-sm sm:ml-2  ${getStatusColor(connectionStatus)}`}>{connectionStatus}</p>
    </div>
  );
}
