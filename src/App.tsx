import CryptoConverter from "./components/cryptoConverter/CryptoConverter";
import Header from "./components/header/Header";
import MarketList from "./components/market/MarketList";

function App() {
  return (
    <>
      <Header />
      <div className=" flex flex-col lg:flex-row justify-between">
        <MarketList />
        <CryptoConverter />
      </div>
    </>
  );
}

export default App;
