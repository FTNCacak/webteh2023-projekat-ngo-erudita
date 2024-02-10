import ReactImageGallery from "react-image-gallery";
import styles from "./PhotoGallery.module.scss";
import { useEffect, useState } from "react";

const PhotoGallery = (imageProps) => {
  const [images, setImages] = useState([]);
  const addImages = (imag) => {
    imag.imageProps.map(imag => {
      setImages((prev) => {
        return [
          ...prev,
          {
            original: imag,
          },
        ];
      });
    });
  };
  useEffect(() => {
    addImages(imageProps);
  }, [imageProps]);
  return (
    <ReactImageGallery
      items={images}
      additionalClass={styles.photoGallery}
      showThumbnails={false}
      showPlayButton={false}
      autoPlay={true}
    />
  );
};

export default PhotoGallery;
