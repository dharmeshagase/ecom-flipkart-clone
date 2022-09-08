import React, { useEffect, useState } from "react";
import "./styles.css";
import flipkartLogo from "../../images/logo/flipkart.png";
import goldenStar from "../../images/logo/golden-star.png";
import { IoIosArrowDown, IoIosCart, IoIosSearch } from "react-icons/io";
import {
  Modal,
  MaterialInput,
  MaterialButton,
  DropdownMenu,
} from "../MaterialUI";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, signup as _signup } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import Cart from "../UI/Cart";

/**
 * @author
 * @function Header
 **/

const Header = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const [loginModal, setLoginModal] = useState(false);
  const [signup, setSignup] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // console.log(auth.isLoggedIn);

  useEffect(() => {
    if (auth.isLoggedIn) setLoginModal(false);
  }, [auth.isLoggedIn]);

  const onClickCart = () => {
    navigate("/cart");
  };

  const userSignup = () => {
    const user = { firstName, lastName, email, password };
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === ""
    ) {
      return;
    }
    // console.log(user);
    dispatch(_signup(user));
  };
  const handleUserLoginClick = () => {
    // console.log("Login Clicked");
    if (signup) {
      userSignup();
    } else {
      dispatch(login({ email, password })).then((response, error) => {
        console.log(response);
      });
    }
  };
  const handleUserLogoutClick = () => {
    console.log("logout clicked");
    dispatch(logout()).then((response, error) => {
      if (!error) {
        setEmail("");
        setPassword("");
      }
    });
  };

  const renderLoggedInMenu = () => {
    return (
      <DropdownMenu
        menu={
          <a className="fullname">
            {auth.user.firstName} {auth.user.lastName}
          </a>
        }
        menus={[
          { label: "My Profile", href: "", icon: null },
          { label: "Super Coin Zone", href: "", icon: null },
          { label: "Flipkart Plus Zone", href: "", icon: null },
          { label: "Orders", href: "/account/orders", icon: null },
          { label: "Wishlist", href: "", icon: null },
          { label: "My Chats", href: "", icon: null },
          { label: "Coupons", href: "", icon: null },
          { label: "Rewards", href: "", icon: null },
          { label: "Notification", href: "", icon: null },
          { label: "Gift Cards", href: "", icon: null },
          {
            label: "Logout",
            href: "",
            icon: null,
            onClick: handleUserLogoutClick,
          },
        ]}
      />
    );
  };

  const rendernonLoggedInMenu = () => {
    return (
      <DropdownMenu
        menu={
          <a
            className="loginButton"
            onClick={() => {
              setLoginModal(true);
              setSignup(false);
            }}
          >
            Login
          </a>
        }
        menus={[
          { label: "My Profile", href: "", icon: null },
          { label: "Flipkart Plus Zone", href: "", icon: null },
          {
            label: "Orders",
            href: "",
            icon: null,
            onClick: () => {
              !auth.isLoggedIn && setLoginModal(true);
            },
          },
          { label: "Wishlist", href: "", icon: null },
          { label: "Rewards", href: "", icon: null },
          { label: "Gift Cards", href: "", icon: null },
        ]}
        firstMenu={
          <div className="firstmenu">
            <span>New Customer?</span>
            <a
              style={{ color: "#2874f0" }}
              onClick={() => {
                setLoginModal(true);
                setSignup(true);
              }}
            >
              Sign Up
            </a>
          </div>
        }
      />
    );
  };

  return (
    <div className="header">
      <Modal visible={loginModal} onClose={() => setLoginModal(false)}>
        <div className="authContainer">
          <div className="row">
            <div className="leftspace">
              <h2>{signup?'Signup':'Login'}</h2>
              <p>Get access to your Orders, Wishlist and Recommendations</p>
            </div>
            <div className="rightspace">
              <div className="loginInputContainer">
                {signup && (
                  <MaterialInput
                    type="text"
                    label="Enter First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                )}
                {signup && (
                  <MaterialInput
                    type="text"
                    label="Enter Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                )}
                <MaterialInput
                  type="text"
                  label="Enter Email/Enter Mobile Number"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MaterialInput
                  type="password"
                  label="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  // rightElement={<a href="#">Forgot?</a>}
                />
                <MaterialButton
                  title={signup ? "Register" : "Login"}
                  bgColor="#fb641b"
                  textColor="#ffffff"
                  style={{ margin: "40px 0 20px 0" }}
                  onClick={handleUserLoginClick}
                />
                <p style={{ textAlign: "center" }}>OR</p>
                <MaterialButton
                  title={signup?"Login":"Sign Up"}
                  bgColor="#ffffff"
                  textColor="#2874f0"
                  style={{ margin: "20px 0" }}
                  onClick={() => {
                    setLoginModal(true);
                    if(!signup)
                    setSignup(true);
                    else
                    setSignup(false);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <div className="subHeader">
        {/* Logo */}
        <div className="logo">
          <a href="">
            <img src={flipkartLogo} className="logoimage" alt="" />
          </a>
          <a style={{ marginTop: "-10px" }}>
            <span className="exploreText">Explore</span>
            <span className="plusText">Plus</span>
            <img src={goldenStar} className="goldenStar" alt="" />
          </a>
        </div>
        {/* Logo ends here */}

        {/* Search component */}
        <div
          style={{
            padding: "0 10px",
          }}
        >
          <div className="searchInputContainer">
            <input
              className="searchInput"
              placeholder={"search for products, brands and more"}
            />
            <div className="searchIconContainer">
              <IoIosSearch
                style={{
                  color: "#2874f0",
                }}
              />
            </div>
          </div>
        </div>
        {/* Search component ends here */}

        {/* Right Side Menu */}
        <div className="rightMenu">
          {auth.isLoggedIn ? renderLoggedInMenu() : rendernonLoggedInMenu()}
          <DropdownMenu
            menu={
              <a className="more">
                <span>More</span>
                <IoIosArrowDown />
              </a>
            }
            menus={[
              { label: "Notification Preference", href: "", icon: null },
              { label: "Sell on flipkart", href: "", icon: null },
              { label: "24x7 Customer Care", href: "", icon: null },
              { label: "Advertise", href: "", icon: null },
              { label: "Download App", href: "", icon: null },
            ]}
          />
          <div>
            <a className="cart" onClick={onClickCart}>
              <Cart count={Object.keys(cart.cartItems).length} />
              {/* {/* <IoIosCart /> */}
              <span style={{ margin: "0 10px" }}>Cart</span>
            </a>
          </div>
        </div>
        {/* Right side menu ends here  */}
      </div>
    </div>
  );
};

export default Header;
