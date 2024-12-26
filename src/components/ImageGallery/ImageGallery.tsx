/* eslint-disable no-unused-vars */
import React, { useMemo } from "react";
import ImageCard from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";

interface Image {
  id: string;
  smallUrl: string;
  largeUrl: string;
  description?: string;
  likes?: number;
  name: string;
  image: Image;
}

interface ImageGalleryProps {
  images: Image[];
  onImageClick: (image: Image) => void;
}
const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  onImageClick,
}) => {
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

export default ImageGallery;
