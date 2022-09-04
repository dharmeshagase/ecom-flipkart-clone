import React from "react";
import { IoIosCart } from "react-icons/io";

/**
 * @author
 * @function Cart
 **/

const Cart = (props) => {
  return (
    <div style={{ fontSize: "20px", position: "relative" }}>
      {props.count > 0 && (
        <span
          style={{
            position: "absolute",
            background: "red",
            width: "15px",
            height: "15px",
            borderRadius: "5px",
            fontSize: "10px",
            border: "1px solid red",
            textAlign: "center",
            alignSelf: "center",
            top: "-5px",
            right: "0px",
          }}
        >
          {props.count}
        </span>
      )}
      <IoIosCart />
    </div>
  );
};

export default Cart;
