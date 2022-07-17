import Head from "next/head";
import Link from "next/link";

import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/UserAuthContext";
import styles from "../../styles/Home.module.css";
import { getAllIngredients } from "../helper/firebaseHelper";

function recipes() {
  const auth = useAuth();
  const [jobject, setJObject] = useState(null);
  const [searchedRecipes, setSearchedRecipes] = useState([]);

  const myrecipes = async (event) => {
    event.preventDefault();
    let ingredients = await getAllIngredients(auth);

    let options = {
      method: "GET",
      url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients",
      params: {
        ingredients: ingredients,
        number: "5",
        ignorePantry: "true",
        ranking: "1",
      },
      headers: {
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
        "X-RapidAPI-Host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setJObject(response.data);
      })
      .catch(function (error) {
        console.error(error);
        return;
      });
  };

  return (
    <>
      <header>
        <a>MakeMyLunch</a>
        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/ingredient/addIng">Add Ingredients</a>
            </li>
            <li>
              <a href="/ingredient/deleteIng">Remove Ingredients</a>
            </li>
            <li>
              <a href="/viewingredients">View Ingredients</a>
            </li>
            <li>
              <a href="/getrecipes">Get Recipes</a>
            </li>
            <li>
              <a href="#">Sign Out</a>
            </li>
          </ul>
        </nav>
      </header>
      <main className={styles.main}>
        <h1 className={styles.title}>Search For Recipes!</h1>
        <br />
        <form onSubmit={(event) => myrecipes(event)}>
          <button type="submit">Search</button>
        </form>
        <Link href="/">&larr; Go back</Link>
      </main>
    </>
  );
}

export default recipes;
