import React, { useEffect, useState } from "react";
// import { Card } from "react-bootstrap";
import Card from "../../../components/UI/Card";
import { BiRupee } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { generatePublicImageUrl } from "../../../apiConfig";
import { getProductBySlug } from "../../../features/productSlice";
import "./style.css";
/**
 * @author
 * @function ProductsViewAll
 **/

export const ProductsViewAll = (props) => {
  const dispatch = useDispatch();
  const params = useParams();
  const product = useSelector((state) => state.product);
  useEffect(() => {
    if (product.status === "idle") dispatch(getProductBySlug(params.slug));
  }, []);

  console.log(product);
  return (
    <div className="productViewAll">
      <Card style={{ boxSizing: "border-box", padding: "10px" }}>
        <div className="productViewAllCard">
          {product.products.map((product, index) => (
            <div className="productViewAllContainer" key={index}>
              <Link
                className="productViewAllImgContainer"
                to={`/${product.slug}/${product._id}/p`}
              >
                <img
                  src={generatePublicImageUrl(product.productPictures[0].img)}
                  alt=""
                />
              </Link>
              <div>
                <div className="pvaProductName">{product.name}</div>
                <div className="pvaProductPrice">
                  <BiRupee />
                  {product.price}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
