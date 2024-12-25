import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import s from "./ImageModal.module.css";

Modal.setAppElement("#root");

const ImageModal = ({ isModalOpen, closeModal, largeImageUrl, altText }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);

  const closeWithAnimation = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsFadingOut(false);
      closeModal();
    }, 500); // Тривалість анімації 0.5s
  };

  if (!largeImageUrl) {
    console.error("Large image URL is missing!");
    return null;
  }

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeWithAnimation}
      overlayClassName={`${s.overlay} ${isFadingOut ? s.fadeOut : ""}`}
      className={`${s.modal} ${isFadingOut ? s.fadeOut : ""}`}
    >
      <div onClick={closeWithAnimation}>
        <img
          src={largeImageUrl}
          alt={altText || "Image"}
          className={s.image}
          onClick={(e) => {
            e.stopPropagation(); // Щоб уникнути подвійного закриття
            closeWithAnimation();
          }}
        />
      </div>
    </Modal>
  );
};

ImageModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  largeImageUrl: PropTypes.string.isRequired,
  altText: PropTypes.string,
};

export default ImageModal;
