import { useState, useEffect } from "react";
import axios from "axios";
import Recipe from "./Recipe.jsx";
import logo from "./assets/logo.png";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import "./index.css";

function App() {
  const SERVER = `${import.meta.env.VITE_API_URL}`;

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [noResult, setNoResult] = useState("");

  function handleSearchValues(e) {
    setSearch(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (search) {
      setNoResult("");
      setQuery(search);
      setSearch("");
    } else {
      setNoResult("Please Enter Ingredients");
    }
  }

  async function getRecipes() {
    try {
      const response = await axios.get(`${SERVER}/${query}`);
      if (response.data.length == 0) {
        setNoResult("No results. Please try again or enter less ingredients.");
      } else {
        setNoResult("");
      }
      setRecipes(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (query) {
      getRecipes();
    }
  }, [query]);

  return (
    <>
      <div className="logo">
        <img src={logo} alt="" />
      </div>

      <h3>List Your Ingredients</h3>
      <form className="search" onSubmit={handleSubmit}>
        <input
          type="text"
          value={search}
          onChange={handleSearchValues}
          placeholder="eg. chicken broccoli"
        />
        <button type="submit">Search</button>
      </form>

      <div className="recipe-cards">
        <h4 className="no-result">{noResult}</h4>

        <ResponsiveMasonry
          columnsCountBreakPoints={{
            700: 2,
            1050: 3,
            1400: 4,
            1750: 5,
            2100: 6,
            2450: 7,
            2800: 8,
          }}
        >
          <Masonry gutter="2rem">
            {recipes.map((recipe, index) => (
              <Recipe
                key={index}
                title={recipe.recipe.label}
                image={recipe.recipe.image}
                ingredients={recipe.recipe.ingredients}
                url={recipe.recipe.url}
              />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </>
  );
}

export default App;
