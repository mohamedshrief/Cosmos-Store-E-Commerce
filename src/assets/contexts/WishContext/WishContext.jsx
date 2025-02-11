import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { AuthenticationContext } from "../Authentication/Authentication";

export const wishContext = createContext();

export default function WishContextProvider({ children }) {
  const [wishItemsArray, setwishItemsArray] = useState(null);
  const noOfItemesInWishlishArray = wishItemsArray?.length;
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
  async function getwishData() {
    const getwishDataBoolResponse = await axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: {
          token: token,
        },
      })
      .then((responce) => {
        console.log("responce", responce);
        console.log("responce.data.data", responce.data.data);

        setwishItemsArray(responce.data.data);
        console.log("wishItemsArray", wishItemsArray);

        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
    return getwishDataBoolResponse;
  }

  async function handleAddTowish(id) {
    const getwishDataBoolResponse = await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
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
        console.log(responce);
        getwishData();
        return true;
      })
      .catch((error) => {
        console.log(error);
        showErrorAlert("This product doesn't exist any more");
        return false;
      });
    // } else navigate("/login");
  }

  async function RemoveSpecificwishItem(id) {
    const RemoveSpecificwishItemBoolRespoce = await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
        headers: {
          token: token,
        },
      })
      .then((responce) => {
        getwishData();
        return true;
      })
      .catch((error) => {
        return false;
      });
    return RemoveSpecificwishItemBoolRespoce;
  }

  useEffect(() => {
    if (token) {
      getwishData();
    }
  }, [token]);
  {
    return (
      <wishContext.Provider
        value={{
          handleAddTowish,
          getwishData,
          RemoveSpecificwishItem,
          noOfItemesInWishlishArray,
          wishItemsArray,
        }}
      >
        {children}
      </wishContext.Provider>
    );
  }
}
