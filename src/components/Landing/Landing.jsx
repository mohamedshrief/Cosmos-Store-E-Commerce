import img1 from "../../assets/imgs/img1.jpg";
import img2 from "../../assets/imgs/img2.jpg";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Scrollbar,
  EffectFade,
  Navigation,
  Pagination,
  Autoplay,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function LandingSlider() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        effect={"fade"}
        navigation={false}
        modules={[Pagination, Navigation, EffectFade, Autoplay, Scrollbar]}
        // modules={[Autoplay, Pagination, Navigation, EffectFade, Scrollbar]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        scrollbar={{ hide: true }}
        className="mySwiper"
      >
        <SwiperSlide className="">
          <img src={img1} alt="approch" className="w-full h-full" />
        </SwiperSlide>
        <SwiperSlide className="">
          <img src={img2} alt="crash-start" className="w-full h-full" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
