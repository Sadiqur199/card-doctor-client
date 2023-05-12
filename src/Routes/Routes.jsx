import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SingUp from "../Pages/SingUp/SingUp";
import CheckOut from "../Pages/CheckOut/CheckOut";
import BookService from "../Pages/BookService/BookService";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children:[
      {
        path:'/',
        element:<Home></Home>
      },
      {
        path:'login',
        element:<Login></Login>
      },
      {
        path:'singup',
        element:<SingUp></SingUp>
      },
      {
        path:'bookings',
        element:<PrivateRoute><BookService></BookService></PrivateRoute>,
      },
      {
        path:'checkout/:id',
        element:<CheckOut></CheckOut>,
        loader:({params}) => fetch(`http://localhost:5000/services/${params.id}`)
      }
    ]
  },
]);

export default router 
