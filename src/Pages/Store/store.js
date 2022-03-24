import "./store.css";

const Store = () => {
  return (
    <main>
      <aside className={"catalog"}>
        <h2>Kategorier</h2>
        <nav className="catalog-nav"></nav>
      </aside>
      <section className={"main-section"} >
        <h2>Produkter</h2>
      </section>
    </main>
  );
};

export default Store;
