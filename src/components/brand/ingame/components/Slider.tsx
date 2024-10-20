import styled from '@emotion/styled';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import ImageContainer from './ImageContainer';

const swiperImages = [
  '/assets/images/ingame_slider_1.png',
  '/assets/images/ingame_slider_2.png',
  '/assets/images/ingame_slider_3.png',
  '/assets/images/ingame_slider_4.png',
  '/assets/images/ingame_slider_5.png'
];

export default function Slider() {
  const swiperParams: SwiperProps = {
    modules: [Autoplay, Pagination, Navigation],
    width: 768,
    slidesPerView: 2,
    spaceBetween: -61,
    centeredSlides: true,
    // loop: true,
    autoplay: {
      delay: 6000,
      disableOnInteraction: false
    },
    pagination: {
      clickable: true
    },
    navigation: true
  };

  return (
    <SliderStyle>
      <Swiper {...swiperParams}>
        {swiperImages.map((item, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
              <>
                <ImageContainer isActive={isActive} url={item} />
              </>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </SliderStyle>
  );
}

const SliderStyle = styled.div`
  overflow: hidden;
  .swiper {
    width: 768px;
    left: 50%;
    transform: translateX(-50%);
    .swiper-wrapper {
      .swiper-slide {
        transform: translateX(43.2px);
      }
    }
    .swiper-pagination {
      margin: 40px auto 0;
      width: 166px;
      height: 20px;
      justify-content: space-between;

      display: flex;
      .swiper-pagination-bullet {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #d9d9d9;
        &.swiper-pagination-bullet-active {
          background-color: #ff570e;
        }
      }
    }
  }
`;
