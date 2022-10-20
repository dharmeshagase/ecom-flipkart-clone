import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { MaterialButton } from "../../components/MaterialUI";
import PriceDetails from "../../components/PriceDetails";
// import Card from '../../components/UI/Card'
import Card from "../../components/UI/Card";
import { addToCart, getCartItems } from "../../features/cartSlice";
import { CartItem } from "./CartItem";
import "./style.css";

/**
 * @author
 * @function CartPage
 **/

export const CartPage = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  // console.log(cart);
  const [cartItems, setCartItems] = useState(cart.cartItems);

  const onQuantityIncrement = (_id, qty) => {
    console.log(_id, qty);
    // const {name,price,img} = cartItems[_id]
    dispatch(addToCart({ ...cartItems[_id], qty }));
  };
  const onQuantityDecrement = (_id, qty) => {
    console.log(_id, qty);
    dispatch(addToCart({ ...cartItems[_id], qty, newQty: -1 }));
  };

  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems]);

  useEffect(() => {
    if (auth.isLoggedIn) {
      dispatch(getCartItems());
    }
  }, [auth.isLoggedIn]);
  // console.log(cartItems);

  if (props.onlyCartItems) {
    return (
      <>
        {Object.keys(cartItems).map((item, index) => (
          <CartItem
            key={index}
            cartItem={cartItems[item]}
            onQuantityIncrement={onQuantityIncrement}
            onQuantityDecrement={onQuantityDecrement}
          />
        ))}
      </>
    );
  }
  return (
    <Layout>
      <div className="cartContainer">
      {Object.keys(cartItems).length>0?<>
        <Card
          headerLeft="My Cart"
          headerRight="Deliver to"
          style={{ width: "calc(100%-400px)", overflow: "hidden" }}
        >
          {Object.keys(cartItems).map((item, index) => (
            <CartItem
              key={index}
              cartItem={cartItems[item]}
              onQuantityIncrement={onQuantityIncrement}
              onQuantityDecrement={onQuantityDecrement}
            />
          ))}
          <div
            style={{
              width: "100%",
              display: "flex",
              background: "#ffffff",
              justifyContent: "flex-end",
              boxShadow: "0 0 10px 10px #eee",
              padding: "10px 0",
              boxSizing: "border-box",
            }}
          >
            <div style={{ width: "250px" }}>
              <MaterialButton
                title="Place Order"
                onClick={() => navigate("/checkout")}
              />
            </div>
          </div>
        </Card>
   
        <PriceDetails
          totalItem={Object.keys(cartItems).reduce(function (qty, key) {
            return qty + cartItems[key].qty;
          }, 0)}
          totalPrice={Object.keys(cartItems).reduce(function (totalPrice, key) {
            const { price, qty } = cartItems[key];
            return totalPrice + price * qty;
          }, 0)}
        />
        </>
        :"Cart is empty"}
      </div>
    </Layout>
  );
};
