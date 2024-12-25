import PropTypes from "prop-types";
import s from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ loadMore, page, totalPages }) => {
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

LoadMoreBtn.propTypes = {
  loadMore: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
};

export default LoadMoreBtn;
