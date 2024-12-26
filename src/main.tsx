import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./components/App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
        <App /> {" "}
  </React.StrictMode>
);
