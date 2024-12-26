import React from "react";
import styles from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  errorType: "not_found" | "network" | "server" | string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ errorType }) => {
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

  const { message, className } =
    errorConfig[errorType as keyof typeof errorConfig] || errorConfig.default;

  return (
    <div className={className}>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
