import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/cow-cartoon.png'
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../contexts/authContext";
import api from "../api/api";
import {useContext, useState} from "react";
import "./NavBar.css"
import BackIcon from "../assets/pngfind.com-arrow-png-transparent-162137.png";
import {Button} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Notification from "./Notification";

function MainNavBar() {

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
            window.location.reload();
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
            <Navbar bg="dark" variant="dark" sticky="top">
                <Container>
                    <Navbar.Brand href="#home" className="me-auto">
                        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                            <img
                                alt=""
                                src={ logo }
                                width="30"
                                height="30"
                                className="d-none d-sm-inline-block align-top"
                            />{' '}
                            <span className="app-name d-none d-sm-inline-block">V.A.C.A</span>
                        </Link>
                    </Navbar.Brand>
                    <img
                        onClick={() => navigate(-1)}
                        className="homePageIcon d-inline-block d-sm-none me-auto"
                        src={BackIcon}
                        alt="return"
                    />
                    <Button
                        variant="outline-light"
                        onClick={handleSincronizar}
                    >
                        Sincronizar
                    </Button>
                    <Button
                        variant="outline-danger"
                        className="ms-auto"
                        onClick={handleShowLogOut}
                    >
                        Encerrar
                    </Button>
                </Container>
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

export default MainNavBar;