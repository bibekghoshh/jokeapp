import { useEffect, useState } from "react";
import "./App.css";
import Categories from "./components/Categories/Categories";
import Loader from "./components/Loader/Loader.jsx";

function App() {
  const [categories, setCategories] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    let fetchCategories = async () => {
      setloading(true);
      const fetchData = await fetch(
        "https://api.chucknorris.io/jokes/categories"
      );
      const jsonData = await fetchData.json();
      setloading(false);
      setCategories(jsonData);
    };
    fetchCategories();
  },[]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <h1 className="heading bounce">Chuck Norries</h1>
          <Categories categories={categories} />
        </div>
      )}
    </>
  );
}

export default App;
