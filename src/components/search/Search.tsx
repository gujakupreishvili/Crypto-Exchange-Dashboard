import { useQueryParams } from "../../hook/useQueryParams";

export default function Search() {
  const { getParam, setParam } = useQueryParams();

  const search = getParam("search");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setParam("search", event.target.value);
  };

  return (
    <div className="rounded-3xl border border-gray-600 px-3 py-1">
      <input
        type="text"
        placeholder="Search symbol or name"
        value={search}
        onChange={handleSearchChange}
        className="w-full text-gray-300 outline-none placeholder:text-gray-300"
      />
    </div>
  );
}
