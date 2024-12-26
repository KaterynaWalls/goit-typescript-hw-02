/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";
import SearchBar from "./SearchBar/SearchBar.js";
import ImageGallery from "./ImageGallery/ImageGallery.js";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn.js";
import Loader from "./Loader/Loader.js";
import ErrorMessage from "./ErrorMessage/ErrorMessage.js";
import ImageModal from "./ImageModal/ImageModal.js";
import { fetchImages } from "../services/api.jsx";
import { nanoid } from "nanoid";
import { ImageData } from "../types.ts";

import s from "./App.module.css";

interface ModalData {
  isOpen: boolean;
  largeImageUrl: string;
  altText: string;
}

type ErrorType = "not_found" | "network" | "server" | "";

const App: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [images, setImages] = useState<ImageData[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorType, setErrorType] = useState<ErrorType>("");
  const [totalPages, setTotalPages] = useState<number>(0);
  const [modalData, setModalData] = useState<ModalData>({
    isOpen: false,
    largeImageUrl: "",
    altText: "",
  });

  useEffect(() => {
    if (!query) return;

    const controller = new AbortController();
    const { signal } = controller;

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
      } catch (error: any) {
        if (signal.aborted) {
          console.log("Fetch aborted");
          return;
        }
        console.error(error);
        setErrorType(!navigator.onLine ? "network" : "server");
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getImage();

    return () => controller.abort();
  }, [query, page]);

  useEffect(() => {
    if (page > 1 && images.length > 0) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [images]);

  const resetStates = useCallback(() => {
    setImages([]);
    setPage(1);
    setIsError(false);
    setErrorType("");
  }, []);

  const handleSearch = useCallback(
    (searchQuery: string) => {
      if (searchQuery.trim() === "") {
        toast.error("Please enter a search term");
        return;
      }
      resetStates();
      setQuery(searchQuery.trim());
    },
    [resetStates]
  );

  const handleImageClick = (image: ImageData) => {
    setModalData({
      isOpen: true,
      largeImageUrl: image.largeUrl,
      altText: image.name,
    });
  };

  const closeModal = useCallback(() => {
    setModalData({ isOpen: false, largeImageUrl: "", altText: "" });
  }, []);

  const handleLoadMore = useCallback(() => {
    if (page < totalPages && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [page, totalPages, isLoading]);

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
