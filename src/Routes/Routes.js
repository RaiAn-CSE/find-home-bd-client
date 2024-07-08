import { createBrowserRouter } from "react-router-dom";
// import DashboardLayout from "../Layout/DashboardLayout";
import Main from "../Layout/Main";
import AboutUs from "../Pages/AboutUs/AboutUs";
import AddProperty from "../Pages/AddProperty/AddProperty";
import AllOwners from "../Pages/AllOwners/AllOwners";
// import AllOwners from "../Pages/AllOwners/AllOwners";
import AllProperty from "../Pages/AllProperty/AllProperty";
import AllRenters from "../Pages/AllRenters/AllRenters";
import ContactUs from "../Pages/ContactUs/ContactUs";
// import AllRenters from "../Pages/AllRenters/AllRenters";
import Dashboard from "../Pages/Dashboard/Dashboard";
import FeedBack from "../Pages/FeedBack/FeedBack";
import Home from "../Pages/Home/Home";
import HomeSortProperty from "../Pages/HomeSortProperty/HomeSortProperty";
import Login from "../Pages/Login/Login";
import MyProperty from "../Pages/MyProperty/MyProperty";
import PropertyDetails from "../Pages/PropertyDetails/PropertyDetails";
import Conversations from "../Pages/Conversations/Conversations";
import Signup from "../Pages/Signup/Signup";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
// import AdminRoute from "./AdminRoute/AdminRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/allProperty",
        element: <AllProperty></AllProperty>,
      },
      {
        path: "/addProperty",
        element: (
          <PrivateRoute>
            <AddProperty></AddProperty>
          </PrivateRoute>
        ),
      },
      {
        path: "/aboutUs",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/contactUs",
        element: (
          <PrivateRoute>
            <ContactUs />
          </PrivateRoute>
        ),
      },
      {
        path: "/logIn",
        element: <Login></Login>,
      },
      {
        path: "/signUp",
        element: <Signup></Signup>,
      },
      {
        path: "/homeSortProperty",
        element: <HomeSortProperty></HomeSortProperty>,
      },
      {
        path: "/details/:id",
        element: (
          <PrivateRoute>
            <PropertyDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/details/${params.id}`),
      },
      {
        path: "/conversations/:propertyId",
        element: (
          <PrivateRoute>
            <Conversations />
          </PrivateRoute>
        )
      }
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard/allRenters",
        element: <AllRenters></AllRenters>,
      },
      {
        path: "/dashboard/allOwners",
        element: <AllOwners></AllOwners>,
      },
      {
        path: "/dashboard/myProperty",
        element: <MyProperty></MyProperty>,
      },
      {
        path: "/dashboard/feedback",
        element: <FeedBack></FeedBack>,
      },
    ],
  },
]);
export default router;
