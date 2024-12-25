/* eslint-disable no-unused-vars */
import React, { useMemo } from "react";
import PropTypes from "prop-types";
import ImageCard from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul className={s.galleryList}>
      {images.map((image) => (
        <li key={image.id} className={s.item}>
          <ImageCard image={image} openModal={onImageClick} />
        </li>
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      smallUrl: PropTypes.string.isRequired,
      largeUrl: PropTypes.string.isRequired,
      description: PropTypes.string,
      likes: PropTypes.number,
    })
  ).isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGallery;
