import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./styles.css";

import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import SlideContent from "./SlideContent";

export default function SwiperComponent() {
  return (
    <>
      <Swiper
        loop={true}
        cssMode={true}
        navigation={true}
        pagination={{ clickable: true }}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mainSwiper"
      >
        <SwiperSlide>
          <SlideContent />
        </SwiperSlide>
        <SwiperSlide>
          <SlideContent />
        </SwiperSlide>
        <SwiperSlide>
          <SlideContent />
        </SwiperSlide>
        <SwiperSlide>
          <SlideContent />
        </SwiperSlide>
        <SwiperSlide>
          <SlideContent />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
