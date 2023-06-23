import axios from "axios";
import React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import useGetUserID from '../hooks/useGetUserID';
import {useCookies} from "react-cookie";


export default function CreateRecipe() {
  const userID=useGetUserID();
  // eslint-disable-next-line 
  const [cookies, _] = useCookies(["access_token"]);
   
  const [recipe,setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const {name, value}=event.target;
    setRecipe({...recipe,[name]: value})
  }

  const handleAddIngredient = () => {
    const ingredients = [...recipe.ingredients, ""];
    setRecipe({ ...recipe, ingredients });
    console.log(recipe);
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(recipe);
      await axios.post("http://localhost:3000/recipes", { ...recipe }, {
        headers: { authorization: cookies.access_token }
      } );
      alert("Recipe Added");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div className='create-recipe'>
      <h2>Create Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input 
        type="text" 
        name="name"
        id="name" 
        onChange={handleChange}
        />
        <label htmlFor="description">Description</label>
        <textarea 
        name="description" 
        id="description" 
        onChange={handleChange}>
        </textarea>


        <label htmlFor="ingredients">Ingredients</label>
        {recipe.ingredients.map((ingredient, index) => (
          <input
            key={index}
            type="text"
            name="ingredients"
            value={ingredient}
            onChange={(event) => handleIngredientChange(event, index)}
          />
        ))}
        <button type="button" onClick={handleAddIngredient}>
          Add Ingredient
        </button>


        <label htmlFor="instructions">Instructions</label>
        <textarea 
        name="instructions" 
        id="instructions" 
        onChange={handleChange}></textarea>


        <label htmlFor="imageUrl">Image URL</label>
        <input 
        type="text" 
        id="imageUrl" 
        name="imageUrl" 
        onChange={handleChange}
        />


        <label htmlFor="cookingTime">Cooking Time (minutes)</label>
        <input 
        type="number" 
        id="cookingTime" 
        name="cookingTime" 
        onChange={handleChange}
        />
        <button type="submit">Create Recipe</button>
      </form>
    </div>
  )
}
