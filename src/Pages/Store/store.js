import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";

const Store = () => {
  // Get CSS
  require("./store.css");
  // Get category parameter
  let { CategoryId } = useParams();
  // States
  const [isProducts, setProducts] = useState([]);
  const [isCategories, setCategories] = useState([]);
  const [isImages, setImages] = useState([]);
  const [isProductSort, setProductSort] = useState("");
  const [isSearchString, setSearchString] = useState("");

  //Get products
  const getProducts = () => {
    let fetchPath = "https://localhost:7207/api/apiproduct";
    const fetchTasting = async (url) => {
      try {
        const response = await fetch(url, {
          method: "GET",
        });
        const data = await response.json();
        setProducts(data);

        if (!response.ok) {
          throw new Error(response.statusText);
        }
      } catch (e) {
        console.log(`Error: ${e}`);
      }
    };
    fetchTasting(fetchPath);
  };

  //Get categories
  const getCategories = () => {
    let fetchPath = "https://localhost:7207/api/APICatalogCategories";
    const fetchTasting = async (url) => {
      try {
        const response = await fetch(url, {
          method: "GET",
        });
        const data = await response.json();
        setCategories(data);

        if (!response.ok) {
          throw new Error(response.statusText);
        }
      } catch (e) {
        console.log(`Error: ${e}`);
      }
    };
    fetchTasting(fetchPath);
  };
  //Get images
  const getImages = () => {
    let fetchPath = "https://localhost:7207/api/APIProductImages";
    const fetchTasting = async (url) => {
      try {
        const response = await fetch(url, {
          method: "GET",
        });
        const data = await response.json();
        setImages(data);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
      } catch (e) {
        console.log(`Error: ${e}`);
      }
    };
    fetchTasting(fetchPath);
  };
  // States for filtering the catalog from categories whitout active products
  const [isLoadedTrue, setLoadedTrue] = useState(false);
  const [isActiveCategories, setActiveCategories] = useState([
    { id: 0, category: "", subCategory: [{ id: 0, category: "" }] },
  ]);

  // Filter from categories that do not have any products
  const activeCategories = () => {
    if (isLoadedTrue === false) {
      for (let i = 0; i < isCategories.length; i++) {
        let filteredSub = [];
        for (let o = 0; o < isCategories[i].catalogSubCategories.length; o++) {
          for (let p = 0; p < isProducts.length; p++) {
            if (
              isCategories[i].catalogSubCategories[o].id === isProducts[p].catalogSubCategoriesId
            ) {
              filteredSub.push({
                id: isCategories[i].catalogSubCategories[o].id,
                category: isCategories[i].catalogSubCategories[o].category,
              });
            }
          }
        }
        if (filteredSub.length > 0) {
          setActiveCategories((prevState) => [
            ...prevState,
            {
              id: isCategories[i].id,
              category: isCategories[i].category,
              subCategory: filteredSub,
            },
          ]);
          setLoadedTrue(true);
        }
      }
    }
  };
// Run when category ID changes
  useEffect(() => {
    getProducts();
    getCategories();
    getImages();
  }, [CategoryId]);

  // Run when categories change
  useEffect(() => {
    activeCategories();
  }, [isCategories]);

  return (
    <main>
      <aside className={"catalog"}>
        <h2>Kategorier</h2>
        <nav className="catalog-nav">
          <div>
            <h3>
              <Link to="/handla">Visa alla</Link>
            </h3>
          </div>
          {isActiveCategories.map((item) => (
            <div key={item.id}>
              <h4>{item.category}</h4>
              {item.subCategory.map((sub) => (
                <p key={sub.id}>
                  <NavLink to={"/handla/" + sub.id}>{sub.category}</NavLink>
                </p>
              ))}
            </div>
          ))}
        </nav>
      </aside>
      <section className="store-filter">
        <div className="sorting"><h3>Sortering:</h3>
        <span
          onClick={() => setProductSort("name_asc")}
          className={isProductSort === "name_asc" ? "active" : ""}
        >
          A-??
        </span>
        <span
          onClick={() => setProductSort("name_desc")}
          className={isProductSort === "name_desc" ? "active" : ""}
        >
          ??-A
        </span>
        <span
          onClick={() => setProductSort("price_asc")}
          className={isProductSort === "price_asc" ? "active" : ""}
        >
          $ Upp
        </span>
        <span
          onClick={() => setProductSort("price_desc")}
          className={isProductSort === "price_desc" ? "active" : ""}
        >
          $ Ner
        </span></div>
        <div>
          <h3>S??k:</h3>
          <input onChange={(e) => setSearchString(e.target.value) } />
        </div>
      </section>
      <section className={"main-section"}>
        <h2>Produkter</h2>
        {isProducts
          .filter((q) => {
            if (CategoryId === undefined) {
              return q;
            } else if (q.catalogSubCategoriesId.toString() === CategoryId) {
              return q;
            } else {
              return "";
            }
          })
          .filter((q) => {
            if (isSearchString === "") {
              return q;
            } else if (q.name.toLowerCase().includes(isSearchString.toLowerCase())) {
              return q;
            } else {
              return "";
            }
          })
          .sort((a, b) => {
            switch (isProductSort) {
              case "price_asc":
                if (a.price < b.price) {
                  return -1;
                }
                break;
              case "price_desc":
                if (a.price > b.price) {
                  return -1;
                }
                break;
              case "name_desc":
                if (a.name > b.name) {
                  return -1;
                }
                break;
              default:
                if (a.name < b.name) {
                  return -1;
                }
                break;
            }
            return "";
          })
          .map((item) => (
            <NavLink key={item.id} className="linkStoreItem" to={"/Produkt/" + item.id}>
              <article className="StoreItem">
                {isImages.map((img) => {
                  if (img.productId === item.id) {
                    return (
                      <img
                        key={img.id}
                        src={"https://localhost:7207/" + img.imagePath}
                        alt={img.imageAlt}
                      />
                    );
                  } else {
                    return "";
                  }
                })}

                <h4>{item.name}</h4>
                <p>{item.price}</p>
              </article>
            </NavLink>
          ))}
      </section>
    </main>
  );
};

export default Store;
