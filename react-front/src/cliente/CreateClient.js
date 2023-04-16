import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const URI = "http://localhost:8000/clientes/";
const URI2 = "http://localhost:8000/status/";

//Lo que mostrará tras apretar en agregar +
const CompCreateClient = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [clientStatus, setClientStatus] = useState("");

  const [status, setStatus] = useState([]);
  const [len, setLen] = useState();
  const navigate = useNavigate();

  const [bandera, setBandera] = useState(true);

  useEffect(() => {
    getStatus().then((data) => setStatus(data));
    console.log(status);
  }, []);

  const getStatus = async () => {
    const res = await axios.get(URI2);
    return res.data;
  };

  //procedimiento guardar
  const store = async (e) => {
    if (name && address && email && phone && clientStatus) {
      e.preventDefault();
      await axios.post(URI, {
        name: name,
        address: address,
        email: email,
        phone: phone,
        status: clientStatus,
      }); //para enviar los datos al backend
      navigate("/");
    } else {
      setBandera(false);
      e.preventDefault();
      console.log("No hay nombre");
    }
  };
  return (
    <div>
      <h3>Creat POST</h3>
      {status && status.length > 0 ? (
        <form onSubmit={store}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setBandera(true);
              }}
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Dirección</label>
            <input
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                setBandera(true);
              }}
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">E-mail</label>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setBandera(true);
              }}
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Teléfono</label>
            <input
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setBandera(true);
              }}
              type="int"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Status</label>
            <br />

            <select onChange={(e) => setClientStatus(e.target.value)}>
              {status.map((el) => {
                <option value={el.id}>{el.status}</option>;
              })}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Agregar
          </button>
          {bandera == false ? <h2>Debe agregar todos los campos</h2> : <></>}
        </form>
      ) : null}
    </div>
  );
};

export default CompCreateClient;
