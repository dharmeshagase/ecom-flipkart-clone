import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useParams, useSearchParams } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { ProductPage } from "./ProductPage";
import { ProductStore } from "./ProductStore";
import { ProductsViewAll } from "./ProductsViewAll";
// import ProductStore from './ProductStore';
import "./style.css";

/**
 * @author
 * @function ProductListPage
 **/

export const ProductListPage = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // console.log("jksdhfkjsdhf");

  const renderProduct = () => {
    const queryParams = {};
    let content = null;
    // console.log("into render Product")
    queryParams.type = searchParams.get("type");
    queryParams.cid = searchParams.get("cid");
    // console.log(queryParams);
    switch (queryParams.type) {
      case "store":
        content = <ProductStore {...props} />;
        break;
      case "page":
        content = <ProductPage queryParams={queryParams} {...props} />;
        break;
      default:
        content = <ProductsViewAll {...props} />;
        break;
    }
    return content;
  };

  return <Layout>{renderProduct()}</Layout>;
};
