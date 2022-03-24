import "./store.css";
import { useParams } from "react-router-dom";
import { useState } from "react";

const Store = () => {
  let { CategoryId } = useParams();
  const [isCategory, setCategory] = useState(CategoryId);
  

  return (
    <main>
      <aside className={"catalog"}>
        <h2>Kategorier</h2>
        <nav className="catalog-nav"></nav>
      </aside>
      <section className={"main-section"}>
        <h2>Produkter</h2>
        <p>{isCategory}</p>
      </section>
    </main>
  );
};

export default Store;
