import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
// import { generatePublicImageUrl } from "../../../apiConfig";
import { MaterialButton } from "../../../components/MaterialUI";
import Card from "../../../components/UI/Card";
import Price from "../../../components/UI/Price";
import Rating from "../../../components/UI/Rating";
import { getProductBySlug } from "../../../features/productSlice";
import "./style.css";

/**
 * @author
 * @function ProductStore
 **/

const ProductStore = (props) => {
  const dispatch = useDispatch();
  const params = useParams();
  const product = useSelector((state) => state.product);
  const priceRange = product.priceRange;
  // console.log(params);
  // console.log(product);
  useEffect(() => {
    // console.log("into productStore");
    // console.log(product.status);
    if (product.status === "idle") dispatch(getProductBySlug(params.slug));
  }, []);

  return (
    <>
      {Object.keys(product.productByPrice).map((key, index) => {
        return (
          <Card
            key={index}
            headerLeft={`${params.slug} mobile under ${priceRange[key]}`}
            headerRight={
              <MaterialButton
                title={"VIEW ALL"}
                style={{
                  width: "96px",
                }}
                bgColor="#2874f0"
                fontSize="10px"
              />
            }
            style={{
              width: "calc( 100% - 40px)",
              margin: "20px",
            }}
          >
            <div style={{ display: "flex" }}>
              {product.productByPrice[key].map((data, index) => (
                <Link
                  to={`/${data.slug}/${data._id}/p`}
                  style={{
                    display: "block",
                    textDecoration: "none",
                    color: "#000",
                  }}
                  key={index}
                  className="productContainer"
                >
                  <div className="productImgContainer">
                    <img
                      src={data.productPictures[0].img}
                      alt=""
                    />
                  </div>
                  <div className="productInfo">
                    <div style={{ margin: "5px 0" }}>{data.name}</div>
                    <div>
                      {/* <span>4.3</span>&nbsp;
                      <span>3353</span> */}
                      <Rating value="4.3" />
                      &nbsp;&nbsp;
                      <span
                        style={{
                          color: "#777",
                          fontWeight: "500",
                          fontSize: "12px",
                        }}
                      >
                        (3353)
                      </span>
                    </div>
                    <Price value={data.price} />
                    {/* <div className="productPrice">{data.price}</div> */}
                  </div>
                </Link>
              ))}
            </div>
          </Card>
        );
      })}
    </>
  );
};

export default ProductStore;
