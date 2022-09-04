import React from "react";
import "./style.css";
/**
 * @author
 * @function Card
 **/

const Card = (props) => {
  const { headerLeft, headerRight, ...rest } = props;
  return (
    <div className="card" {...rest}>
      {(headerLeft || headerRight) && (
        <div className="cardHeader">
          {headerLeft && (
            <div
              style={{
                alignSelf: "center",
                fontSize: "20px",
                fontWeight: "500",
              }}
            >
              {headerLeft}
            </div>
          )}
          {headerRight && headerRight}
          {/* <div>{params.slug} mobile under {priceRange[key]}</div> */}
          {/* <Button>View</Button> */}
        </div>
      )}
      {props.children}
    </div>
  );
};

export default Card;
