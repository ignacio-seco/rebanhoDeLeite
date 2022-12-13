import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import HomeIcon from "../../assets/cow_PNG2139.webp";
import BackIcon from "../../assets/pngfind.com-arrow-png-transparent-162137.png";
import Modal from "react-bootstrap/Modal";
import "./NavigationBar.css";
import { AuthContext } from "../../contexts/authContext";
import api from "../../api/api";

function NavigationBar() {
  let navigate = useNavigate();
  const { user, getData, data } = useContext(AuthContext);

  const [showLogOut, setShowLogOut] = useState(false);
  const handleCloseLogOut = () => setShowLogOut(false);
  const handleShowLogOut = () => setShowLogOut(true);
  const handleSincronizar = async () => {
    try {
      const loggedInUserJson = localStorage.getItem("loggedInUser");
      const parsedLoggedInUser = JSON.parse(loggedInUserJson || '""');
      let id = parsedLoggedInUser.user.uuid;
      //let userData = await user.get(id);
      //console.log(userData)
      const updatedData = await api.put("/sincronizar", data);
      console.log("this is the updated Data", updatedData.data);
      await user.delete(id);
      await getData();
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar
        className="justify-content-around"
        expand="lg"
        sticky="top"
        variant="light"
        bg="light"
      >
        <img
          onClick={() => navigate(-1)}
          className="homePageIcon"
          src={BackIcon}
          alt="return"
        />
        <Button
          variant="danger"
          onClick={handleShowLogOut}
        >
          Encerrar
        </Button>
        <Button
          variant="warning"
          onClick={handleSincronizar}
        >
          Sincronizar dados
        </Button>

        <Link to="/">
          <img
            className="homePageIcon"
            src={HomeIcon}
            alt="Home"
          />
        </Link>
      </Navbar>
      <Modal
        show={showLogOut}
        onHide={handleCloseLogOut}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tem certeza que deseja encerrar?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Qualquer alteração não sincronizada no servidor será perdida!
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleCloseLogOut}
          >
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              localStorage.removeItem("loggedInUser");
              handleCloseLogOut();
              window.location.reload();
            }}
          >
            Encerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default NavigationBar;
