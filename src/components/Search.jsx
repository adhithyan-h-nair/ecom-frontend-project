import { CiSearch } from "react-icons/ci";

const Search = ({ onSearch, query }) => {
  return (
    <div className="flex bg-indigo-100 items-center justify-center border rounded-lg px-3 py-1 focus-within:border-2 focus-within:border-indigo-600 w-md">
      <input
        onChange={(e) => onSearch(e.target.value)}
        value={query}
        type="search"
        placeholder="Search products..."
        className="outline-0 w-full"
      />
      <CiSearch className="text-xl cursor-pointer" />
    </div>
  );
};

export default Search;