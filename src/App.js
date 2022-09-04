import "./App.css";
import { HomePage } from "./containers/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProductListPage } from "./containers/ProductListPage";
import { getAllCategory } from "./features/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ProductDetailsPage } from "./containers/ProductDetailsPage";
import { CartPage } from "./containers/CartPage";
import { updateCart } from "./features/cartSlice";
import { CheckoutPage } from "./containers/CheckoutPage";
import { OrderPage } from "./containers/OrderPage";
import { OrderDetails } from "./containers/OrderDetails";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  // console.log(auth);
  const category = useSelector((state) => state.category);
  useEffect(() => {
    // console.log(category.status)
    if (category.status == "idle") {
      // console.log("Into hjgkjhjlkhj")
      dispatch(getAllCategory());
    }
  }, []);
  useEffect(() => {
    console.log("App.js - updateCart");
    dispatch(updateCart());
  }, [auth.isLoggedIn]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<HomePage />}></Route>
          <Route path="/cart" element={<CartPage />}></Route>
          <Route path="/checkout" element={<CheckoutPage />}></Route>
          <Route path="/account/orders" element={<OrderPage />}></Route>
          <Route
            path="/order-details/:orderId"
            element={<OrderDetails />}
          ></Route>
          <Route
            path="/:productSlug/:productId/p"
            element={<ProductDetailsPage />}
          ></Route>
          <Route path="/:slug" element={<ProductListPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
