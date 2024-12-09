import React, {useState} from 'react'
import { IoMdSearch } from "react-icons/io";

// items is the current list of items (If called from homepage, items = entire inventory. If called from cart, items = all items in cart)
const SearchBar = ({ items, setItems, filteredItems, setFilteredItems}) => {
    const [searchVal, setSearchVal] = useState(""); // keeps track of current input

    const handleSearch = () => {
        // reset filtered items 
        if (searchVal === ""){
          setFilteredItems(items);
          return;
        }
        // filter items
        const filter = items.filter((item) => {
       
          // converts keywords and searchVal to lowercase to allow for non-case sensitive searching
          const keywordMatch = item.Item1.keywords
          .map(keyword => keyword.toLowerCase()) 
          .includes(searchVal.toLowerCase()); 

          // checks if search value is included in the item name or as a keyword 
          if (item.Item1.name.toLowerCase().includes(searchVal.toLowerCase()) || keywordMatch){
            return item;
          }
        })
        setFilteredItems(filter); 
    }

    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    }

  return (
    <div>
      <input type="text" placeholder="Search..." value={searchVal} onChange={e => setSearchVal(e.target.value)} onKeyDown={handleKeyDown}/>
      <button onClick={handleSearch}>
        <IoMdSearch />
      </button>
    </div>
  )
}

export default SearchBar
