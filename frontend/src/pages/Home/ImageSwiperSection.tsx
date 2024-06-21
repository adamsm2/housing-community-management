import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { useInView } from "react-intersection-observer";
import { EffectCoverflow, Keyboard, Navigation, Pagination } from "swiper/modules";
import osiedla1 from "@/assets/osiedla1.jpg";
import osiedla2 from "@/assets/osiedla2.png";
import osiedla3 from "@/assets/osiedla3.png";
import osiedla4 from "@/assets/osiedla4.png";
import osiedla5 from "@/assets/osiedla5.jpg";
import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";

const ImageSwiperSection = () => {
  const { t } = useTranslation();
  const swiperRef = useRef<SwiperRef>(null);
  const { ref: imageRef1, inView: inView1 } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  useEffect(() => {
    if (inView1) {
      swiperRef.current?.swiper?.slideTo(2);
    }
  }, [inView1]);

  const media = window.matchMedia("(max-width: 700px)");


  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 overflow-hidden text-center">
      <h1 className="sm:mt-1 mt-10 text-3xl font-bold tracking-tight sm:text-4xl">
        {t("ourHousingCommunity")}
      </h1>
      <div className="mt-12 mb-24">
        <Swiper
          effect={"coverflow"}
          ref={swiperRef}
          initialSlide={1}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={media.matches ? 1.5 : 3}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{ clickable: true }}
          navigation={true}
          keyboard={true}
          modules={[Navigation, EffectCoverflow, Pagination, Keyboard]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img src={osiedla1} alt="osiedla1" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={osiedla2} alt="osiedla2" ref={imageRef1} />
          </SwiperSlide>
          <SwiperSlide>
            <img src={osiedla3} alt="osiedla3" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={osiedla4} alt="osiedla4" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={osiedla5} alt="osiedla5" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default ImageSwiperSection;