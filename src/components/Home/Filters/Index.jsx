import React, { useContext, useState, useEffect } from "react";

import { FilterContext } from "../../../context/FilterContext";

const Filters = () => {
  const { filters, setFilters } = useContext(FilterContext);
  const [check, setCheck] = useState(false);

  useEffect(() => {
    const forSale = check ? "1" : "";
    setFilters({ ...filters, forSale: forSale });
  }, [check]);
  
  const handleChecked = (e) => {
    setCheck(e.target.checked);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h3>Busca</h3>
        <i className="fa fa-filter"></i>
      </div>
      <hr />

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por título"
          value={filters.searchTerm}
          onChange={(e) =>
            setFilters({ ...filters, searchTerm: e.target.value })
          }
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Autor"
          value={filters.author}
          onChange={(e) => setFilters({ ...filters, author: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Gênero</label>
        <select
          className="form-select"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="">Todos</option>
          <option value="action">Ação</option>
          <option value="adventure">Aventura</option>
          <option value="biography">Biografia</option>
          <option value="children">Infantil</option>
          <option value="classics">Clássicos</option>
          <option value="fantasy">Fantasia</option>
          <option value="history">História</option>
          <option value="horror">Terror</option>
          <option value="mystery">Mistério</option>
          <option value="non-fiction">Não Ficção</option>
          <option value="romance">Romance</option>
          <option value="science">Ciência</option>
          <option value="self-help">Autoajuda</option>
          <option value="thriller">Thriller</option>
          <option value="young-adult">Juvenil</option>
        </select>
      </div>

      <div className="mb-3">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
            checked={check}
            onChange={handleChecked}
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Disponível para venda
          </label>
        </div>
      </div>
    </>
  );
};

export default Filters;
