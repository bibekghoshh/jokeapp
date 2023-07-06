import React, { useState, useEffect } from "react";
import "./Categories.css";
import Loader from "../Loader/Loader";

function Categories({ categories }) {
  const [selected, setSelected] = useState("");
  const [joke, setJoke] = useState("");
  const [loading, setloading] = useState(false);
  const [close, setClose] = useState(false);

  useEffect(() => {
    if (selected) {
      fetchjokes();
    }
  }, [selected]);

  const fetchjokes = async () => {
    setloading(true);
    const fetchdata = await fetch(
      `https://api.chucknorris.io/jokes/random?category=${selected}`
    );
    const jsondata = await fetchdata.json();
    setloading(false);
    const jokes = jsondata.value;
    setJoke(jokes);
  };

  return (
    <>
      <div className="categories-items">
        {categories.map((categories) => (
          <div
            className="categorieCard"
            onClick={() => {
              setSelected(categories);
              setClose(false);
            }}
            key={categories}
          >
            <h2>{categories}</h2>
            <p>unlimited jokes on {categories}</p>
          </div>
        ))}
      </div>
      {selected && (
        <div className={`${!close ? "showing-jokes" : "hiding-jokes"} `}>
        
          <button
            className="close-btn"
            onClick={() => {
              setClose(true);
            }}
          >
            close
          </button>
          <h1 className="joke-title">{selected}</h1>
          <div className="joke-box">
            {loading ? <Loader/> : <p>" {joke} "</p> }
            <button
              className="next-btn"
              onClick={() => {
                fetchjokes();
              }}
            >
              Next joke
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Categories;
