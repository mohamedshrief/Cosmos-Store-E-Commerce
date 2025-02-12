import { useContext } from "react";
import { Zoom } from "react-awesome-reveal";
import { cartContext } from "../../assets/contexts/CartContext/CartContext";
import SolarSystemSpinner from "../SolarSystemSpinner/SolarSystemSpinner";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { AuthenticationContext } from "../../assets/contexts/Authentication/Authentication";
import { wishContext } from "../../assets/contexts/WishContext/WishContext";

export default function Wish() {
  const { handleAddTowish, RemoveSpecificwishItem, wishItemsArray } =
    useContext(wishContext);
  const { token } = useContext(AuthenticationContext);
  const { handleAddToCart } = useContext(cartContext);

  function handelRemoveSpecificwishItem(id) {
    const res = RemoveSpecificwishItem(id);
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

  if (!wishItemsArray) {
    return <SolarSystemSpinner />;
  }
  return (
    <>
      {" "}
      <div className="relative overflow-x-auto shadow-md sm:rounded-2xl ">
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
              <th scope="col" className="px-6 py-3">
                Add to Cart
              </th>
            </tr>
          </thead>
          <tbody>
            {wishItemsArray?.map((product) => {
              return (
                <tr
                  key={product._id}
                  className=" border-b border-cyan-200 text-stone-200 text-center"
                >
                  <td className="p-4">
                    <Zoom delay={100} duration={1500} triggerOnce>
                      <img
                        src={product.imageCover}
                        className="w-16 md:w-32 max-w-full max-h-full"
                        alt={product.titel}
                      />
                    </Zoom>
                  </td>
                  <td className="px-6 py-4 font-semibold text-amber-300 text-xl">
                    <Zoom delay={100} duration={1500} triggerOnce>
                      {product.title}
                    </Zoom>
                  </td>

                  <td className="px-6 py-4 font-semibold text-amber-300 text-xl">
                    <Zoom delay={100} duration={1500} triggerOnce>
                      {product.price}
                    </Zoom>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-red-600 hover:underline">
                      <Zoom delay={100} duration={1500} triggerOnce>
                        <div
                          onClick={() => {
                            handelRemoveSpecificwishItem(product.id);
                          }}
                        >
                          <i className="fa-solid fa-trash-can pe-3"></i>
                          Remove
                        </div>
                      </Zoom>
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        if (token) {
                          handleAddToCart(product.id);
                        } else {
                          Navigate("/login");
                        }
                      }}
                      className="relative w-40 inline-flex items-center justify-center p-2 text-sm font-medium text-white bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg group hover:from-cyan-600 hover:to-blue-600 focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800"
                    >
                      <span className="relative text-lg">Add to Cart</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
