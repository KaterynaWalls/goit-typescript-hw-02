import React, { useState } from "react";
import Modal from "react-modal";
import s from "./ImageModal.module.css";

interface ImageModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  largeImageUrl: string;
  altText?: string;
}
Modal.setAppElement("#root");

const ImageModal: React.FC<ImageModalProps> = ({
  isModalOpen,
  closeModal,
  largeImageUrl,
  altText,
}) => {
  const [isFadingOut, setIsFadingOut] = useState(false);

  const closeWithAnimation = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsFadingOut(false);
      closeModal();
    }, 500);
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
            e.stopPropagation();
            closeWithAnimation();
          }}
        />
      </div>
    </Modal>
  );
};

export default ImageModal;
