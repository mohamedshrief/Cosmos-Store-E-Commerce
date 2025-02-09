import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import StarRating from "../StarRating/StarRating";
import { Fade, Flip, Rotate, Slide } from "react-awesome-reveal";

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "../../App.css";

// import required modules
import { EffectFlip, Pagination, Navigation } from "swiper/modules";
import SolarSystemSpinner from "../SolarSystemSpinner/SolarSystemSpinner";
import NotFound404 from "../NotFound404/NotFound404";

export default function ProductDetails() {
  const { id } = useParams();
  //   ----------------------------------------------------------------------------
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  //   ----------------------------------------------------------------------------
  // const id = "6408e98e6406cd15828e8f30";
  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }
  const { data, isLoading, isError } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: getProductDetails,
  });

  const ProductDetailsData = data?.data.data;
  if (isLoading) {
    return <SolarSystemSpinner />;
  }

  if (isError) {
    isError && <NotFound404 />;
  }
  return (
    <div id="ProductDetails">
      {/* Slide direction="left" delay={500} duration={1200} */}
      <div className="container mx-auto">
        {ProductDetailsData && (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-3 p-10 gap-x-8">
              <Fade
                // direction="left"
                delay={300}
                duration={1400}
              >
                <div className="img p-12">
                  <img
                    src={ProductDetailsData.imageCover}
                    alt={ProductDetailsData.title?.split(" ", 2).join(" ")}
                    className="w-full rounded-lg relative"
                  />
                  <div className="overlay absolute rounded-lg w-full h-full inset-0 bg-black opacity-5"></div>
                </div>
              </Fade>

              <Fade
                // direction="right"
                delay={300}
                duration={1400}
                className="caption col-span-2 py-16 text-white flex justify-center items-center"
              >
                <div className="content">
                  <h2 className="text-3xl font-extrabold text-center mb-7">
                    {ProductDetailsData.title}
                  </h2>
                  <div className="rating flex justify-center items-center gap-5 flex-wrap">
                    <span className="text-xl">
                      Rating : {ProductDetailsData.ratingsAverage}
                    </span>
                    <StarRating rating={ProductDetailsData.ratingsAverage} />
                  </div>
                  <div className="quantity-price flex gap-8 items-center justify-center">
                    <span>
                      <form className="max-w-xs mx-auto">
                        <div className="relative flex items-center max-w-[8rem]">
                          <button
                            type="button"
                            id="decrement-button"
                            data-input-counter-decrement="quantity-input"
                            className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                          >
                            <svg
                              className="w-3 h-3 text-gray-900 dark:text-white"
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
                          <input
                            type="text"
                            id="quantity-input"
                            data-input-counter
                            data-input-counter-min={1}
                            data-input-counter-max={50}
                            aria-describedby="helper-text-explanation"
                            className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder={999}
                            defaultValue={5}
                            required
                          />
                          <button
                            type="button"
                            id="increment-button"
                            data-input-counter-increment="quantity-input"
                            className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                          >
                            <svg
                              className="w-3 h-3 text-gray-900 dark:text-white"
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
                      </form>
                    </span>
                    <span className="price text-xl my-5">
                      {" "}
                      price :{" "}
                      <span className="text-amber-300 text-2xl font-black">
                        {ProductDetailsData.price}
                      </span>{" "}
                      $
                    </span>
                  </div>
                  <div className="btns mt-8 gap-y-5 w-full flex justify-center items-center flex-wrap">
                    <button className="relative w-60 inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium  text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                      <span className="relative w-full px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent text-xl group-hover:dark:bg-transparent">
                        Add to Cart{" "}
                        <i className="fa-solid fa-cart-plus text-xl text-emerald-800"></i>
                      </span>
                    </button>
                    <button
                      type="button"
                      className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-md dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2"
                    >
                      <i className="fa-regular fa-heart text-xl"></i>
                    </button>
                    <button
                      type="button"
                      className="w-60 flex justify-center items-center text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 text-xl font-medium rounded-lg px-5 py-2.5 text-center me-2 "
                    >
                      <svg
                        className="w-3.5 h-3.5 me-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 18 21"
                      >
                        <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                      </svg>
                      Buy now
                    </button>
                  </div>
                </div>
              </Fade>
            </div>
            <div className="deep-details p-12 flex flex-col lg:flex-row flex-wrap justify-between items-center gap-5">
              <div className="w-full lg:w-[48%]">
                <table className="min-w-full dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg overflow-hidden">
                  <thead className=" dark:bg-gray-700"></thead>
                  <tbody>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="px-4 py-4 font-semibold">Description</td>
                      <td className="px-4 py-4 text-center text-sm sm:text-lg/7">
                        {ProductDetailsData.description}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="px-4 py-4 font-semibold">Price</td>
                      <td className="px-4 py-4">
                        ${ProductDetailsData.price.toFixed(2)}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="px-4 py-4 font-semibold">Category</td>
                      <td className="px-4 py-4">
                        {ProductDetailsData.category.name}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="px-4 py-4 font-semibold">Brand</td>
                      <td className="px-4 py-4">
                        {ProductDetailsData.brand?.name || "N/A"}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="px-4 py-4 font-semibold">Stock</td>
                      <td className="px-4 py-4">
                        {ProductDetailsData.quantity}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 font-semibold">Sold</td>
                      <td className="px-4 py-4">{ProductDetailsData.sold}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div></div>
              <Fade
                direction="right"
                delay={300}
                duration={1400}
                className="w-full lg:w-[48%] "
              >
                <div
                  id="slider"
                  className="slider max-h-[800px] max-w-[700px] m-auto p-20 flex flex-col gap-5 items-start justify-center"
                >
                  <Swiper
                    effect={"flip"}
                    grabCursor={true}
                    loop={true}
                    pagination={true}
                    navigation={true}
                    modules={[EffectFlip, Pagination, Navigation]}
                    className="mySwiper"
                  >
                    {ProductDetailsData.images.map((img, index) => {
                      return (
                        <SwiperSlide key={index}>
                          <div className="img rounded-lg">
                            <img src={img} />
                            <div className="overlay absolute rounded-lg w-full h-full inset-0 bg-black opacity-5"></div>
                          </div>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </div>
              </Fade>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
