import { useEffect } from "react";
import { useMarketStream } from "./hook/useMarketStream";

function App() {
  const { prices, connectionStatus } = useMarketStream();

  useEffect(() => {
    console.log("Prices:", prices);
  }, [prices, connectionStatus]);

  return <h1 className="text-red-400">hello world</h1>;
}

export default App;
