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
  const [isButtonActive, setButtonActive] = useState(true);
  const [isProduct, setProduct] = useState([]);
  const [isColors, setColors] = useState([]);
  const [isSizes, setSizes] = useState([]);
  const [isImages, setImages] = useState([]);
  const [isTypes, setTypes] = useState([]);
  const [isProps, setProps] = useState([]);
  //Get productsTypes
  const getTypes = () => {
    let fetchPath = "https://localhost:7207/api/apiproducttype/";
    const fetchCall = async (url) => {
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
    fetchCall(fetchPath);
  }; //Get productsImages
  const getImages = () => {
    let fetchPath = "https://localhost:7207/api/apiproductImages/";
    const fetchCall = async (url) => {
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
    fetchCall(fetchPath);
  };
  //Get productscolors
  const getColors = () => {
    let fetchPath = "https://localhost:7207/api/apiproductcolor/";
    const fetchCall = async (url) => {
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
    fetchCall(fetchPath);
  };
  //Get productsizes
  const getSizes = () => {
    let fetchPath = "https://localhost:7207/api/apiproductsize/";
    const fetchCall = async (url) => {
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
    fetchCall(fetchPath);
  };
  //Get products
  const getProduct = () => {
    let fetchPath = "https://localhost:7207/api/apiproduct/" + param;
    const fetchCall = async (url) => {
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
    fetchCall(fetchPath);
  };
  //Get productproperties
  const getProps = () => {
    let fetchPath = "https://localhost:7207/api/APIProductProperties/";
    const fetchCall = async (url) => {
      try {
        const response = await fetch(url, {
          method: "GET",
        });
        const data = await response.json();

        setProps(data);
        console.log(data)
        console.log(isProps)
        if (!response.ok) {
          throw new Error(response.statusText);
        }
      } catch (e) {
        console.log(`Error: ${e}`);
      }
    };
    fetchCall(fetchPath);
  };

  useEffect(() => {
    getImages();
    getProduct();
    getColors();
    getSizes();
    getTypes();
    getProps();
  }, [ProductId]);

  const [isScrollImage, setScrollImage] = useState(0);
  const [isSelectSize, setSelectSize] = useState();
  const [isSelectColor, setSelectColor] = useState();
  const [isSelectType, setSelectType] = useState();
  const [isSelectAmount, setSelectAmount] = useState(0);
  const [isAvailable, setAvailable] = useState(0);

  //Controll på produktid med
  function setSC(e) {
    for (let i = 0; i < isTypes.length; i++) {
      if (isTypes[i].id.toString() === e.toString()) {
        setSelectType(isTypes[i].id);
        let color = isTypes[i].productColorId;
        let size = isTypes[i].productSizeId;
        setAvailable(isTypes[i].amount);
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

  const [isColorFilter, setColorFilter] = useState(0);
  let ColorFilterArray = [];

  const setBuyButton = (e) => {
    if (e <= 0) {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
  };

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
                } else if (q.productId.toString() === ProductId.toString()) {
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
            <br/>
            {isProps.map((x) => {
              if (x.productId === isProduct.id) {
                return (
                  <p>
                    <b style={{fontWeight:"700"}}>{x.title}</b>{" - "}
                    {x.text}
                  </p>
                )
              } else {
                return "";
              }
            })}
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
            <p>Artikel Nummer: {isProduct.productNumber}</p>
            <br></br>
            <p>Färg:</p>
            <div className="color-icon-list">
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

                .map((type) => {
                  return isColors
                    .filter((q) => {
                      if (ColorFilterArray.includes(q.id)) {
                        return "";
                      } else {
                        return q;
                      }
                    })
                    .map((color) => {
                      if (parseInt(type.productColorId) === parseInt(color.id)) {
                        ColorFilterArray.push(color.id);
                        return (
                          <div
                            key={color.id}
                            onClick={() => setColorFilter(color.id)}
                            style={{ backgroundColor: color.colorCode }}
                            className="color-icon"
                          ></div>
                        );
                      } else {
                        return "";
                      }
                    });
                })}
            </div>
            <p>Storlek:</p>
            <select
              onChange={(e) => {
                setSC(e.target.value);
                setBuyButton(e.target.value);
              }}
            >
              <option value="0">Välj storlek</option>
              {isTypes
                .filter((q) => {
                  if (q.productId.toString() === ProductId.toString()) {
                    return q;
                  } else {
                    return "";
                  }
                })
                .filter((q) => {
                  if (parseInt(q.productColorId) === parseInt(isColorFilter)) {
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
                              {size.size}
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
            <br />
            <p>Antal:</p>
            <input
              min={1}
              max={isAvailable}
              type="number"
              onChange={(e) => setSelectAmount(e.target.value)}
            />
            <br />
            <br />
            <button
              className={isButtonActive ? "hidden button-design " : "button-design "}
              onClick={() =>
                addItem(
                  isProduct.name,
                  isProduct.id,
                  isProduct.price,
                  isSelectAmount,
                  isSelectType,
                  isSelectSize,
                  isSelectColor,
                  isProduct.productNumber,
                  isProduct.discount,
                  isProduct.vat
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
