const Cart = () => {
  return (
    <>
      <div className="row">
        <div
          className="col-md-8 offset-md-2 d-flex flex-column"
          style={{ gap: "32px" }}
        >
          <div className="d-flex justify-content-center">
            <span className="title">Carrinho de compras</span>
          </div>
          <div className="overflow-x">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Livro</th>
                  <th scope="col">Valor</th>
                  <th scope="col">Quantidade</th>
                  <th scope="col">Preço</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Nome do livro</td>
                  <td>R$250</td>
                  <td>
                    <i className="fa-solid fa-minus cursor-pointer"></i>
                    Quantidade
                    <i className="fa-solid fa-plus cursor-pointer"></i>
                  </td>
                  <td>R$500</td>
                  <td>
                    <i className="fa-solid fa-trash cursor-pointer"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-end" style={{ gap: "16px" }}>
            <div className="d-flex flex-column align-items-end">
              <span>
                <strong>Subtotal</strong>
              </span>
            </div>
            <div className="d-flex flex-column align-items-start">
              <span>Subtotal</span>
            </div>
          </div>

          <div className="d-flex justify-content-end">
            <button className="btn btn-light">
              Finalizar compra 
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
          <div>
            <div
              className="d-flex flex-column align-items-center"
              style={{ gap: "16px" }}
            >
              <span>Your shopping cart is empty!</span>
              <a href="/">Go to the catalog</a>
            </div>
            <div className="alert alert-danger">Mensagem de erro</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
