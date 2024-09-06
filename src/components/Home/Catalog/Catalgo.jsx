import CardBook from "./BookCard";

const Catalog = () => {
  return (
    <>
      <div className="col-md-9">
        <div className="row">
          <div className="d-flex justify-content-between">
            <h3>Livros</h3>
          </div>
          <div className="d-flex justfy-content-between">
            <div className="row px-1">
              <div className="col-md-2">
                <CardBook
                  book={{
                    title: "Livro",
                    author: "Lucas",
                    description: "Minha descrição do livro",
                  }}
                />
              </div>
            </div>
            <div className="row px-1">
              <div className="col-md-2">
                <CardBook
                  book={{
                    title: "Livro",
                    author: "Lucas",
                    description: "Minha descrição do livro",
                  }}
                />
              </div>
            </div>
            <div className="row px-1">
              <div className="col-md-2">
                <CardBook
                  book={{
                    title: "Livro",
                    author: "Lucas",
                    description: "Minha descrição do livro",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Catalog;
