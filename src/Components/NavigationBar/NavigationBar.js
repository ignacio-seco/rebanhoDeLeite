import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import HomeIcon from "../../assets/cow_PNG2139.webp";
import BackIcon from "../../assets/pngfind.com-arrow-png-transparent-162137.png";
import Modal from "react-bootstrap/Modal";
import "./NavigationBar.css";
import Notification from "../Notification";
import { AuthContext } from "../../contexts/authContext";
import api from "../../api/api";

function NavigationBar() {
  let navigate = useNavigate();
  const { user, getData, data, syncLoading, setSyncLoading } =
    useContext(AuthContext);

  const [notification, setNotification] = useState({
    show: false,
    type: "",
    title: "",
    text: "",
    delay: 2000,
  });
  const setNotificationShow = (value) =>
    setNotification({ ...notification, show: value });

  const [showLogOut, setShowLogOut] = useState(false);
  const handleCloseLogOut = () => setShowLogOut(false);
  const handleShowLogOut = () => setShowLogOut(true);
  const handleSincronizar = async () => {
    setSyncLoading(true);
    try {
      setNotification({
        show: true,
        type: "secondary",
        title: "Sincronizando",
        text: "Aguarde. Sincronizando seus dados agora!",
        delay: 2000,
      });
      const loggedInUserJson = localStorage.getItem("loggedInUser");
      const parsedLoggedInUser = JSON.parse(loggedInUserJson || '""');
      let id = parsedLoggedInUser.user.uuid;
      //let userData = await user.get(id);
      //console.log(userData)
      const updatedData = await api.put("/sincronizar", data);
      console.log("this is the updated Data", updatedData.data);
      await user.delete(id);
      console.log("the user data was deleted");
      await getData();
      setSyncLoading(false);
      setNotification({
        show: true,
        type: "success",
        title: "Dados Sincronizados",
        text: "Dados sincronizados com sucesso!",
        delay: 7000,
      });
      //window.location.reload();
    } catch (err) {
      setNotification({
        show: true,
        type: "danger",
        title: "Sincronização falhou",
        text: "Parece que você - ou nossos servidores - está offline ",
        delay: 10000,
      });
      setSyncLoading(false);
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
          variant="outline-danger"
          onClick={handleShowLogOut}
        >
          Encerrar
        </Button>
        {navigator.onLine && !syncLoading && (
          <Button
            variant="dark"
            onClick={handleSincronizar}
          >
            Sincronizar dados
          </Button>
        )}
        {syncLoading && (
          <Button
            variant="success"
          >
            Sincronizando
          </Button>
        )}

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
          So será possível retornar a sua conta quando estiver online!
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
      <Notification
        show={notification.show}
        setShow={setNotificationShow}
        type={notification.type}
        title={notification.title}
        delay={notification.delay}
        text={notification.text}
      />
    </>
  );
}
export default NavigationBar;
