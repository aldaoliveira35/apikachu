import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Navbar } from "./components/Navbar/Navbar";
import { PageContainer } from "./components/PageContainer/PageContainer";
import { HomePage } from "./pages/homepage/homepage";
import { PokemonPage } from "./pages/pokemon/pokemon-page";
import { PokemonDetailsPage } from "./pages/pokemon-details/pokemon-details-page";
import { ItemsPage } from "./pages/items/items-page";

import "./styles/reset.css";
import "./styles/global.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Navbar />
        <PageContainer>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pokemon" element={<PokemonPage />} />
            <Route path="/pokemon/:id" element={<PokemonDetailsPage />} />
            <Route path="/items" element={<ItemsPage />} />
          </Routes>
        </PageContainer>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
