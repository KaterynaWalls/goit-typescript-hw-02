/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import styles from "./ErrorMessage.module.css";

const ErrorMessage = ({ errorType }) => {
  const errorConfig = {
    not_found: {
      message:
        "😕 Мікі Маус перевірив усі полиці, але нічого не знайшов. Спробуйте ввести інший запит!",
      className: styles.notFound,
    },
    network: {
      message:
        "🌐 Мікі зачепив дроти й інтернет зник. Перевірте Wi-Fi, і ми його повернемо!",
      className: styles.networkError,
    },
    server: {
      message:
        "🤖 Мікі Маус вирішив погратися з сервером. Ми працюємо над тим, щоб усе відновити.",
      className: styles.serverError,
    },
    default: {
      message:
        "🤷‍♂️ Мікі Маус у розгубленості. Щось пішло не так. Спробуйте ще раз!",
      className: styles.defaultError,
    },
  };

  const { message, className } = errorConfig[errorType] || errorConfig.default;

  return (
    <div className={className}>
      <p>{message}</p>
    </div>
  );
};

ErrorMessage.propTypes = {
  errorType: PropTypes.string.isRequired,
};

export default ErrorMessage;
