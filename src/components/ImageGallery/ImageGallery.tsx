import React, { useMemo } from "react";
import ImageCard from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";
import { ImageData } from "../../types";

interface ImageGalleryProps {
  images: ImageData[];
  onImageClick: (image: ImageData) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  onImageClick,
}) => {
  return (
    <ul className={s.galleryList}>
      {images.map((image) => (
        <li key={image.id} className={s.item} aria-label={image.description}>
          <ImageCard image={image} openModal={() => onImageClick(image)} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
