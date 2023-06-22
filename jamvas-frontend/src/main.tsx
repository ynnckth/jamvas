import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme";
import { Toaster } from "react-hot-toast";
import { defaultToastOptions } from "./toastnotifications/defaultToastOptions";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <App />
        <Toaster toastOptions={defaultToastOptions} />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
