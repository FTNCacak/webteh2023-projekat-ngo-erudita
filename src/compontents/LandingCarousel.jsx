import styles from "./LandingCarousel.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useEffect } from "react";

const LandingCarousel = ( id1, id2, id3 ) => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000
  };

  useEffect(()=> {
    console.log(id1,id2,id3);
  });
  return (
    <>
      <Slider  {...settings} className={styles.slider}>
        <div className={styles.sliderItem}>
          <img src={process.env.PUBLIC_URL + '/imgs/blog/Pink-Floyd-photo-1.jpg'}>
          </img>
        </div>
        <div className={styles.sliderItem}>
          <img src={process.env.PUBLIC_URL + '/imgs/blog/Dusko-Trifunovic-photo-1.jpeg'}>
          </img>
        </div>
        <div className={styles.sliderItem}>
          <img src={process.env.PUBLIC_URL + '/imgs/blog/Marija-Kiri-photo-1.png'}>
          </img>
        </div>
      </Slider>
    </>
  );
};

export default LandingCarousel;
