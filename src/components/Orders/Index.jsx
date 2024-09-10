import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { formatDate } from "../../utils/Convert";

const Orders = () => {
  const navigate = useNavigate();
  const { user, orders } = useContext(UserContext);

  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const data = await orders();
        setOrderData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate, orders]);

  const exportToPDF = () => {
    const pdf = new jsPDF();
    let pageHeight = pdf.internal.pageSize.height;
    let marginY = 20;
    let startY = marginY;

    pdf.setFontSize(16);
    pdf.text("Histórico de Compras", 14, startY);
    startY += 10;

    orderData.forEach((order) => {
      if (startY + 40 > pageHeight) {
        pdf.addPage();
        startY = marginY;
      }
      pdf.setFontSize(12);
      pdf.text(`Pedido #${order.order_id.toString().padStart(5, '0')} - Data da compra: ${formatDate(order.data)}`,14,startY);
      startY += 8;

      pdf.setFontSize(10);
      pdf.text(`Entregue em: ${order.address.fullname}, ${order.address.street}, ${order.address.number}`,14,startY);
      startY += 6;

      pdf.text(`${order.address.neighborhood}, ${order.address.city} - ${order.address.state}`,14,startY);
      startY += 10;

      const tableData = order.items.map((item) => [
        item.product,
        `R$${item.unit_price}`,
        item.quantity,
        `R$${(item.unit_price * item.quantity).toFixed(2)}`,
      ]);

      pdf.autoTable({
        startY,
        head: [["Livro", "Valor Unitário", "Quantidade", "Preço Total"]],
        body: tableData,
        theme: "striped",
        styles: { fontSize: 10, cellPadding: 3 },
        margin: { top: 10 },
        didDrawPage: (data) => { startY = data.cursor.y; },
      });

      startY = pdf.autoTable.previous.finalY + 10;

      if (startY + 20 > pageHeight) {
        pdf.addPage();
        startY = marginY; 
      }

      const subtotal = order.items.reduce(
        (total, item) => total + item.unit_price * item.quantity, 0
      );

      pdf.text(`Subtotal: R$${subtotal.toFixed(2)}`, 14, startY);
      startY += 10;
    });

    pdf.save("account_history.pdf");
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <h2 className="text-center py-5 mb-3">Historico de Compras</h2>
      <div className="row">
        <div className="col col-md-2 col-lg-2 offset-md-8 d-flex flex-column">
          <button onClick={exportToPDF} className="btn btn-success btn-sm">
            Exportar PDF
            <i className="fa-solid fa-file-pdf m-2"></i>
          </button>
        </div>
        <div
          className="col-md-8 offset-md-2 d-flex flex-column mb-5"
          style={{ gap: "32px" }}
          id="orders-table"
        >
          {orderData.map((order, index) => (
            <div key={index} className="order-section">
              <h4>Data da compra: {formatDate(order.data)}</h4>
              <h5>Entregue em:</h5>
              <p>
                {order.address.fullname}, {order.address.street},
                {order.address.number}, {order.address.neighborhood},
                {order.address.city} - {order.address.state}
              </p>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Livro</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Quantidade</th>
                    <th scope="col">Preço</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, itemIndex) => (
                    <tr key={itemIndex}>
                      <td>{item.product}</td>
                      <td>R${item.unit_price}</td>
                      <td>{item.quantity} (und)</td>
                      <td>R${item.unit_price * item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <h5 className="text-end">
                Subtotal:{" "}
                <strong>
                  R$
                  {order.items
                    .reduce(
                      (total, item) => total + item.unit_price * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </strong>
              </h5>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Orders;
