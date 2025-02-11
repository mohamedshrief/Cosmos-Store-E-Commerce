import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthenticationContext } from "../../assets/contexts/Authentication/Authentication";
import { cartContext } from "../../assets/contexts/CartContext/CartContext";
import { wishContext } from "../../assets/contexts/WishContext/WishContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { token, settoken } = useContext(AuthenticationContext);
  const { numberOfCartItems } = useContext(cartContext);
  const { noOfItemesInWishlishArray } = useContext(wishContext);

  return (
    <nav className="bg-gray-900 dark:bg-gray-900 fixed w-full z-50 top-0 start-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <span className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-bold text-white whitespace-nowrap dark:text-white">
            <i className="fa-solid fa-cart-shopping text-green-300"></i>{" "}
            FreshCart
          </span>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </span>

        <div className="flex justify-center items-center gap-1 md:gap-2 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {!token ? (
            <ul
              id="social-media-icons-list"
              className="flex justify-center items-center gap-1 md:gap-2"
            >
              <li className="h-6 w-6 text-sm mt-3 md:mt-0 md:h-8 md:w-8 md:text-md flex justify-center items-center rounded-full border border-stone-300  hover:border-cyan-400 duration-300 group ">
                <i className="fa fa-brands fa-facebook-f text-stone-300 group-hover:text-cyan-400"></i>
              </li>
              <li className="h-6 w-6 text-sm mt-3 md:mt-0 md:h-8 md:w-8 md:text-md flex justify-center items-center rounded-full border border-stone-300  hover:border-cyan-400 duration-300 group ">
                <i className="fa fa-brands fa-linkedin-in text-stone-300 group-hover:text-cyan-400"></i>
              </li>
            </ul>
          ) : (
            <ul
              id="user-icons-list"
              className="flex justify-center items-center gap-1 md:gap-2"
            >
              <li className="h-6 w-6 relative text-sm mt-3 md:mt-0 md:h-8 md:w-8 md:text-md flex justify-center items-center rounded-full border border-text-green-500  hover:border-green-300 duration-300 group ">
                <span className="absolute -top-[12px] right-[6px] text-[12px] text-stone-200 w-4 h-4 flex justify-center items-center bg-green-500 rounded-full">
                  {numberOfCartItems}
                </span>
                <Link
                  to={"/cart"}
                  id="carticon"
                  className="fa-solid fa-cart-shopping text-green-500 group-hover:text-green-300"
                ></Link>
              </li>
              <li className="relative h-6 w-6 text-sm mt-3 md:mt-0 md:h-8 md:w-8 md:text-md flex justify-center items-center rounded-full border border-red-300  hover:border-red-500 duration-300 group ">
                <Link
                  to={"/wish"}
                  id="wishicon"
                  className="fa-solid fa-heart text-red-300 group-hover:text-red-500"
                ></Link>
                <span className="absolute -top-[12px] right-[6px] text-[12px] text-stone-200 w-4 h-4 flex justify-center items-center bg-green-500 rounded-full">
                  {noOfItemesInWishlishArray}
                </span>
              </li>
            </ul>
          )}
          {!token ? (
            <Link
              to={"/login"}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-xl text-lg font-bold px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={() => {
                settoken(null);
                localStorage.removeItem("token");
              }}
              type="button"
              className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Logout
            </button>
          )}
        </div>
        <div
          className={`items-center justify-between ${
            isOpen ? "flex" : "hidden"
          } w-full md:flex md:w-auto md:order-1`}
        >
          <ul className="flex flex-col p-4 w-full md:p-0 mt-4 font-medium border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 text-white">
            <li>
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  `py-2 px-3 hover:bg-gray-100 md:hover:bg-transparent md:p-0 dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent dark:border-gray-700 ${
                    isActive ? "text-black font-black active" : ""
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `py-2 px-3 hover:bg-gray-100 md:hover:bg-transparent md:p-0 dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent dark:border-gray-700 ${
                    isActive ? "text-black font-black active" : ""
                  }`
                }
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/categories"
                className={({ isActive }) =>
                  `py-2 px-3 hover:bg-gray-100 md:hover:bg-transparent md:p-0 dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent dark:border-gray-700 ${
                    isActive ? "text-black font-black active" : ""
                  }`
                }
              >
                Categories
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/brands"
                className={({ isActive }) =>
                  `py-2 px-3 hover:bg-gray-100 md:hover:bg-transparent md:p-0 dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent dark:border-gray-700 ${
                    isActive ? "text-black font-black active" : ""
                  }`
                }
              >
                Brands
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
