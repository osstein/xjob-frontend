import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Product = () => {
  require("./product.css");
  let { ProductId } = useParams();
  let param = "";
  if (ProductId !== undefined) {
    param = ProductId;
  }
  const [isProduct, setProduct] = useState([]);
  const [isColors, setColors] = useState([]);
  const [isSizes, setSizes] = useState([]);
  const [isImages, setImages] = useState([]);
  const [isTypes, setTypes] = useState([]);
  //Get productsTypes
  const getTypes = () => {
    let fetchPath = "https://localhost:7207/api/apiproducttype/";
    const fetchTasting = async (url) => {
      try {
        const response = await fetch(url, {
          method: "GET",
        });
        const data = await response.json();
        console.log(data);
        setTypes(data);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
      } catch (e) {
        console.log(`Error: ${e}`);
      }
    };
    fetchTasting(fetchPath);
  }; //Get productsImages
  const getImages = () => {
    let fetchPath = "https://localhost:7207/api/apiproductImages/";
    const fetchTasting = async (url) => {
      try {
        const response = await fetch(url, {
          method: "GET",
        });
        const data = await response.json();
        console.log(data);
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
  //Get productscolors
  const getColors = () => {
    let fetchPath = "https://localhost:7207/api/apiproductcolor/";
    const fetchTasting = async (url) => {
      try {
        const response = await fetch(url, {
          method: "GET",
        });
        const data = await response.json();
        console.log(data);
        setColors(data);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
      } catch (e) {
        console.log(`Error: ${e}`);
      }
    };
    fetchTasting(fetchPath);
  };
  //Get productsizes
  const getSizes = () => {
    let fetchPath = "https://localhost:7207/api/apiproductsize/";
    const fetchTasting = async (url) => {
      try {
        const response = await fetch(url, {
          method: "GET",
        });
        const data = await response.json();
        console.log(data);
        setSizes(data);
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
  const getProduct = () => {
    let fetchPath = "https://localhost:7207/api/apiproduct/" + param;
    const fetchTasting = async (url) => {
      try {
        const response = await fetch(url, {
          method: "GET",
        });
        const data = await response.json();
        console.log(data);
        setProduct(data);
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
    getImages();
    getProduct();
    getColors();
    getSizes();
    getTypes();
  }, [ProductId]);

  const [isScrollImage, setScrollImage] = useState(0);

  return (
    <main>
      <div className={"product-images"}>
        <div className="main-image">
          <div
            className="main-image-holder"
            id="main-image-holder"
            style={{ transform: `translate( -${isScrollImage}px , 0px ` }}
          >
            {isImages.map((img) => {
              if (img.productId === isProduct.id) {
                return (
                  <img
                    key={img.id}
                    className="main-image-img"
                    src={"https://localhost:7207/" + img.imagePath}
                    alt={img.imageAlt}
                  />
                );
              } else {
                return "";
              }
            })}
          </div>
        </div>
        <div className="thumbnails">
          {isImages
            .filter((q) => {
              if (ProductId === undefined) {
                return q;
              } else if (q.productId.toString() === ProductId) {
                return q;
              } else {
                return "";
              }
            })
            .map((img, i) => {
              if (img.productId === isProduct.id) {
                console.log(i);

                return (
                  <img
                    key={img.id}
                    onMouseOver={() => setScrollImage(i * 500)}
                    onMouseOut={() => setScrollImage(0)}
                    src={"https://localhost:7207/" + img.imagePath}
                    alt={img.imageAlt}
                  />
                );
              } else {
                return "";
              }
            })}
        </div>
      </div>
      <div className={"product-about"}>
        <div className={"product-text"}>
          <h2>{isProduct.name}</h2>
          <p>{isProduct.description}</p>
          <br />
          <p>PRIS: {isProduct.price}sek </p>
          {(isProduct.discount / 100) * isProduct.price}
          <p>MOMS: {(isProduct.vat / 100) * isProduct.price}sek</p>
          <p>Art. Nr.- {isProduct.productNumber}</p>
        </div>
      </div>
    </main>
  );
};

export default Product;
