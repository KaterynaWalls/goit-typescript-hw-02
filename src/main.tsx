import React from "react"; // Додано імпорт React, щоб уникнути проблем із UMD-глобалами.
import { createRoot } from "react-dom/client";

import App from "./components/App";

const rootElement = document.getElementById("root") as HTMLElement;

const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
