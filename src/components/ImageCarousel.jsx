import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Dynamically import all images from the /pictures folder
const importAll = (r) => r.keys().map(r);
const images = importAll(require.context("../pictures", false, /\.(png|jpe?g|svg)$/));

const ImageCarousel = () => {
  return (
    <div className="carousel-background">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]} // Enable Swiper modules
        spaceBetween={0}
        slidesPerView={1}
        navigation={false} // Navigation arrows disabled
        pagination={false} // Pagination dots disabled
        autoplay={{ delay: 3000 }} // Auto slide every 3 seconds
        loop // Infinite loop
      >
        {/* Render each image as a Swiper slide */}
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`Háttér ${index + 1}`}
              className="carousel-image"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageCarousel;
