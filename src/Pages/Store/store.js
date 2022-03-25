import "./store.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Store = () => {
  let { CategoryId } = useParams();
  const [isProducts, setProducts] = useState([]);
  const [isCategories, setCategories] = useState([]);
  const [isImages, setImages] = useState([]);

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
  //Get products
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
  //Get products
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

  useEffect(() => {
    getProducts();
    getCategories();
    getImages();
  }, [CategoryId]);

  return (
    <main>
      <aside className={"catalog"}>
        <h2>Kategorier</h2>
        <nav className="catalog-nav">
          <div>
            <h3>
              <a href="/handla">Visa alla</a>
            </h3>
          </div>
          {isCategories.map((item) => (
            <div>
              <h4>{item.category}</h4>
              {item.catalogSubCategories.map((s) => (
                <p key={s.id}>
                  <a href={"/handla/" + s.id}>{s.category}</a>
                </p>
              ))}
            </div>
          ))}
        </nav>
      </aside>
      <section className={"main-section"}>
        <h2>Produkter</h2>
        <p>{isProducts.name}</p>
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
          /* .sort((a, b) => b.price - a.price) */
          .map((item) => (
            <a className="linkStoreItem" href={"/Product" + item.id}>
              <article className="StoreItem" key={item.id}>
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
            </a>
          ))}
      </section>
    </main>
  );
};

export default Store;
