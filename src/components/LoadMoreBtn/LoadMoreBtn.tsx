import s from "./LoadMoreBtn.module.css";
import React from "react";
interface LoadBtnProp {
  loadMore: () => void;
  label?: string;
  page: number;
  totalPages: number;
}
const LoadMoreBtn: React.FC<LoadBtnProp> = ({ loadMore, page, totalPages }) => {
  return (
    <div
      className={`${s.btnContainer} ${page >= totalPages ? s.disabled : ""}`}
    >
      <button
        onClick={(e) => {
          e.preventDefault();
          if (page < totalPages) {
            loadMore();
          }
        }}
        className={s.LoadMoreBtn}
        disabled={page >= totalPages}
      >
        Load More
      </button>
    </div>
  );
};

export default LoadMoreBtn;
