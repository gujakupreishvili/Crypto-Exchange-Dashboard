import ConnectStatus from "../connectStatus/ConnectStatus";
import Search from "../search/Search";
import Sort from "../sort/Sort";

export default function Header() {
  return (
    <header className="border-b border-gray-700 bg-black p-4">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-white">Logo</h1>

        <ConnectStatus />

        <div className="flex w-full gap-2 sm:w-auto sm:flex-1 md:flex-none">
          <div className="min-w-0 flex-1 sm:flex-none">
            <Search />
          </div>

          <Sort />
        </div>
      </div>
    </header>
  );
}
