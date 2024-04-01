import React, { useEffect, useRef, useState } from "react";
import "./Men.css";
import { useSelector, useDispatch } from "react-redux";
import { handelWishlist } from "../../redux/slice/WishlistData.js";
import banner1 from "../../Assets/banner_mens.png";
import { NavLink } from "react-router-dom";
import { handelProduct } from "../../redux/slice/AllProduct.js";
function Men() {
  let product = useSelector((state) => state.productData.product);
  let [listVisible, setListVisible] = useState(false);
  let [allCategoryData, setAllCategoryData] = useState(product);
  console.log(product);
  let [checkSort, setCheckSort] = useState(null);
  const dispatch = useDispatch();

  let addWishlist = (e, element) => {
    e.preventDefault();

    dispatch(handelProduct(element));
  };
  let HightoLow = (e) => {
    setCheckSort(e.target.textContent);
  };
  let LowtoHigh = (e) => {
    setCheckSort(e.target.textContent);
  };
  let visible1 = () => {
    setListVisible((prevState) => !prevState);
    console.log("visible");
  };

  useEffect(() => {
    if (checkSort === "Price : High to Low") {
      const mutableCopy = [...product];
      mutableCopy.sort((x, y) => x.new_price - y.new_price);
      setAllCategoryData(mutableCopy);
    } else if (checkSort === "Price : Low to High") {
      const mutableCopy = [...product];
      mutableCopy.sort((x, y) => y.new_price - x.new_price);
      setAllCategoryData(mutableCopy);
    } else {
      const mutableCopy = [...product];
      mutableCopy.sort((x, y) => x.new_price - y.new_price);
      setAllCategoryData(mutableCopy);
    }
  }, [product, checkSort]);
  return (
    <>
      <div className="product-Main-box">
        <main>
          <div className="banner1">
            <img src={banner1} />
          </div>

          <div className="Short-box">
            <div className="ShortText-box">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  cursor: "pointer",
                }}
                onClick={visible1}
              >
                <span className="text1">SORT BY</span>
                <div className="ShortText-Innerbox">
                  <span>Popular</span>
                  <span class="down material-symbols-outlined">
                    expand_more
                  </span>
                </div>
              </div>
              <div
                className={`hidden-shorter ${
                  listVisible === true ? "listVisible" : null
                }`}
              >
                <ul className="hidden-shorterul">
                  <li
                    className="hidden-shorterli"
                    onClick={(e) => HightoLow(e)}
                  >
                    Price : High to Low
                  </li>
                  <li
                    className="hidden-shorterli"
                    onClick={(e) => LowtoHigh(e)}
                  >
                    Price : Low to High
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="card-mainbox">
            {allCategoryData.map((element) => (
              <NavLink
                to={`/details/${element.id}`}
                style={{ textDecoration: "none" }}
              >
                <div className="card">
                  <div className="card-img">
                    <img src={element.image[0].photo1} />
                  </div>

                  <div className="card-details">
                    <div className="item-name">
                      <p>{element.name}</p>
                      <span
                        className={
                          element.liked === true
                            ? "material-symbols-outlined"
                            : "material-symbols-outlined fill6"
                        }
                        style={{
                          color: element.liked === true ? "gray" : "#fdd835",
                        }}
                        onClick={(e) => addWishlist(e, element)}
                      >
                        favorite
                      </span>
                    </div>

                    <div className="price">
                      <span className="new-price">₹{element.new_price}</span>
                      <span className="off-price">₹{element.old_price}</span>
                    </div>
                    <div className="cloth_type">{element.cloth_type}</div>
                  </div>
                </div>
              </NavLink>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}

export default Men;
