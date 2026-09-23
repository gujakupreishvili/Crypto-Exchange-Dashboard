import { useQueryParams } from "../../hook/useQueryParams";

export default function Sort() {
  const { getParam, setParam } = useQueryParams();
  const sort = getParam("sort");
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setParam("sort", event.target.value);
  };

  return (
    <select
      value={sort}
      onChange={handleChange}
      className="border border-gray-600 bg-black text-white"
    >
      {!sort && (
        <option value="" disabled>
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
