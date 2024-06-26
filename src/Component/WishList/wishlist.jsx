import React, { useEffect, useReducer, useState } from "react";
import "./wishlist.css";

import { useDispatch, useSelector } from "react-redux";
import wishlistEmpty from "../../Assets/wishlistEmpty.svg";
import crossBtnIcon from "../../Assets/crossBtnIcon.svg";
import { NavLink } from "react-router-dom";
import { handelProduct } from "../../redux/slice/AllProduct";

function Wishlist() {
  const like = useSelector((state) => state.wishlistData.like);
  let product = useSelector((state) => state.productData.product);
  let [likedData, setLikedData] = useState([]);
  let [checkAnyLiked, setCheckAnyLiked] = useState([]);
  console.log(product);
  let [type33, setType33] = useState("all");

  let dispatch = useDispatch();

  let moveToBag = (e, elem) => {
    e.preventDefault();
    console.log(product);
    let updatedProductData = product.map((item) =>
      item.id === elem.id
        ? {
            ...item,
            itemAdded: true,
            size: item.type === "shoe" ? "Uk 5" : "S",
            liked: true,
          }
        : item
    );
    console.log(updatedProductData);
    dispatch(handelProduct({ typeItem: "moveToBag", updatedProductData }));
  };
  const removeWishListFun = (e, element) => {
    e.preventDefault();

    dispatch(handelProduct(element));
    // dispatch(handelWishlist(element));
  };

  useEffect(() => {
    let ans = product.find((e) => {
      return e.liked === false;
    });
    setCheckAnyLiked(ans);
    if (type33 === "t-shirt") {
      let filterData = product.filter((e) => {
        return e.liked === false;
      });

      let filteredData = filterData.filter((e) => {
        return e.type === "t-shirt";
      });
      setLikedData(filteredData);
    } else if (type33 === "shirt") {
      let filterData = product.filter((e) => {
        return e.liked === false;
      });

      let filteredData = filterData.filter((e) => {
        return e.type === "shirt";
      });
      setLikedData(filteredData);
    } else if (type33 === "shoe") {
      let filterData = product.filter((e) => {
        return e.liked === false;
      });

      let filteredData = filterData.filter((e) => {
        return e.type === "shoe";
      });
      setLikedData(filteredData);
    } else {
      let filterData = product.filter((e) => {
        return e.liked === false;
      });
      setLikedData(filterData);
    }
  }, [product, type33]);
  console.log(checkAnyLiked);

  return (
    <>
      {checkAnyLiked ? (
        <section className="wishlist">
          <div className="wishlist-box">
            <div className="wishlist-type">
              <span
                className="wishlist-type-box"
                onClick={() => setType33("all")}
                style={{
                  background: type33 === "all" ? "black" : "",
                  border: type33 === "all" ? "2px solid rgb(3, 147, 115)" : "",
                  color: type33 === "all" ? "white" : "",
                }}
              >
                All
              </span>
              <span
                className="wishlist-type-box"
                onClick={() => setType33("t-shirt")}
                style={{
                  background: type33 === "t-shirt" ? "black" : "",
                  border:
                    type33 === "t-shirt" ? "2px solid rgb(3, 147, 115)" : "",
                  color: type33 === "t-shirt" ? "white" : "",
                }}
              >
                T-Shirt
              </span>
              <span
                className="wishlist-type-box"
                onClick={() => setType33("shirt")}
                style={{
                  background: type33 === "shirt" ? "black" : "",
                  border:
                    type33 === "shirt" ? "2px solid rgb(3, 147, 115)" : "",
                  color: type33 === "shirt" ? "white" : "",
                }}
              >
                Shirt
              </span>
              <span
                className="wishlist-type-box"
                onClick={() => setType33("shoe")}
                style={{
                  background: type33 === "shoe" ? "black" : "",
                  border: type33 === "shoe" ? "2px solid rgb(3, 147, 115)" : "",
                  color: type33 === "shoe" ? "white" : "",
                }}
              >
                Shoes
              </span>
            </div>
            <div className="wishlist-details-box">
              <>
                {likedData.length > 0 && likedData ? (
                  likedData.map((element) => (
                    <NavLink
                      className="card2achor"
                      style={{ textDecoration: "none" }}
                      to={`/details/${element.id}`}
                      key={element.id}
                    >
                      <div className="wishlist-card">
                        <div className="card2">
                          {element.image &&
                            element.image.length > 0 &&
                            element.image[0].photo1 && (
                              <div className="card-img2">
                                <img
                                  src={element.image[0].photo1}
                                  alt="Product"
                                  className="hoverImg2"
                                />
                              </div>
                            )}

                          <div className="card-details2">
                            <div className="item-name2">
                              <p>{element.name.slice(0, 20)}...</p>
                            </div>

                            <div className="wishlist-price">
                              <p className="wishlist-realPrice">
                                ₹{element.new_price}
                              </p>
                              <p className="wishlist-oldPrice">
                                ₹{element.old_price}
                              </p>
                              <p className="wishlist-offPrice">{element.off}</p>
                            </div>
                          </div>

                          <div className="wishlist-btn">
                            <button
                              className="w-btn"
                              onClick={(e) => moveToBag(e, element)}
                            >
                              <img
                                style={{ width: "15px", height: "15px" }}
                                src="https://images.bewakoof.com/web/addtocart.svg"
                                alt="Add to Bag"
                              />
                              ADD TO BAG
                            </button>
                          </div>
                        </div>
                        <div
                          className="crossImg-box"
                          onClick={(e) => removeWishListFun(e, element)}
                        >
                          <img src={crossBtnIcon} alt="cross" />
                        </div>
                      </div>
                    </NavLink>
                  ))
                ) : (
                  <h1 className="No-items8">
                    {" "}
                    {type33} Wishlist: Currently Empty. Explore & Add!
                  </h1>
                )}
              </>
            </div>
          </div>
        </section>
      ) : (
        <div className="wishlist-Empty">
          <div className="wishlist-EmptyBox">
            <img
              style={{ width: "140px", height: "140px" }}
              src={wishlistEmpty}
              alt="empty"
            />
            <h3>Hey! Your wishlist is empty.</h3>
            <p>Save your favourites here and make them yours soon!</p>
            <NavLink className="wishlist-EmptyBox-btn" to="/product/men">
              <button>SHOP NOW</button>
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
}

export default Wishlist;
