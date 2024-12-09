import React, {useState, useEffect} from 'react'
import NavBar from "../components/navBar"
import { useCookie } from '../global/CookieContext'
import './pages.css'
import SearchBar from "../components/searchBar"
import axios from "axios"
import { IoIosArrowRoundForward, IoIosArrowRoundUp } from "react-icons/io";

const HomePage = () => {
  // Get cookie methods from our context api class "CookieContext"
  const { cookieData, saveCookieData, clearCookieData } = useCookie();

  const [categories, setCategories] = useState([{name: "Socks", isCheck: false}, {name: "Boots", isCheck: false},{name: "Sweater", isCheck: false},{name: "Pants", isCheck: false},{name: "Shorts", isCheck: false}, {name: "Dresses", isCheck: false}, {name: "Shirt", isCheck: false}, {name: "Jackets", isCheck: false},{name: "NoneCategory", isCheck: true}]);
  const [genres, setGenres] = useState([{name: "Men", isCheck: false}, {name: "Woman", isCheck: false}, {name: "NoneGenre", isCheck: true}]);
  const [brands, setBrands] = 
  useState([{name: "Hanes", isCheck: false}, {name: "Carhartt", isCheck: false}, {name: "Wrangler", isCheck: false}, {name: "Levi's", isCheck: false},
    {name: "DREAM PAIRS", isCheck: false}, {name: "Lynkiss", isCheck: false}, {name: "LACOZY", isCheck: false}, {name: "Kirkland", isCheck: false},
    {name: "Heymoments", isCheck: false}, {name: "Under Armour", isCheck: false}, {name: "Mountain Warehouse", isCheck: false}, {name: "NoneBrand", isCheck: true}]);
  
  // keeps track of user's chosen options from the dropdowns
  const [selectedOptionsName, setSelectedOptionsName] = useState("none");
  const [selectedOptionsPrice, setSelectedOptionsPrice] = useState("none");

  // keeps track of user's chosen options from the 3 sections
  const [chosenOptions, setChosenOptions] = useState({category: "", genre: "", brand: ""});

  // catalogues
  const [items, setItems] = useState([]);

  // filter catalogues
  const [filteredItems, setFilteredItems] = useState([]);

  // text visibility when clicking 'view detail' button
  const [visibleDetails, setVisibleDetails] = useState({});

  // fetches catalogues/items from data base on inital load
  useEffect(() => {
    // console.log(JSON.stringify(cookieData));
    const fetchItems = async() => {
      try {
        const response = await axios.get(`http://localhost:3001/api/catalogues/getItems`, {
          headers: {
            'Content-Type': 'application/json',
          }}
        );
        console.log(response.data);
        setItems(response.data);
        setFilteredItems(response.data);
      }
      catch (error) {
        console.error("Failed to fetch all items: ", error)
      }
    }
    // invoke 
    fetchItems();
  }, []);

  // Handle checkbox changes for categories, genres, and brands
  const handleRadioBoxChange = (e, type) => {

    const { name, checked } = e.target;

    if (type === "category"){
      // update categories list by checking the right category that has been selected
      setCategories((prevCategories) => {
          return prevCategories.map((category) => {
            if (category.name === name) {
              return { ...category, isCheck: checked }; // return updated category
            }
            return { ...category, isCheck: false}; // return unmodified category 
          }
        );
      });

      // update chosen options
      setChosenOptions((prevOptions) => {
        if (name === "NoneCategory")
          return {...prevOptions, category: "NoneCategory"}
        
        return {...prevOptions, category: name}
      });
    }
    else if (type === "genre"){
      // update genres list by checking the right genre that has been selected
      setGenres((prevGenres) => {
        return prevGenres.map((genre) => {
          if (genre.name === name) {
            return { ...genre, isCheck: checked }; // return updated genre
          }
          return {...genre, isCheck: false}; // return unmodified genre 
        }
      );
      });

      // update chosen options
      setChosenOptions((prevOptions) => {
        if (name === "NoneGenre")
          return {...prevOptions, genre: "NoneGenre"}
        
        return {...prevOptions, genre: name}
      });
    }
    else if (type === "brand"){
      // update brands list by checking the right brand that has been selected
      setBrands((prevBrands) => {
        return prevBrands.map((brand) => {
          if (brand.name === name) {
            return { ...brand, isCheck: checked }; // return updated brand
          }
          return {...brand, isCheck: false}; // return unmodified brand 
        }
      );
      });

      // update chosen options
      setChosenOptions((prevOptions) => {
        if (name === "NoneBrand")
          return {...prevOptions, brand: "NoneBrand"}
        
        return {...prevOptions, brand: name}
      });
    }
  }

  // method for handling name dropdown change
  const handleDropdownChangeName = (e) => {
    const selectedValue = e.target.value;
    setSelectedOptionsName(selectedValue);
    if (selectedValue === "name") {
      const filter = filteredItems.sort((a,b) => {
        const nameA = a.Item1.name.toLowerCase();
        const nameB = b.Item1.name.toLowerCase();
      
        if (nameA < nameB) return -1; // a comes before b
        if (nameA > nameB) return 1;  // b comes before a
        return 0; // Equal names 
      });
    setSelectedOptionsPrice("none");
      setFilteredItems(filter);
    }

  }

   // method for handling price dropdown change
   const handleDropdownChangePrice = (e) => {
    const selectedValue = e.target.value;
    setSelectedOptionsPrice(selectedValue);
   
     
     if (selectedValue === "ascending"){
      const filter = filteredItems.sort(
        (a, b) => parseFloat(a.Item1.price.$numberDecimal) - parseFloat(b.Item1.price.$numberDecimal)
      );
      setFilteredItems(filter);
     }
     else if (selectedValue === "descending") {
      const filter = filteredItems.sort(
        (a, b) => parseFloat(b.Item1.price.$numberDecimal) - parseFloat(a.Item1.price.$numberDecimal)
      );
      setFilteredItems(filter);
     }

     setSelectedOptionsName("none");
   }

  // method used to filter items by category, genre, or brand
  const handleSubmit = () => {
    console.log(chosenOptions);
    // filter logic applies to the entire inventory, not the current set of items 
    const filter = items.filter((item) => {
          // Check if the item's category, genre, and brand match the selected filters (excluding "None")
        let isMatch = true;

        if (chosenOptions.category && chosenOptions.category !== "NoneCategory") {
          isMatch = isMatch && item.Item1.category === chosenOptions.category;
        }

        if (chosenOptions.genre && chosenOptions.genre !== "NoneGenre") {
          isMatch = isMatch && item.Item1.genre === chosenOptions.genre;
        }

        if (chosenOptions.brand && chosenOptions.brand !== "NoneBrand") {
          isMatch = isMatch && item.Item1.brand === chosenOptions.brand;
        }

      return isMatch;
    });
    
    setFilteredItems(filter);
  }

  const toggleVisibility = (itemId) => {
    setVisibleDetails((prevState) => ({
      ...prevState,
      [itemId]: !prevState[itemId] // if itemid not in visibility array, it adds it. Otherwise, it toggles it on/off via !prevState[itemId]
    }));
  }

  return (
    <div>
      <NavBar />
      <div className="mainContainerGrid">
          <div className="left">
              <div>
                Categories
                <div className="radioBoxContainer">
                  {categories.map((category, index) => {
                    return (
                    <label key={index}>
                      <input type="radio" name={category.name} checked={category.isCheck} onChange={(e) => handleRadioBoxChange(e, "category")} />
                      {category.name !== "NoneCategory" ? category.name : "None"}
                    </label>
                    );
                  })}
                </div>
              </div>
              <div>
                Genres
                <div className="radioBoxContainer">
                  {genres.map((genre, index) => {
                      return (
                      <label key={index}>
                        <input type="radio" name={genre.name} checked={genre.isCheck} onChange={(e) => handleRadioBoxChange(e, "genre")} />
                        {genre.name !== "NoneGenre" ? genre.name: "None"}
                      </label>
                      );
                    })}
                </div>
              </div>
              <div>
                Brands
                <div className="radioBoxContainer">
                  {brands.map((brand, index) => {
                        return (
                        <label key={index}>
                          <input type="radio" name={brand.name} checked={brand.isCheck} onChange={(e) => handleRadioBoxChange(e, "brand")} />
                          {brand.name !== "NoneBrand" ? brand.name : "None"}
                        </label>
                        );
                      })}
                </div>
              </div>
              <button onClick={handleSubmit}>Apply Changes</button>
          </div>
          <div className="right">
              <div style={{display: "flex", gap: "20px", padding: "1rem", position: "sticky", top: "0", zIndex:"3"}}>
                <SearchBar items={items} setItems={setItems} filteredItems={filteredItems} setFilteredItems={setFilteredItems}/>
                <div style={{display: "flex", gap: "5px"}}>
                  Sort by name
                  <select value={selectedOptionsName} onChange={handleDropdownChangeName}>
                    <option value="none">None</option>
                    <option value="name">Name</option>
                  </select>
                </div>
                <div style={{display: "flex", gap: "5px"}}>
                  Sort by price
                  <select value={selectedOptionsPrice} onChange={handleDropdownChangePrice}>
                    <option value="none">None</option>
                    <option value="ascending">Ascending</option>
                    <option value="descending">Descending</option>
                  </select>
                </div>
              </div> 
              <div className="itemsContainer">
                {filteredItems.map((item, index) => (
                  <div className="item" key={index}>
                    <div className="placeHolder">Image Placeholder</div>
                    {item.Item1.name}
                    <button className="addCartButton">Add to cart</button>
                    <button onClick={() => toggleVisibility(item._id)} style={{display: "flex",  alignItems: "center"}}>{visibleDetails[item._id] ? (<>Hide Details <IoIosArrowRoundUp size={20} /></>) : (<>View Details <IoIosArrowRoundForward size={20} /></>)}</button>
                  
                      {visibleDetails[item._id] && (<div className="infoBox"> 
                      <strong>Description:</strong> <div>{item.Item1.description}</div>
                      <strong>Category:</strong> {item.Item1.category}
                      <br />
                      <strong>Genre:</strong>{item.Item1.genre}
                      <br />
                      <strong>Brand:</strong> {item.Item1.brand}
                      <br />
                      <strong>Keywords:</strong> {item.Item1.keywords}
                      <br />
                      <strong>Price:</strong> {"$" + String(item.Item1.price.$numberDecimal || item.Item1.price)}</div>)}
                   
                  </div>
                ))}
                
                
              </div>

          </div>
      </div>
    </div>
  )
}

export default HomePage
