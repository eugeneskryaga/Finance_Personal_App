import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./components/App/App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./index.css";
import { AuthProvider } from "./components/AuthProvider/AuthProvider.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root") as HTMLDivElement).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <App />
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
);
