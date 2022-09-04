import React, { useEffect, useState } from "react";
// import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../components/Layout";
import {
  Anchor,
  MaterialButton,
  MaterialInput,
} from "../../components/MaterialUI";
import PriceDetails from "../../components/PriceDetails";
import Card from "../../components/UI/Card";
import { getAddress } from "../../features/addressSlice";
import { getCartItems } from "../../features/cartSlice";
import { addOrder } from "../../features/orderSlice";
import { CartPage } from "../CartPage";
import AddressForm from "./AddressForm";
import "./style.css";

/**
 * @author
 * @function Checkout
 **/

const CheckoutStep = (props) => {
  return (
    <div className="checkoutStep">
      <div
        onClick={props.onClick}
        className={`checkoutHeader ${props.active && "active"}`}
      >
        <div>
          <span className="stepNumber">{props.stepNumber}</span>
          <span className="stepTitle">{props.title}</span>
        </div>
      </div>
      {props.body && props.body}
    </div>
  );
};

export const CheckoutPage = (props) => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const order = useSelector((state)=>state.order);
  const userAddress = useSelector((state) => state.address);
  const auth = useSelector((state) => state.auth);
  const [newAddress, setNewAddress] = useState(false);
  const [address, setAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [orderSummary, setOrderSummaery] = useState(false);
  const [orderConfirm, setOrderConfirm] = useState(false);
  const [summaryOrderConfirmation, setSummaryOrderConfirmation] =
    useState(false);
  const [paymentOption, setPaymentOption] = useState(false);
  const [confirmDeliveryAddressFlag, setConfirmDeliveryAddressFlag] =
    useState(false);
  // console.log(userAddress);
  // console.log(auth);
  // console.log(userAddress);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.isLoggedIn && dispatch(getAddress());
    auth.isLoggedIn && dispatch(getCartItems());
  }, [auth.isLoggedIn]);

  useEffect(() => {
    // console.log(userAddress)
    const updatedAddress = userAddress.address[0]
      ? userAddress.address[0].address.map((adr) => ({
          ...adr,
          selected: false,
          edit: false,
        }))
      : [];
    // console.log(address);
    setAddress(updatedAddress);
  }, [userAddress.address]);

  // console.log(address);

  const selectAddressFunction = (addr) => {
    // console.log(addr);
    const updatedAddress = address.map((adr) =>
      adr._id === addr._id
        ? { ...adr, selected: true }
        : { ...adr, selected: false }
    );
    // console.log(updatedAddress);
    setAddress(updatedAddress);
  };

  const enableAddressEditForm = (addr) => {
    const updatedAddress = address.map((adr) =>
      adr._id === addr._id ? { ...adr, edit: true } : { ...adr, edit: false }
    );
    console.log(updatedAddress);
    setAddress(updatedAddress);
  };

  const onClickConfirmDeliveryAddress = (adr) => {
    // console.log(adr);
    setSelectedAddress(adr);
    setConfirmDeliveryAddressFlag(true);
    setOrderSummaery(true);
  };

  const onAddressSubmit = (adr) => {
    console.log("In OnAddressSubmit");
    setSelectedAddress(adr);
    setConfirmDeliveryAddressFlag(true);
    setOrderSummaery(true);
  };
  // console.log(selectedAddress);

  const userOrderConfirmation = () => {
    setSummaryOrderConfirmation(true);
    setOrderSummaery(false);
    setPaymentOption(true);
  };
  const onOrderConfirm = () => {
    const totalAmount = Object.keys(cart.cartItems).reduce(function (
      totalPrice,
      key
    ) {
      const { price, qty } = cart.cartItems[key];
      return totalPrice + price * qty;
    },
    0);
    const items = Object.keys(cart.cartItems).map((key) => ({
      productId: key,
      payablePrice: cart.cartItems[key].price,
      purchasedQty: cart.cartItems[key].qty,
    }));
    const payload = {
      addressId: selectedAddress._id,
      totalAmount,
      items,
      paymentStatus: "pending",
      paymentType: "cod",
    };
    console.log(payload);
    dispatch(addOrder(payload));
    setOrderConfirm(true);
  };
  // if (orderConfirm) {
  //   return (
  //     <Layout>
  //       <Card>
  //         <div>Thank You!</div>
  //       </Card>
  //     </Layout>
  //   );
  // }
  useEffect(()=>{
    if (orderConfirm && order.placedOrderId) {
      navigate(`/order-details/${order.placedOrderId}`);
    }
  },[order.placedOrderId])
  return (
    <Layout>
      <div className="cartContainer" style={{ alignItems: "flex-start" }}>
        <div className="checkoutContainer">
          <CheckoutStep
            stepNumber="1"
            title="Login"
            active={!auth.isLoggedIn}
            body={
              auth.isLoggedIn ? (
                <div className="loggedInId">
                  <span
                    style={{ fontWeight: "500" }}
                  >{`${auth.user.firstName} ${auth.user.lastName}`}</span>
                  <span style={{ margin: "0 5px" }}>{auth.user.email}</span>
                </div>
              ) : (
                <div>
                  <MaterialInput label="Email" />
                </div>
              )
            }
          />
          {/* <CheckoutPage
             stepNumber="2"
             title="Delivery Address"
             active={!confirmDeliveryAddressFlag && auth.isLoggedIn}
             body={}

          /> */}
          <CheckoutStep
            stepNumber="2"
            title="Delivery Address"
            active={!confirmDeliveryAddressFlag && auth.isLoggedIn}
            body={
              <>
                {confirmDeliveryAddressFlag ? (
                  <div className="stepCompleted">
                    {selectedAddress.name}, {selectedAddress.address} -{" "}
                    {selectedAddress.pinCode}
                  </div>
                ) : (
                  address.map((adr, index) => (
                    <div key={index} className="flexRow addressContainer">
                      <div>
                        <input
                          name="address"
                          type="radio"
                          onClick={() => selectAddressFunction(adr)}
                        />
                      </div>
                      <div className="flexRow sb addressinfo">
                        {!adr.edit ? (
                          <div style={{ width: "100%" }}>
                            <div className="addressDetail">
                              <div>
                                <span className="addressName">{adr.name}</span>
                                <span className="addressType">
                                  {adr.addressType}
                                </span>
                                <span className="addressMobileNumber">
                                  {adr.mobileNumber}
                                </span>
                              </div>
                              {adr.selected && (
                                <Anchor
                                  onClick={() => enableAddressEditForm(adr)}
                                  name="Edit"
                                  style={{
                                    fontWeight: "500",
                                    color: "#2874f0",
                                  }}
                                />
                              )}
                            </div>

                            <div className="fullAddress">
                              {adr.address} <br />{" "}
                              {`${adr.cityDistrictTown},${adr.state} - ${adr.pinCode}`}
                            </div>
                            {adr.selected && (
                              <MaterialButton
                                title="Deliver Here"
                                onClick={() =>
                                  onClickConfirmDeliveryAddress(adr)
                                }
                                style={{
                                  width: "250px",
                                }}
                              />
                            )}
                          </div>
                        ) : (
                          <AddressForm
                            withoutLayout={true}
                            onSubmitForm={onAddressSubmit}
                            onCancel={() => {}}
                            adr={adr}
                          />
                        )}
                      </div>
                    </div>
                  ))
                )}
              </>
            }
          />

          {/* Address Form */}
          {/* confirmDeliveryAddressFlag is used so as to make the Add new address disappear when an 
              address is selected  */}
          {!confirmDeliveryAddressFlag && auth.isLoggedIn ? (
            newAddress ? (
              <AddressForm onSubmitForm={onAddressSubmit} onCancel={() => {}} />
            ) : (
              <CheckoutStep
                stepNumber="+"
                title="Add new address"
                active={false}
                onClick={() => setNewAddress(true)}
              />
            )
          ) : null}

          <CheckoutStep
            stepNumber="3"
            title="Order Summary"
            active={orderSummary}
            body={
              orderSummary ? (
                <CartPage onlyCartItems={true} />
              ) : summaryOrderConfirmation ? (
                <div className="stepCompleted">
                  {Object.keys(cart.cartItems).length} items
                </div>
              ) : null
            }
          />

          {orderSummary && (
            <Card
              style={{
                margin: "10px 0",
                border: "0px solid #ffffff",
                borderRadius: "0px",
              }}
            >
              <div className="flexRow sb" style={{ padding: "12px" }}>
                <p style={{ marginTop: "13px", fontSize: "15px" }}>
                  Order confirmation email will be sent to{" "}
                  <strong>{auth.user.email}</strong>
                </p>
                <MaterialButton
                  title="CONTINUE"
                  style={{ width: "200px" }}
                  onClick={userOrderConfirmation}
                />
              </div>
            </Card>
          )}

          <CheckoutStep
            stepNumber="4"
            title="Payment Options"
            active={paymentOption}
            body={
              paymentOption && (
                <div>
                  <div
                    className="flexRow"
                    style={{ alignItems: "center", padding: "20px" }}
                  >
                    <input type="radio" name="paymentOption" value="cod" />
                    <div>Cash on Delivery</div>
                  </div>
                  <MaterialButton
                    title="CONFIRM ORDER"
                    style={{ width: "200px", margin: "0 0 20px 20px" }}
                    onClick={onOrderConfirm}
                  />
                </div>
              )
            }
          />
        </div>
        <PriceDetails
          totalItem={Object.keys(cart.cartItems).reduce(function (qty, key) {
            return qty + cart.cartItems[key].qty;
          }, 0)}
          totalPrice={Object.keys(cart.cartItems).reduce(function (
            totalPrice,
            key
          ) {
            const { price, qty } = cart.cartItems[key];
            return totalPrice + price * qty;
          },
          0)}
        />
      </div>
    </Layout>
  );
};
