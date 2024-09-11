import React, { useState, useEffect, useContext } from "react";
import Loading from "../../Loading/Loading";
import { Modal, Button } from "react-bootstrap";
import { FilterContext } from "../../../context/FilterContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartContext } from "../../../context/CartContext";
import { formatDate } from "../../../utils/Convert";

const Catalog = () => {
  const { addToCart } = useContext(CartContext);
  const { books, error } = useContext(FilterContext);
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (book) => {
    addToCart(book);
    toast.success(
      `${book.volumeInfo?.title || "Livro"} adicionado ao carrinho!`,
      {
        position: "top-right",
        autoClose: 2000,
      }
    );
  };

  const handleOpenModal = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  return (
    <>
      <ToastContainer />
      <div className="container">
        <div className="d-flex justify-content-between mb-3">
          <h3>Livros</h3>
        </div>
        <div className="row">
          {books && books.length ? (
            books.map((item, index) => (
              <div key={index} className="col-lg-3 col-md-3 col-sm-4 col-6 mb-3">
                <div className="card h-100">
                  <img
                    src={item.volumeInfo?.imageLinks?.thumbnail || "default.jpg"}
                    className="card-img-top"
                    alt={item.volumeInfo?.title || "Livro"}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <p>Título: </p>
                    <h5 className="card-title">
                      {item.volumeInfo?.title || "Livro"}
                    </h5>
                    <p>Autor(es): </p>
                    <h6 className="card-title">
                      {item.volumeInfo?.authors?.join(", ") || "Autor desconhecido"}
                    </h6>
                  </div>
                  <div className="card-footer">
                    <div className="d-flex gap-3 px-1">
                      <button
                        className="btn btn-light btn-sm"
                        onClick={() => handleOpenModal(item)}
                      >
                        <i className="fa fa-eye"></i> Visualizar
                      </button>
                      {item.saleInfo.saleability == "FOR_SALE" ? (
                        <button
                          className="btn btn-light btn-sm"
                          onClick={() => handleAddToCart(item)}
                        >
                          <i className="fa fa-cart-plus"></i> Carrinho
                        </button>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : error ? (
            <p>{error}</p>
          ) : (
            <p>Não há livro disponível no momento.</p>
          )}
        </div>
      </div>
      {selectedBook && (
        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          size="lg"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title className="text-2xl">
              {selectedBook.volumeInfo?.title || "Livro"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex gap-4">
              <img
                src={
                  selectedBook.volumeInfo?.imageLinks?.thumbnail ||
                  "default.jpg"
                }
                alt={selectedBook.volumeInfo?.title || "Livro"}
                className="img-fluid"
                style={{ maxWidth: "200px" }}
              />
              <div>
                <h6 className="text-muted">
                  <p>
                    Por:&nbsp;
                    {selectedBook.volumeInfo?.authors?.join(", ") ||
                      "Autor desconhecido"}
                  </p>
                </h6>
                <p className="mt-2">
                  <strong>Gênero: </strong>
                  {selectedBook.volumeInfo?.categories || "Desconhecido"}
                </p>
                <p className="mt-2">
                  <strong>Publicado em: </strong>
                  {formatDate(selectedBook.volumeInfo?.publishedDate) ||
                    "Desconhecido"}
                </p>
                <p>
                  <strong>Páginas: </strong>
                  {selectedBook.volumeInfo?.pageCount || "N/A"}
                </p>
                <p>
                  <strong>Editora: </strong>
                  {selectedBook.volumeInfo?.publisher || "N/A"}
                </p>
                <div className="d-flex justify-content-between mt-4">
                  <div>
                    <p>
                      <strong>Valor:</strong> R$
                      {selectedBook.saleInfo?.listPrice?.amount || "0.00"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h5 className="m-2">Sinopse</h5>
              <p className="mb-0 px-4">{selectedBook.volumeInfo.description}</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            {selectedBook.saleInfo.saleability == "FOR_SALE" ? (
              <Button variant="success" onClick={() => handleAddToCart(selectedBook)}>
                <i className="fa fa-cart-plus px-2"></i>Adicionar ao Carrinho
              </Button>
            ) : (
              <></>
            )}
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default Catalog;
