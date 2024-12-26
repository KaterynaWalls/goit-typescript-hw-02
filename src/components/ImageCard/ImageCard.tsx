import React, { useState } from "react";
import s from "./ImageCard.module.css";

interface ImageData {
  largeUrl: string;
  smallUrl: string;
  description?: string;
  likes?: number;
}

interface ImageCardProps {
  image: ImageData;
  openModal?: (
    image: Pick<ImageData, "smallUrl" | "largeUrl" | "description">
  ) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, openModal }) => {
  const [likes, setLikes] = useState<number>(image.likes || 0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const handleLikeToggle = () => {
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
    setIsLiked(!isLiked);
  };

  const handleOpenModal = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (openModal) {
      openModal({
        smallUrl: image.smallUrl,
        largeUrl: image.largeUrl,
        description: image.description || "Image",
      });
    }
  };

  return (
    <div className={s.card}>
      <a
        href={image.largeUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleOpenModal}
      >
        {!isLoaded && <div className={s.loader}>Loading...</div>}
        <img
          className={`${s.imgCard} ${!isLoaded ? s.hidden : ""}`}
          src={image.smallUrl}
          alt={image.description || "Image"}
          title={image.description || "Image"}
          onLoad={handleImageLoad}
        />
      </a>
      <button
        className={s.likesContainer}
        onClick={handleLikeToggle}
        aria-label={isLiked ? "Unlike this image" : "Like this image"}
      >
        <p>Likes: {likes}</p>
      </button>
    </div>
  );
};

export default ImageCard;
