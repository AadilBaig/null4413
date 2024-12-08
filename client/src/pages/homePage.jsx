import React, {useState, useEffect} from 'react'
import NavBar from "../components/navBar"
import { useCookie } from '../global/CookieContext'
import './pages.css'
import SearchBar from "../components/searchBar"

const HomePage = () => {
  // Get cookie methods from our context api class "CookieContext"
  const { cookieData, saveCookieData, clearCookieData } = useCookie();
  const [categories, setCategories] = useState([{name: "Category 1", isCheck: false}, {name: "Category 2", isCheck: false},{name: "Category 3", isCheck: false},{name: "Category 4", isCheck: false},{name: "NoneCategory", isCheck: false}]);
  const [genres, setGenres] = useState([{name: "Genre 1", isCheck: false}, {name: "Genre 2", isCheck: false}, {name: "Genre 3", isCheck: false}, {name: "Genre 4", isCheck: false}, {name: "NoneGenre", isCheck: false}]);
  const [brands, setBrands] = useState([{name: "Brand 1", isCheck: false}, {name: "Brand 2", isCheck: false}, {name: "Brand 3", isCheck: false}, {name: "Brand 4", isCheck: false}, {name: "NoneBrand", isCheck: false}]);

  // keeps track of user's chosen options
  const [chosenOptions, setChosenOptions] = useState({category: "", genre: "", brand: ""});

  useEffect(() => {
    console.log(JSON.stringify(cookieData));
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
          return {...prevOptions, category: ""}
        
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
          return {...prevOptions, genre: ""}
        
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
          return {...prevOptions, brand: ""}
        
        return {...prevOptions, brand: name}
      });
    }
  }

  const handleSubmit = () => {
    // console.log(chosenOptions);
    
  }

  return (
    <div>
      <NavBar />
      <div className="mainContainerGrid">
          <div className="left">
              <div>
                Categories
                <div className="radioBoxContainer">
                  {categories.map((category) => {
                    return (
                    <label key={category.name}>
                      {category.name !== "NoneCategory" ? category.name : "None"}
                      <input type="radio" name={category.name} checked={category.isCheck} onChange={(e) => handleRadioBoxChange(e, "category")} />
                    </label>
                    );
                  })}
                </div>
              </div>
              <div>
                Genres
                <div className="radioBoxContainer">
                  {genres.map((genre) => {
                      return (
                      <label key={genre.name}>
                        {genre.name !== "NoneGenre" ? genre.name: "None"}
                        <input type="radio" name={genre.name} checked={genre.isCheck} onChange={(e) => handleRadioBoxChange(e, "genre")} />
                      </label>
                      );
                    })}
                </div>
              </div>
              <div>
                Brands
                <div className="radioBoxContainer">
                  {brands.map((brand) => {
                        return (
                        <label key={brand.name}>
                          {brand.name !== "NoneBrand" ? brand.name : "None"}
                          <input type="radio" name={brand.name} checked={brand.isCheck} onChange={(e) => handleRadioBoxChange(e, "brand")} />
                        </label>
                        );
                      })}
                </div>
              </div>
              <button onClick={handleSubmit}>Apply Changes</button>
          </div>
          <div className="right">
              <SearchBar />
              Catalogues/Items
          </div>
      </div>
    </div>
  )
}

export default HomePage
