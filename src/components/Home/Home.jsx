import { Link } from "react-router-dom";
import LandingSlider from "../Landing/Landing";
import SolarSystemSpinner from "../SolarSystemSpinner/SolarSystemSpinner";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import "./styles.css";

import { EffectCoverflow, Pagination, Keyboard } from "swiper/modules";
import useCategory from "../../Hooks/useCategory";
import SeeMoreButton from "../SeeMoreButton/SeeMoreButton";
import NotFound404 from "../NotFound404/NotFound404";

export default function Home() {
  const { data, isError, error, isLoading } = useCategory();

  const allCategories = data?.data.data;
  console.log("allCategories ", allCategories);

  return (
    <div id="home" className="md:-m-[90]">
      <div className="landing-screen flex justify-center items-center">
        <LandingSlider />
        <div className="caption absolute z-30 text-center py-5 px-4">
          <span className="text-3xl text-white font-bold mb-6">Welcome To</span>
          <h1 id="main-titel" className="text-[80px] text-white font-black">
            <span className="main-titel">COSMOS</span>{" "}
            <span className="main-titel">STORE</span>
          </h1>
          <button
            type="button"
            className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-8 py-4 text-center me-2 mb-2 mt-8"
          >
            <Link to="/products" className="text-2xl">
              Go Shopping
              <i className="fa-solid fa-truck-arrow-right text-indigo-800 ms-3" />
            </Link>
          </button>
        </div>
      </div>
      <div className="displayCategories mt-10 pb-10">
        <div className="titel text-center">
          <h2 className="text-[50px] text-white font-extrabold">categories</h2>
        </div>
        <div className="content container">
          {isLoading && <SolarSystemSpinner />}
          {isError && <NotFound404 />}

          <>
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              pagination={{ clickable: true }}
              keyboard={{
                enabled: true,
                onlyInViewport: false,
              }}
              modules={[EffectCoverflow, Pagination, Keyboard]}
              className="mySwiper"
            >
              {allCategories?.map((category) => {
                return (
                  <>
                    <SwiperSlide
                      key={category._id}
                      className="relative group overflow-hidden"
                    >
                      <span
                        className="bg-indigo-800 absolute 
                      duration-300 
                      group-hover:top-8 top-3 
                      z-20
                      opacity-60 group-hover:opacity-100
                      left-1/2 -translate-x-1/2 text-white text-l font-semibold me-2 px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300"
                      >
                        {category.name}
                      </span>

                      <img
                        src={category.image}
                        className="group-hover:scale-[1.1] duration-300"
                      />
                      <SeeMoreButton id={category._id} newPath={"categories"} />
                    </SwiperSlide>
                  </>
                );
              })}
            </Swiper>
          </>
        </div>
      </div>
    </div>
  );
}
