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

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "products", element: <Products /> },
      { path: "cart", element: <Cart /> },
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
      <QueryClientProvider client={client}>
        <AuthenticationProvider>
          <CategoryContextProvider>
            <RouterProvider router={router} />
          </CategoryContextProvider>
        </AuthenticationProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
