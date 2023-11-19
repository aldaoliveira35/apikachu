import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Navbar } from "./components/Navbar/Navbar";
import { HomePage } from "./pages/homepage/homepage";
import { PokemonPage } from "./pages/pokemon/pokemon";
import { PokemonDetailsPage } from "./pages/pokemon-details/pokemon-details";

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
            padding: "25px",
            display: "flex",
            flexDirection: "column",
            height: "calc(100% - 90px)",
            overflowY: "auto",
          }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pokemon" element={<PokemonPage />} />
            <Route path="/pokemon/:id" element={<PokemonDetailsPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
