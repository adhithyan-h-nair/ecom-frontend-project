import { CiSearch } from "react-icons/ci";

const Search = () => {
  return (
    <div>
        <div className="flex bg-indigo-100 items-center justify-center border rounded-lg px-3 py-1 focus-within:border-2 focus-within:border-indigo-600">
            <input type="search" placeholder="type" className="outline-0 w-full"/>
            <div className="cursor-pointer">
                <CiSearch />
            </div>
        </div>
    </div>
  )
}

export default Search