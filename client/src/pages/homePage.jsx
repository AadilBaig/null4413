import React, {useState, useEffect} from 'react'
import NavBar from "../components/navBar"
import { useCookie } from '../global/CookieContext';
import './pages.css'

const HomePage = () => {
  // Get cookie methods from our context api class "CookieContext"
  const { cookieData, saveCookieData, clearCookieData } = useCookie();
  const [categories, setCategories] = useState([{name: "Category 1", isCheck: false}, {name: "Category 2", isCheck: false},{name: "Category 3", isCheck: false},{name: "Category 4", isCheck: false},{name: "Category 5", isCheck: false}]);
  const [genres, setGenres] = useState([{name: "Genre 1", isCheck: false}, {name: "Genre 2", isCheck: false}, {name: "Genre 3", isCheck: false}, {name: "Genre 4", isCheck: false}, {name: "Genre 5", isCheck: false}]);
  const [brands, setBrands] = useState([{name: "Brand 1", isCheck: false}, {name: "Brand 2", isCheck: false}, {name: "Brand 3", isCheck: false}, {name: "Brand 4", isCheck: false}, {name: "Brand 5", isCheck: false}]);

  // set user access token to local storage on change -> used for session management
  // useEffect(() => {
  //   if (accessToken) {
  //     localStorage.setItem('accessToken', accessToken);
  //   }
  // }, [accessToken]);

  // retrieves user access token if it exists -> used for session management

  // Handle checkbox changes for categories, genres, and brands
  const handleCheckBoxChange = (e, type) => {

    const { name, checked } = e.target;

    if (type === "category"){
      // update categories list by checking the right category that has been selected
      setCategories((prevCategories) => {
          return prevCategories.map((category) => {
            if (category.name === name) {
              return { ...category, isCheck: checked }; // return updated category
            }
            return category; // return unmodified category 
          }
        );
      });
    }
    else if (type === "genre"){
      // update genres list by checking the right genre that has been selected
      setGenres((prevGenres) => {
        return prevGenres.map((genre) => {
          if (genre.name === name) {
            return { ...genre, isCheck: checked }; // return updated genre
          }
          return genre; // return unmodified genre 
        }
      );
    });
    }
    else if (type === "brand"){
      // update brands list by checking the right brand that has been selected
      setBrands((prevBrands) => {
        return prevBrands.map((brand) => {
          if (brand.name === name) {
            return { ...brand, isCheck: checked }; // return updated brand
          }
          return brand; // return unmodified brand 
        }
      );
    });
    }
  }


  useEffect(() => {
      console.log(JSON.stringify(cookieData));
  }, []);

  return (
    <div>
      <NavBar />
      <div className="mainContainerGrid">
          <div className="left">
              <div>
                Categories
                <div className="checkBoxContainer">
                  {categories.map((category) => {
                    return (
                    <label key={category.name}>
                      {category.name}
                      <input type="checkbox" name={category.name} checked={category.isCheck} onChange={(e) => handleCheckBoxChange(e, "category")} />
                    </label>
                    );
                  })}
                </div>
              </div>
              <div>
                Genres
                <div className="checkBoxContainer">
                  {genres.map((genre) => {
                      return (
                      <label key={genre.name}>
                        {genre.name}
                        <input type="checkbox" name={genre.name} checked={genre.isCheck} onChange={(e) => handleCheckBoxChange(e, "genre")} />
                      </label>
                      );
                    })}
                </div>
              </div>
              <div>
                Brands
                <div className="checkBoxContainer">
                  {brands.map((brand) => {
                        return (
                        <label key={brand.name}>
                          {brand.name}
                          <input type="checkbox" name={brand.name} checked={brand.isCheck} onChange={(e) => handleCheckBoxChange(e, "brand")} />
                        </label>
                        );
                      })}
                </div>
              </div>
              <button>Apply Changes</button>
          </div>
          <div className="right">
              Catalogues/Items
          </div>
      </div>
    </div>
  )
}

export default HomePage
