import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { AuthenticationContext } from "../Authentication/Authentication";
export const cartContext = createContext();

export default function CartContextProvider({ children }) {
  const [numberOfCartItems, setnumberOfCartItems] = useState(null);
  const [cartItemsArray, setcartItemsArray] = useState(null);
  const [totalPrice, settotalPrice] = useState(null);
  const [cartID, setcartID] = useState(null);
  const { token } = useContext(AuthenticationContext);
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

  async function getCartData() {
    const getCartDataBoolResponse = await axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: token,
        },
      })
      .then((responce) => {
        console.log("responce", responce);

        setnumberOfCartItems(responce.data.numOfCartItems);
        setcartItemsArray(responce.data.data.products);
        settotalPrice(responce.data.data.totalCartPrice);
        setcartID(responce.data.cartId);
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
    return getCartDataBoolResponse;
  }

  async function handleAddToCart(id) {
    const getCartDataBoolResponse = await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: id,
        },
        {
          headers: {
            token: token,
          },
        }
      )
      .then((responce) => {
        showSuccessAlert("Product added Successfully");
        getCartData();
        return true;
      })
      .catch((error) => {
        console.log(error);
        console.log("error", error);
        showErrorAlert(error.response.data.message);
        return false;
      });
    return getCartDataBoolResponse;
    // } else navigate("/login");
  }

  async function UpdateCartProductQuantity(id, newCount) {
    const UpdateCartProductQuantityBoolRespoce = await axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          count: newCount,
        },
        {
          headers: {
            token: token,
          },
        }
      )
      .then((responce) => {
        setnumberOfCartItems(responce.data.numOfCartItems);
        setcartItemsArray(responce.data.data.products);
        settotalPrice(responce.data.data.totalCartPrice);
        return true;
      })
      .catch((error) => {
        return false;
      });
    return UpdateCartProductQuantityBoolRespoce;
  }
  async function RemoveSpecificCartItem(id) {
    const RemoveSpecificCartItemBoolRespoce = await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers: {
          token: token,
        },
      })
      .then((responce) => {
        setnumberOfCartItems(responce.data.numOfCartItems);
        setcartItemsArray(responce.data.data.products);
        settotalPrice(responce.data.data.totalCartPrice);
        return true;
      })
      .catch((error) => {
        return false;
      });
    return RemoveSpecificCartItemBoolRespoce;
  }
  async function ClearUserCart() {
    const ClearUserCartBoolRespoce = await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: {
          token: token,
        },
      })
      .then((responce) => {
        setnumberOfCartItems(null);
        setcartItemsArray(null);
        settotalPrice(null);
        return true;
      })
      .catch((error) => {
        return false;
      });
    return ClearUserCartBoolRespoce;
  }

  function resetCartStates() {
    setnumberOfCartItems(null);
    setcartItemsArray(null);
    settotalPrice(null);
  }

  useEffect(() => {
    if (token) {
      getCartData();
    }
  }, [token]);

  return (
    <cartContext.Provider
      value={{
        handleAddToCart,
        getCartData,
        UpdateCartProductQuantity,
        RemoveSpecificCartItem,
        ClearUserCart,
        resetCartStates,
        numberOfCartItems,
        cartItemsArray,
        totalPrice,
        cartID,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
