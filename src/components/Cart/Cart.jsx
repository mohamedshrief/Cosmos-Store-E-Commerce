import { useContext } from "react";
import { Zoom } from "react-awesome-reveal";
import { cartContext } from "../../assets/contexts/CartContext/CartContext";
import SolarSystemSpinner from "../SolarSystemSpinner/SolarSystemSpinner";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const {
    numberOfCartItems,
    cartItemsArray,
    totalPrice,
    UpdateCartProductQuantity,
    RemoveSpecificCartItem,
    ClearUserCart,
  } = useContext(cartContext);
  function handelUpdateCartProductQuantity(id, newCount) {
    const res = UpdateCartProductQuantity(id, newCount);
    if (res) {
      toast.success("Product count changed Successfully !!", {
        duration: 3000,
        position: "top-right",
      });
    } else {
      toast.error("error", {
        duration: 3000,
        position: "top-right",
      });
    }
  }
  function handelRemoveSpecificCartItem(id) {
    const res = RemoveSpecificCartItem(id);
    if (res) {
      toast.success("Product Deleted Successfully !!", {
        duration: 5000,
        position: "top-right",
      });
    } else {
      toast.error("error", {
        duration: 5000,
        position: "top-right",
      });
    }
  }
  function handelClearUserCart() {
    const res = ClearUserCart();
    if (res) {
      toast.success("Cart Cleared Successfully !!", {
        duration: 5000,
        position: "top-right",
      });
    } else {
      toast.error("error", {
        duration: 5000,
        position: "top-right",
      });
    }
  }

  if (!cartItemsArray) {
    return <SolarSystemSpinner />;
  }

  return (
    <div id="cart" className="min-h-lvh grid grid-cols-1 md:grid-cols-4">
      <div className="relative overflow-x-auto shadow-md sm:rounded-2xl md:col-span-3">
        <table className="w-full table-auto text-md text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-md dark:shadow-cyan-800/80 font-semibold rounded-lg text-md px-5 py-2.5 text-center me-2">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {cartItemsArray?.map((product) => {
              return (
                <tr
                  key={product._id}
                  className=" border-b border-cyan-200 text-stone-200 text-center"
                >
                  <td className="p-4">
                    <Zoom delay={100} duration={1500}>
                      <img
                        src={product.product.imageCover}
                        className="w-16 md:w-32 max-w-full max-h-full"
                        alt={product.product.titel}
                      />
                    </Zoom>
                  </td>
                  <td className="px-6 py-4 font-semibold text-amber-300 text-xl">
                    <Zoom delay={100} duration={1500}>
                      {product.product.title}
                    </Zoom>
                  </td>
                  <td className="px-6 py-4">
                    <Zoom
                      delay={100}
                      duration={1500}
                      className="flex justify-center border-none outline-none"
                    >
                      <div className="flex items-center ">
                        <button
                          onClick={() => {
                            handelUpdateCartProductQuantity(
                              product.product.id,
                              product.count - 1
                            );
                          }}
                          className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <div>
                          <input
                            type="number"
                            value={product.count}
                            id="first_product"
                            className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                          />
                        </div>
                        <button
                          onClick={() => {
                            handelUpdateCartProductQuantity(
                              product.product.id,
                              product.count + 1
                            );
                          }}
                          className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </Zoom>
                  </td>
                  <td className="px-6 py-4 font-semibold text-amber-300 text-xl">
                    <Zoom delay={100} duration={1500}>
                      {product.price}
                    </Zoom>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-red-600 hover:underline">
                      <Zoom delay={100} duration={1500}>
                        <div
                          onClick={() => {
                            handelRemoveSpecificCartItem(product.product.id);
                          }}
                        >
                          <i className="fa-solid fa-trash-can pe-3"></i>
                          Remove
                        </div>
                      </Zoom>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="bg-gray-100 p-6 w-full max-w-sm shadow-lg rounded-xl">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Order Summary
        </h2>

        <div className="flex justify-between text-gray-700 text-lg mb-2">
          <span>ITEMS</span>
          <span>£{totalPrice}</span>
        </div>

        <div className="flex justify-between text-gray-700 text-lg mb-4">
          <span>SHIPPING</span>
          <span>Standard Delivery - £5.00</span>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-1">PROMO CODE</label>
          <input
            type="text"
            placeholder="Enter your code"
            value="promoCode : ....."
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="my-5 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition">
            APPLY
          </button>
        </div>

        <div className="flex justify-between mt-5 text-gray-900 text-xl font-semibold mb-4">
          <span>{totalPrice}</span>
          <span>£462.98</span>
        </div>

        <button
          onClick={() => navigate("/allorders")}
          className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition"
        >
          CHECKOUT
        </button>
        <button
          onClick={handelClearUserCart}
          className="w-full mt-9 bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 text-white py-3 rounded-md text-lg font-medium  transition"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
}
