import react from "react"
import {BrowserRouter as Router, Routes,Route} from "react-router-dom"

//import hooks
import { useDispatch ,useSelector} from "react-redux";
import { useEffect } from "react";
import { loadUser } from "./redux/actions/user";
import toast, { Toaster } from "react-hot-toast";
import { ProtectedRoute } from "protected-route-react";

//import components
import Header from "./component/layout/Header";
import Home from "./component/home/Home";
import Contact from "./component/contact/Contact";
import Cart from "./component/cart/Cart";
import Shipping from "./component/cart/Shipping";
import ConfirmOrder from "./component/cart/ConfirmOrder";
import PaymentSuccess from "./component/cart/PaymentSuccess";
import Login from "./component/login/Login"
import Profile from "../src/component/profile/Profile.jsx"
import MyOrders from "./component/myOrders/MyOrder.jsx"
import OrderDetails from "./component/myOrders/OrderDetails.jsx"
import DashBoard from "./component/admin/Dashboard.jsx"
import Users from "./component/admin/Users.jsx"
import Orders from "./component/admin/Orders.jsx"
import NotFound from "./component/layout/NotFound";
import About from "./component/about/About.jsx";





//import scss
import "./styles/app.scss"
import "./styles/header.scss"
import "./styles/home.scss"
import "./styles/founder.scss"
import "./styles/menu.scss"
import "./styles/contact.scss"
import "./styles/cart.scss"
import "./styles/shipping.scss"
import "./styles/confirmOrder.scss"
import "./styles/paymentSuccess.scss"
import "./styles/login.scss"
import "./styles/profile.scss"
import "./styles/table.scss"
import "./styles/orderdetails.scss"
import "./styles/dashboard.scss"
import "./styles/users.scss"
import "./styles/orders.scss"
import "./styles/footer.scss"
import "./styles/notfound.scss"
import "./styles/about.scss"
import Footer from "./component/layout/Footer";

function App() {
  const dispatch = useDispatch();
  const { error, message, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );
console.log(user);
  useEffect(() => {
   
    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({
        type: "clearError",
      });
    }
    if (message) {
      toast.success(message);
      dispatch({
        type: "clearMessage",
      });
    }
  }, [dispatch, error, message]);
  
  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/paymentsuccess" element={<PaymentSuccess />} />

        <Route
          path="/login"
          element={
            <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/me">
              <Login />
            </ProtectedRoute>
          }
        />

        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/me" element={<Profile />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/confirmorder" element={<ConfirmOrder />} />
          <Route path="/myorders" element={<MyOrders/>} />
          <Route path="/order/:id" element={<OrderDetails />} />
        </Route>

        <Route
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              adminRoute={true}
              isAdmin={user && user.role === "admin"}
              redirectAdmin="/me"
            />
          }
        >
          <Route path="/admin/dashboard" element={<DashBoard/>} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/orders" element={<Orders />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* <Footer /> */}
      <Toaster />
    </Router>
  );
}

export default App;
