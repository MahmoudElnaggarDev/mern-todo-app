import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { TodosContextProvider } from "./context/TodosContext";
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TodosContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </TodosContextProvider>
  </React.StrictMode>
);
