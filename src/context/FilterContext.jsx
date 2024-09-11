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
  const [totalItems, setTotalItens] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilteredBooks = async () => {
      let queryParams = new URLSearchParams();

      if (filters.category.length > 3) queryParams.append("category", filters.category);
      if (filters.searchTerm.length > 3) queryParams.append("title", filters.searchTerm);
      if (filters.author.length > 3) queryParams.append("author", filters.author);
      if (filters.forSale) queryParams.append("for_sale", filters.forSale);

      try {
        const response = await apiAxios({
          rota: queryParams.toString()
            ? `api/books?${queryParams.toString()}`
            : "api/home",
          metodo: "GET",
        });
        setBooks(response.data.items);
        setTotalItens(response.data.totalItems);
      } catch (error) {
        if (error.response.status === 400) {
          setError(error.response.data.message);
        } else if (error.response.status === 500) {
          setError("Erro ao consultar a API de livros");
        } else {
          console.error("Erro ao buscar livros:", error);
          setError("Ocorreu um erro ao buscar os livros");
        }
      }
    };

    fetchFilteredBooks();
  }, [filters]);

  return (
    <FilterContext.Provider value={{ filters, setFilters, books, error, totalItems }}>
      {children}
    </FilterContext.Provider>
  );
};
