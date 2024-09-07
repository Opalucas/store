import React, { createContext, useState, useEffect } from "react";
import apiAxios from "../services/API";

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    searchTerm: "",
    category: "",
    author: "",
    forSale: "",
  });

  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchFilteredBooks = async () => {
      let queryParams = new URLSearchParams();

      if (filters.category) queryParams.append('category', filters.category);
      if (filters.searchTerm) queryParams.append('title', filters.searchTerm);
      if (filters.author) queryParams.append('author', filters.author);
      if (filters.forSale) queryParams.append('for_sale', filters.forSale);
  
      try {
        const response = await apiAxios({
          rota: queryParams.toString() ? `api/books?${queryParams.toString()}` : "api/home",
          metodo: "GET",
        });
        setBooks(response.data.items);
      } catch (error) {
        console.error("Erro ao buscar livros:", error);
      }
    };

    fetchFilteredBooks();
  }, [filters]);

  return (
    <FilterContext.Provider value={{ filters, setFilters, books }}>
      {children}
    </FilterContext.Provider>
  );
};
