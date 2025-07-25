import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AppProvider } from "./context/AuthContext.jsx";
import { ToastContainer } from "react-toastify";


createRoot(document.getElementById("root")).render(
  <AppProvider>
    <ToastContainer />
    <App />
  </AppProvider>
);
