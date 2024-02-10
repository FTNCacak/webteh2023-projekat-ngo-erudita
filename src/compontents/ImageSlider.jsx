import React from 'react';
import { Fade } from 'react-slideshow-image';
import styles from "./ImageSlider.module.scss";

const ImageSlider = ({images}) => {
  return (
    <div className={styles['slide-container']}>
      <Fade>
        {images.map((image, index) => 
          <div key={index} className={styles['each-fade']}>
            <div className={styles['image-container']}>
              <img src={image} alt=""/>
            </div>
          </div>
        )}
      </Fade>
    </div>
  );
}

export default ImageSlider;