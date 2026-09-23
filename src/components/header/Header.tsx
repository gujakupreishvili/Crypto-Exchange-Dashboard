import ConnectStatus from "../connectStatus/ConnectStatus";
import Search from "../search/Search";
import Sort from "../sort/Sort";

export default function Header() {
  return (
    <header className="bg-black border-b border-gray-700 p-4 flex items-center">
      <h1 className="text-white">Logo</h1>
      <ConnectStatus />
      <Search />
      <Sort />
    </header>
  );
}
