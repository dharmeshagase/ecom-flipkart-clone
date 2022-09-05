import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { BiRupee } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { generatePublicImageUrl } from "../../apiConfig";
import { Layout } from "../../components/Layout";
import { Breed } from "../../components/MaterialUI";
import { getOrder } from "../../features/orderSlice";
import "./style.css";
/**
 * @author
 * @function OrderPage
 **/

export const OrderPage = (props) => {
  const dispatch = useDispatch();
  const { order: orders } = useSelector((state) => state.order);
  // console.log(orders);
  useEffect(() => {
    dispatch(getOrder());
  }, []);
  return (
    <Layout>
      <div className="orderPageDiv">
        <Breed
          breed={[
            {
              name: "Home",
              href: "/",
            },
            {
              name: "My Account",
              href: "/account",
            },
            {
              name: "My Orders",
              href: "/account/orders",
            },
          ]}
          breedIcon={<IoIosArrowForward />}
        />
        {orders.map((order) => {
          return order.items.map((item, index) => (
            <Card key={index} className="orderItemCard">
              <Link
                to={`/order-details/${order._id}`}
                className="orderItemContainer"
              >
                <div className="imageDiv">
                  <img
                    style={{ maxWidth: 80, maxHeight: 80 }}
                    src={item["productId"].productPictures[0]["img"]}
                  ></img>
                </div>
                <div className="orderTextContainer">
                  <div className="orderName">{item["productId"].name}</div>
                  <div className="orderPrice">
                    <BiRupee style={{ marginTop: "4px" }} />
                    {item.payablePrice}
                  </div>
                  <div>{order.paymentStatus}</div>
                </div>
              </Link>
            </Card>
          ));
        })}
      </div>
    </Layout>
  );
};
