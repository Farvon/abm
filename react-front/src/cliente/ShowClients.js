import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const URI = "http://localhost:8000/clientes";
const URI2 = "http://localhost:8000/status";

//useState devuelve un valor con estado y una funcion para actualizarlo
//useEffect utiliza efecto que no controla
const CompShowClients = () => {
  const [clients, setClient] = useState([]);
  const [status, setStatus] = useState([]);

  useEffect(() => {
    getClients();
    getStatus();
  }, []);

  //procedimiento para mostrar todos los clientes
  //nos conectamos con el backend por axios, le pasamos la URI
  const getClients = async () => {
    const res = await axios.get(URI);
    setClient(res.data);
  };

  const getStatus = async () => {
    const res = await axios.get(URI2);
    setStatus(res.data);
  };

  const getStatusId = (id) => {
    const estado = status.filter((el) => el.id === id);
    return estado[0].status;
  };

  //procedimiento para eliminar un blog
  const deleteClient = async (id) => {
    await axios.delete(`${URI}/${id}`);
    getClients();
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <table className="table">
            <thead className="table-primary">
              <tr>
                <th>Nombre</th>
                <th>Dirección</th>
                <th>E-mail</th>
                <th>Teléfono</th>
                <th>Status</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clients && status
                ? clients.map((cliente) => (
                    <tr key={cliente.id}>
                      <td> {cliente.name}</td>
                      <td> {cliente.address}</td>
                      <td> {cliente.email}</td>
                      <td> {cliente.phone}</td>
                      <td> {getStatusId(cliente.status)}</td>
                      <td>
                        <Link
                          to={`/edit/${cliente.id}`}
                          className="btn btn-info"
                        >
                          <i className="fa-regular fa-pen-to-square"></i>
                        </Link>
                        <button
                          onClick={() => deleteClient(cliente.id)}
                          className="btn btn-danger"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
          <Link to="/create" className="btn btn-primary mt-2 mb-2">
            <button type="submit" className="btn btn-primary">
              Nuevo Cliente
            </button>
          </Link>
          <Link to="/showStatus" className="btn btn-secondary mt-2 mb-2">
            <button type="submit" className="btn btn-secondary">
              Lista de Estados
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CompShowClients;
