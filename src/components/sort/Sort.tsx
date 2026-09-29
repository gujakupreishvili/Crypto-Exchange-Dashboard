import {useQueryParams} from '@hooks/useQueryParams';

export default function Sort() {
  const {getParam, setParam} = useQueryParams();
  const sort = getParam('sort');
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setParam('sort', event.target.value);
  };

  return (
    <select
      value={sort}
      onChange={handleChange}
      className="rounded-3xl border border-gray-300 bg-white px-1 lg:px-2 py-2 text-gray-900 outline-none dark:border-gray-600 dark:bg-black dark:text-white">
      {!sort && (
        <option
          value=""
          disabled>
          Sort
        </option>
      )}

      {sort && <option value="">Cancel</option>}

      <option value="currentPrice">Current price</option>
      <option value="priceChange">Price change</option>
      <option value="name">Name</option>
    </select>
  );
}
