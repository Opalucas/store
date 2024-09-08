import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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

  const exportToPDF = async () => {
    const input = document.getElementById("orders-table");
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const imgWidth = 190;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, -heightLeft, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save("orders.pdf");
  };
  function formatDate(dateString) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

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
        <div
          className="col-md-8 offset-md-2 d-flex flex-column"
          style={{ gap: "32px" }}
        >
          <table id="orders-table" className="table">
            <thead>
              <tr>
                <th scope="col">Data</th>
                <th scope="col">Livro</th>
                <th scope="col">Valor</th>
                <th scope="col">Quantidade</th>
                <th scope="col">Preço</th>
              </tr>
            </thead>
            <tbody>
              {orderData.map((item, index) => (
                <tr key={index}>
                  <td>{formatDate(item.data)}</td>
                  <td>{item.product}</td>
                  <td>R${item.unit_price}</td>
                  <td>{item.quantity} (und)</td>
                  <td>R${(item.unit_price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="row m-3">
        <div className="col col-md-3 col-lg-2 offset-md-8 d-flex flex-column">

          <button onClick={exportToPDF} className="btn btn-success">
            Exportar PDF
            <i className="fa-solid fa-file-pdf m-2"></i>
          </button>
        </div>

      </div>
    </>
  );
};

export default Orders;
