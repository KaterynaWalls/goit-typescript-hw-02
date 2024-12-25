import PropTypes from "prop-types";
import { useState } from "react";
import s from "./ImageCard.module.css";

const ImageCard = ({ image, openModal }) => {
  const [likes, setLikes] = useState(image.likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const handleLikeToggle = () => {
    if (isLiked) {
      setLikes((prev) => prev - 1);
    } else {
      setLikes((prev) => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleOpenModal = (e) => {
    e.preventDefault();
    if (openModal) {
      openModal({
        url: image.largeUrl,
        name: image.description || "Image",
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

ImageCard.propTypes = {
  image: PropTypes.shape({
    largeUrl: PropTypes.string.isRequired,
    smallUrl: PropTypes.string.isRequired,
    description: PropTypes.string,
    likes: PropTypes.number,
  }).isRequired,
  openModal: PropTypes.func,
};

export default ImageCard;
