import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import App from "./App";
import { antdTheme } from "./theme/antdTheme";
import "./styles/variables.css";
import "./styles/utilities.css";
import "./styles/global.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <ConfigProvider theme={antdTheme}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </QueryClientProvider>
      </ConfigProvider>
    </HelmetProvider>
  </React.StrictMode>
);
