import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const importAll = (r) => r.keys().map(r);
const images = importAll(require.context("../pictures", false, /\.(png|jpe?g|svg)$/));

const ImageCarousel = () => {
  return (
    <div className="carousel-container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
        className="swiper-container"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="swiper-slide">
            <img
              src={image}
              alt={`Termék ${index + 1}`}
              className="carousel-image"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageCarousel;


