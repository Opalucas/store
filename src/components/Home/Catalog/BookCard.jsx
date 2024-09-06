const CardBook = ({ book }) => {
  return (
    <>
      <div className="col-lg-3 col-md-6 mb-3">
        <div className="card" style={{ width: "18rem" }}>
          <img src="..." className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{book.title}</h5>
            <h6 className="card-title">{book.author}</h6>
            <p className="card-text">{book.description}</p>
            <div className="d-flex gap-16px mt-1">
              <button className="btn btn-light btn-sm">
                <i className="fa fa-eye"></i> Visualizar
              </button>
              <button className="btn btn-light btn-sm">
                <i className="fa fa-cart-plus"></i> Carrinho
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardBook;
