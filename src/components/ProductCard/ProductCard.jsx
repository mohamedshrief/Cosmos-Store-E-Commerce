import React, { useContext } from "react";
import { Zoom } from "react-awesome-reveal";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../../assets/contexts/Authentication/Authentication";
import axios from "axios";
import swal from "sweetalert";

export let previosPathName = "";

export default function ProductCard({ product }) {
  const location = useLocation();
  previosPathName = location;
  const { token } = useContext(AuthenticationContext);
  const navigate = useNavigate();
  function showSuccessAlert(message) {
    swal({
      title: "Success!",
      text: message,
      icon: "success",
      button: "OK",
    });
  }
  function showErrorAlert(message) {
    swal({
      title: "Error!",
      text: message,
      icon: "error",
      button: "OK",
    });
  }
  function handleAddToCart() {
    if (token) {
      axios
        .post(
          "https://ecommerce.routemisr.com/api/v1/cart",
          {
            productId: product._id,
          },
          {
            headers: {
              token: token,
            },
          }
        )
        .then((responce) => {
          showSuccessAlert(responce.data.data.message);
          setTimeout(() => {
            navigate("/cart");
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
          showErrorAlert("This product doesn't exist any more");
        });
    } else navigate("/login");
  }

  return (
    <Zoom delay={100} duration={1500}>
      <div
        key={product._id}
        className="block rounded-lg p-4 shadow-md bg-white shadow-stone-100"
      >
        <div className="img relative overflow-hidden group">
          <img
            alt={product.name}
            src={product.imageCover}
            className="h-full w-full rounded-md object-cover"
          />
          <div className="icons-overlay absolute -right-4 top-20 bg-[rgba(0,0,0,.3)] flex flex-col items-center justify-between opacity-0 group-hover:opacity-100 group-hover:right-1 duration-300 h-[150px] w-[50px] p-5 rounded-xl">
            <i
              onClick={() => {
                handleAddToCart();
              }}
              className="fa-solid fa-cart-shopping text-slate-100 hover:text-green-600 duration-300"
            ></i>
            <Link to={`/productDetails/${product._id}`}>
              <i className="fa-solid fa-magnifying-glass-plus text-slate-100 hover:text-[#e9e170] duration-300"></i>
            </Link>
            <i className="fa-solid fa-heart text-slate-100 hover:text-red-500 duration-300"></i>
          </div>
        </div>

        <div className="mt-2 text-center">
          <dl>
            <div>
              <dt className="sr-only">Name</dt>
              <dd className="text-xl text-black font-bold">
                <h3>{product.slug.split("-", 2).join(" ")}</h3>
              </dd>
            </div>
            <div>
              <dt className="sr-only">Price</dt>
              <dd className="text-sm text-gray-500">
                Price : {product.price} $
              </dd>
            </div>
            <div>
              <p className="sr-only">category.name</p>
              <p className="font-medium">Category : {product.category.name}</p>
            </div>
          </dl>
          <div className="mt-6 flex items-center justify-between gap-y-3 flex-wrap  text-xs">
            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
              <img
                className="size-12 text-indigo-700"
                src={product.brand.image}
              />
            </div>
            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
              <i className="fa-solid fa-star-half-stroke text-blue-500"></i>

              <div className="mt-1.5 sm:mt-0">
                <p className="text-gray-500">Rating</p>
                <p className="font-medium">{product.ratingsAverage}</p>
              </div>
            </div>
            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
              <div className="mt-1.5 sm:mt-0">
                <p className="text-gray-500">Quantity</p>
                <p className="font-medium">{product.quantity}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Zoom>
  );
}
