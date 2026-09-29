import {ConnectStatus, Search, Sort, ThemeToggle} from '@/components';

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white px-5 py-4 dark:border-gray-800 dark:bg-black">
      <div className="mx-auto flex max-w-360 flex-wrap items-center gap-4">
        <div className="shrink-0">
          <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Crypto<span className="text-blue-600 dark:text-blue-400">Dash</span>
          </h1>
        </div>

        <div className="order-5 flex w-full gap-2 sm:order-0 sm:w-auto sm:flex-1">
          <div className="min-w-0 flex-1">
            <Search />
          </div>

          <Sort />
        </div>

        <div className="order-3 ml-auto sm:order-0 sm:ml-0">
          <ConnectStatus />
        </div>

        <div className="order-4 sm:order-0">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
