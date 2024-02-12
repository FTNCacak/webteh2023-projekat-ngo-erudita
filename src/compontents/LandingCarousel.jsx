import styles from "./LandingCarousel.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import useHttpGet from "../Hooks/useHttpGet";

const LandingCarousel = () => {
  const fetchData = useHttpGet("carousels");

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  // useEffect(() => {
  //   console.log();
  // });
  return (
    <>
      <Slider {...settings} className={styles.slider}>
        {fetchData.data?.map((data) => {
          return (
            <div className={styles.sliderItem} key={data.id}>
              <div className={`${styles.carouselContent} ${(data.title || data.content) ? null : styles.onlyButton}`}>
                <h1>{data.title}</h1>
                <p>{data.content}</p>
                {data.button_text ? <Link to={data.button_link}>{data.button_text}</Link> : null}
              </div>
              <img
                src={
                  process.env.PUBLIC_URL + data.photo
                }
              ></img>
            </div>
          );
        })}
      </Slider>
    </>
  );
};

export default LandingCarousel;
