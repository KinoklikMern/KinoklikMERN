import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { SnackbarProvider } from "notistack";

import reducers from "./reducers";

import App from "./App";
import ChatProvider from "./context/ChatProvider";
import { NotificationProvider } from "./context/NotificationContext";
import { SocketProvider } from "./context/SocketProvider";

import './i18n';


const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export const persistor = persistStore(store);
const root = createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <SocketProvider>
        <BrowserRouter>
          <ChatProvider>
            <SnackbarProvider maxSnack={3}>
              <NotificationProvider>
                <App />
              </NotificationProvider>
            </SnackbarProvider>
          </ChatProvider>
        </BrowserRouter>
      </SocketProvider>
    </PersistGate>
  </Provider>
);
