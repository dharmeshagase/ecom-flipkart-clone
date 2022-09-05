import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { generatePublicImageUrl } from "../../../apiConfig";
import { removeCartItem } from "../../../features/cartSlice";
import "./style.css";

/**
 * @author
 * @function CartItem
 **/

export const CartItem = (props) => {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(props.cartItem.qty);
  const { name, _id, img, price } = props.cartItem;

  const onQuantityInc = () => {
    setQty((qty) => qty + 1);
    props.onQuantityIncrement(_id, qty + 1);
  };

  const onQuantityDec = () => {
    if (qty <= 1) return;
    setQty((qty) => qty - 1);
    props.onQuantityDecrement(_id, qty - 1);
  };

  const onRemoveButtonClicked = () => {
    // console.log(props.cartItem);
    dispatch(removeCartItem({ productId: props.cartItem._id }));
  };
  return (
    <div className="cartItemContainer">
      <div className="flexRow">
        <div className="cartProImgContainer">
          <img src={img} alt="" />
        </div>
        <div className="cartItemDetails">
          <div>
            <p>{name}</p>
            <p>Rs. {price}</p>
          </div>
          <div>Delivery in 3-5 days</div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          margin: "5px 0",
        }}
      >
        <div className="quantityControl">
          <button onClick={onQuantityDec}>-</button>
          <input value={qty} readOnly />
          <button onClick={onQuantityInc}>+</button>
        </div>
        <button className="cartActionBtn">Save for later</button>
        <button className="cartActionBtn" onClick={onRemoveButtonClicked}>
          Remove
        </button>
      </div>
    </div>
  );
};
