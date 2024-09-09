import React from "react";

const NotFound = () => {
  return (
    <section className="py-3 py-md-5 min-vh-100 d-flex justify-content-center align-items-center">
  <div className="container">
    <div className="row">
      <div className="col-12">
        <div className="text-center">
          <h2 className="d-flex justify-content-center align-items-center gap-2 mb-4">
            <span className="display-1 fw-bold">4</span>
            <i className="fa-solid fa-circle-info fa-xl p-1" style={{color: '#ff0000'}}></i>
            <span className="display-1 fw-bold bsb-flip-h">4</span>
          </h2>
          <h3 className="h2 mb-2">Oops! Você está perdido.</h3>
          <p className="mb-5">A pagina que você está procurando não foi encontrada.</p>
          <a className="btn bsb-btn-5xl btn-dark rounded-pill px-5 fs-6 m-0" href="/" role="button">Voltar ao inicio</a>
        </div>
      </div>
    </div>
  </div>
</section>
  );
};

export default NotFound;
