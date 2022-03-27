import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import CartContext from "../../CartContext";

const Product = () => {
  require("./product.css");
  const { addItem } = useContext(CartContext);

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
  const [isSelectSize, setSelectSize] = useState();
  const [isSelectColor, setSelectColor] = useState();
  const [isSelectType, setSelectType] = useState();

  function setSC(e) {
    for (let i = 0; i < isTypes.length; i++) {
      if (isTypes[i].id.toString() === e.toString()) {
        setSelectType(isTypes[i].id);
        let color = isTypes[i].productColorId;
        let size = isTypes[i].productSizeId;
        for (let o = 0; o < isColors.length; o++) {
          if (isColors[o].id === color) {
            setSelectColor(isColors[o].color);
          }
        }
        for (let o = 0; o < isSizes.length; o++) {
          if (isSizes[o].id === size) {
            setSelectSize(isSizes[o].size);
          }
        }
      }
    }
  }

  return (
    <main>
      <div className={"flex-row"}>
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
                  return (
                    <img
                      key={img.id}
                      onMouseOver={() => setScrollImage(i * 500)}
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

            {isProduct.discount === 0 ? (
              <p>PRIS: {isProduct.price}sek</p>
            ) : (
              <p>
                PRIS: <span>{((100 - isProduct.discount) / 100) * isProduct.price}sek - </span>
                <span className="line-through">{isProduct.price}sek</span>
              </p>
            )}

            {isProduct.discount === 0 ? (
              <p>MOMS: {(isProduct.vat / 100) * isProduct.price}sek</p>
            ) : (
              <p>
                Moms:
                <span>
                  {((100 - isProduct.discount) / 100) * isProduct.price * (isProduct.vat / 100)}sek
                  -
                </span>
                <span className="line-through">{isProduct.price * (isProduct.vat / 100)}sek</span>
              </p>
            )}
            <p>Artikel. Nr.- {isProduct.productNumber}</p>
            <br></br>
            <p>Storlek och färg:</p>
            <select onChange={(e) => setSC(e.target.value)}>
              <option>Choose</option>
              {isTypes
                .filter((q) => {
                  if (ProductId === undefined) {
                    return q;
                  } else if (q.productId.toString() === ProductId) {
                    return q;
                  } else {
                    return "";
                  }
                })
                .sort((a, b) => a.productSizeId - b.productSizeId)
                .map((type) => {
                  return isColors.map((color) => {
                    if (type.productColorId === color.id) {
                      return isSizes.map((size) => {
                        if (type.productSizeId === size.id) {
                          return (
                            <option key={type.id} value={type.id}>
                              {size.size} / {color.color}
                            </option>
                          );
                        } else {
                          return "";
                        }
                      });
                    } else {
                      return "";
                    }
                  });
                })}
            </select>
            <br />
            <br/>
            <button className="button-design"
              onClick={() =>
                addItem(
                  isProduct.name,
                  isProduct.id,
                  isProduct.price,
                  1,
                  isSelectType,
                  isSelectSize,
                  isSelectColor,
                  isProduct.productNumber
                )
              }
            >
              Lägg i varukorg
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Product;
