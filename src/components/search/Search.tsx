import {CiSearch} from 'react-icons/ci';
import {useQueryParams} from '@hooks/useQueryParams';

export default function Search() {
  const {getParam, setParam} = useQueryParams();

  const search = getParam('search');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setParam('search', event.target.value);
  };

  return (
    <div className="w-full rounded-3xl border border-gray-300 dark:border-gray-600 px-3 py-1 sm:w-64 flex items-center lg:gap-2">
      <CiSearch className="text-gray-900 dark:text-white hidden lg:block" />
      <input
        type="text"
        placeholder="Search symbol or name"
        value={search}
        onChange={handleSearchChange}
        className="lg:w-[95%] w-full text-gray-300 outline-none placeholder:text-gray-300"
      />
    </div>
  );
}
