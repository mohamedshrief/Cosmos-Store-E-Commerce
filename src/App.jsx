import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./components/Register/Register";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Products from "./components/Products/Products";
import "./App.css";
import Categories from "./components/Categories/Categories";
import CategoryContextProvider from "./CategoryContext/CategoryContext";
import AllBrands from "./components/Brands/AllBrands";
import BrandProducts from "./components/BrandProducts/BrandProducts";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Login from "./components/Login/Login";
import AuthenticationProvider from "./assets/contexts/Authentication/Authentication";
import Cart from "./components/Cart/Cart";
import NotFound404 from "./components/NotFound404/NotFound404";
import CartContextProvider from "./assets/contexts/CartContext/CartContext";
import { Toaster } from "react-hot-toast";
import Wish from "./components/Wish/Wish";
import WishContextProvider from "./assets/contexts/WishContext/WishContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AuthProtectedRoute from "./components/AuthProtectedRoute/AuthProtectedRoute";
import Makeorder from "./components/MakeOrder/Makeorder";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      {
        path: "register",
        element: (
          <AuthProtectedRoute>
            <Register />{" "}
          </AuthProtectedRoute>
        ),
      },
      {
        path: "login",
        element: (
          <AuthProtectedRoute>
            <Login />
          </AuthProtectedRoute>
        ),
      },
      { path: "products", element: <Products /> },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <Makeorder />
          </ProtectedRoute>
        ),
      },
      {
        path: "wish",
        element: (
          <ProtectedRoute>
            {" "}
            <Wish />
          </ProtectedRoute>
        ),
      },
      { path: "brands", element: <AllBrands /> },
      { path: "categories", element: <Categories /> },
      { path: "brandProducts/:id", element: <BrandProducts /> },
      { path: "productDetails/:id", element: <ProductDetails /> },
      { path: "*", element: <NotFound404 /> },
    ],
  },
]);

const client = new QueryClient();
function App() {
  return (
    <>
      <AuthenticationProvider>
        <CartContextProvider>
          <WishContextProvider>
            <QueryClientProvider client={client}>
              <CategoryContextProvider>
                <RouterProvider router={router} />
              </CategoryContextProvider>
            </QueryClientProvider>
          </WishContextProvider>
        </CartContextProvider>
      </AuthenticationProvider>
      <Toaster />
    </>
  );
}

export default App;
