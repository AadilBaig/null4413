import React, {useState} from 'react'
import { IoMdSearch } from "react-icons/io";

const SearchBar = () => {
    const [queryInput, setQueryInput] = useState(""); // keeps track of current input
    const handleInputChange = (event) => {
        setQueryInput(event.target.value);

        // sends current input back to callback funtion onSearch

    };

    const handleSearch = () => {

    }
  return (
    <div>
      <input type="text" placeholder="Search..." value={queryInput} onChange={handleInputChange} />
      <button onClick={handleSearch}>
        <IoMdSearch />
      </button>
    </div>
  )
}

export default SearchBar
