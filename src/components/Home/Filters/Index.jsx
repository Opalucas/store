import React, { useState } from "react";
import Catalog from "../Catalog/Catalgo";

const Filters = () => {
  return (
    <>
      <div className="col-md-3">
        <div className="d-flex justify-content-between align-items-center">
          <h3>Busca</h3>
          <i className="fa fa-filter"></i>
        </div>
        <hr />

        <div className="mb-3">
          <input type="text" className="form-control" placeholder="Search..." />
          <span className="form-text muted">
            Procure por categoria, nome do livro e autor
          </span>
        </div>

        <div className="mb-3">
          <label className="form-label">Gênero</label>
          <select className="form-select">
            <option>Todos</option>
            <option></option>
          </select>
        </div>
      </div>
    </>
  );
};
export default Filters;
