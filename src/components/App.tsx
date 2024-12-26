/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import SearchBar from "./SearchBar/SearchBar.js";
import ImageGallery from "./ImageGallery/ImageGallery.js";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn.js";
import Loader from "./Loader/Loader.js";
import ErrorMessage from "./ErrorMessage/ErrorMessage.js";
import ImageModal from "./ImageModal/ImageModal.js";
import { fetchImages } from "../services/api.jsx";
import { nanoid } from "nanoid";
import s from "./App.module.css";

const App: React.FC = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorType, setErrorType] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [modalData, setModalData] = useState({
    isOpen: false,
    largeImageUrl: "",
    altText: "",
  });

  useEffect(() => {
    if (!query) return;

    const getImage = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        setErrorType("");

        const { images: newImages, totalPages } = await fetchImages(
          query,
          page
        );

        if (newImages.length === 0) {
          setIsError(true);
          setErrorType("not_found");
          return;
        }

        const imagesWithId = newImages.map((image) => ({
          ...image,
          id: `${image.id}-${page}-${nanoid()}`,
        }));

        setTotalPages(totalPages);

        setImages((prevImages) => [...prevImages, ...imagesWithId]);
      } catch (error) {
        console.error(error);

        if (!navigator.onLine) {
          setErrorType("network");
        } else {
          setErrorType("server");
        }

        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getImage();
  }, [query, page]);

  useEffect(() => {
    if (page > 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [images]);

  const handleSearch = (searchQuery) => {
    if (searchQuery.trim() === "") {
      toast.error("Please enter a search term");
      return;
    }
    setQuery(searchQuery.trim());
    setPage(1);
    setImages([]);
    setIsError(false);
    setErrorType("");
  };
  const handleImageClick = ({ url, name }) => {
    setModalData({
      isOpen: true,
      largeImageUrl: url,
      altText: name,
    });
  };

  const closeModal = () => {
    setModalData({ isOpen: false, largeImageUrl: "", altText: "" });
  };

  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const renderContent = () => {
    if (isLoading) return <Loader />;
    if (isError) return <ErrorMessage errorType={errorType} />;
    return <ImageGallery images={images} onImageClick={handleImageClick} />;
  };

  const renderLoadMoreBtn = () => {
    if (!isLoading && images.length > 0 && totalPages > page) {
      return (
        <LoadMoreBtn
          loadMore={handleLoadMore}
          page={page}
          totalPages={totalPages}
        />
      );
    }
    return null;
  };

  return (
    <div className={s.container}>
      <SearchBar onSubmit={handleSearch} />
      {renderContent()}
      {renderLoadMoreBtn()}

      <ImageModal
        isModalOpen={modalData.isOpen}
        closeModal={closeModal}
        largeImageUrl={modalData.largeImageUrl}
        altText={modalData.altText}
      />

      <Toaster position="top-right" />
    </div>
  );
};

export default App;
