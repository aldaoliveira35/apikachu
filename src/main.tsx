import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Navbar } from "./components/Navbar/Navbar";
import { Pokedex } from "./pages/pokedex";
import { Homepage } from "./pages/homepage";

import "./styles/reset.css";
import "./styles/global.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Navbar />
        <div
          style={{
            padding: 2,
            display: "flex",
            flexDirection: "column",
            height: "calc(100% - 80px)",
          }}
        >
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/pokedex" element={<Pokedex />} />
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
