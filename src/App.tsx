import {Header, MarketList, CryptoConverter} from '@components';

function App() {
  return (
    <>
      <Header />
      <div className=" flex flex-col lg:flex-row justify-between max-w-360 mx-auto ">
        <MarketList />
        <CryptoConverter />
      </div>
    </>
  );
}

export default App;
