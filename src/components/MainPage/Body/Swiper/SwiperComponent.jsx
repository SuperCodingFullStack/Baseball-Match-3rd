import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./styles.css";

import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import SlideContent1 from "./SlideContent1";
import SlideContent2 from "./SlideContent2";

export default function SwiperComponent() {
  return (
    <>
      <Swiper
        loop={true}
        cssMode={true}
        navigation={true}
        pagination={{ clickable: true }}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mainSwiper"
      >
        <SwiperSlide>
          <SlideContent1 />
        </SwiperSlide>
        <SwiperSlide>
          <SlideContent2 />
        </SwiperSlide>
        <SwiperSlide>
          <SlideContent2 />
        </SwiperSlide>
        <SwiperSlide>
          <SlideContent2 />
        </SwiperSlide>
        <SwiperSlide>
          <SlideContent2 />
        </SwiperSlide>
        <SwiperSlide>
          <SlideContent2 />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
