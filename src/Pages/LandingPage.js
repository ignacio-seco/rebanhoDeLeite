import Carousel from "react-bootstrap/Carousel";
import detalhes from "../assets/Detalhes.png";
import bandeira from "../assets/carrousel1.png";
import simples from "../assets/VisualSimples.png";
import Nav from "react-bootstrap/Nav";
import { Container, Form } from "react-bootstrap";
import { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import api from "../api/api";
import Notification from "../Components/Notification.js";
import { AuthContext } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const { getLoggedInUser } = useContext(AuthContext);
  let navigate = useNavigate();
  let carrouselData = [
    {
      imgSrc: bandeira,
      title: "100% Nacional",
      text: "Aplicativo desenvolvido para auxiliar pequenos pecuaristas do Brasil a ter um melhor controle do rebanho",
    },
    {
      imgSrc: simples,
      title: "Fácil de usar",
      text: "Visual simples, limpo e intuitivo. Fácil de usar. ",
    },
    {
      imgSrc: detalhes,
      title: "Informações detalhadas",
      text: "Guarde informações detalhadas acerca de cada animal de sua propriedade e tenha um histórico da vida de seu animal.",
    },
  ];
  let carrouselComponent = carrouselData.map((element) => {
    return (
      <Carousel.Item key={element.title}>
        <img
          className="d-block w-100"
          src={element.imgSrc}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>{element.title}</h3>
          <p>{element.text}</p>
        </Carousel.Caption>
      </Carousel.Item>
    );
  });
  const [showSignUp, setShowSignUP] = useState(false);
  const [signUpForm, setSignUpForm] = useState({
    nome: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [logInForm, setlogInForm] = useState({
    email: "",
    password: "",
  });

  const handleCloseSignUp = () => {
    const cleanForm = {
      nome: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    setSignUpForm(cleanForm);
    setShowSignUP(false);
  };

  const handleShowSignUp = () => setShowSignUP(true);
  const [showLogin, setShowLogin] = useState(false);
  const handleCloseLogin = () => {
    const cleanForm = {
      email: "",
      password: "",
    };
    setlogInForm(cleanForm);
    setShowLogin(false);
  };
  const handleShowLogin = () => setShowLogin(true);

  const [notification, setNotification] = useState({
    show: false,
    type: "",
    title: "",
    text: "",
    delay: 2000,
  });
  const setNotificationShow = (value) =>
    setNotification({ ...notification, show: value });
  function handleSignUpChange(e) {
    setSignUpForm({ ...signUpForm, [e.target.name]: e.target.value });
  }
  function handleLoginChange(e) {
    setlogInForm({ ...logInForm, [e.target.name]: e.target.value });
  }
  function handleSignUpSubmit(e) {
    e.preventDefault();
    async function register() {
      try {
        if (signUpForm.password !== signUpForm.confirmPassword) {
          setNotification({
            show: true,
            type: "danger",
            title: "Erro",
            text: "A senha informada no campo de confirmação deve ser igual a do campo senha",
            delay: 7000,
          });
        } else if (
          !signUpForm.password ||
          !signUpForm.password.match(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z$*!&@#]{8,}$/
          )
        ) {
          setNotification({
            show: true,
            type: "danger",
            title: "Erro",
            text: "A senha deve conter no mínimo: 8 caracteres; uma letra maisucula; uma letra minúscula; e um número ",
            delay: 7000,
          });
        } else if (
          !signUpForm.email.match(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm)
        ) {
          setNotification({
            show: true,
            type: "danger",
            title: "Erro",
            text: "O e-mail informado não é válido ",
            delay: 7000,
          });
        } else {
          const { nome, email, password } = signUpForm;
          await api.post("/user/signup", { email, nome, password });
          const newToken = await api.post("/user/login", { email, password });
          localStorage.setItem("loggedInUser", JSON.stringify(newToken.data));
          getLoggedInUser();
          navigate("/");
        }
      } catch (err) {
        console.log(err);
        setNotification({
          show: true,
          type: "danger",
          title: "Servidor diz:",
          text: err.response.data.msg,
          delay: 7000,
        });
      }
    }
    register();
  }

  async function handleLoginSubmit(e) {
    try {
      e.preventDefault();
      if (!logInForm.password) {
        setNotification({
          show: true,
          type: "danger",
          title: "Erro",
          text: "É necessário enviar uma senha para fazer login",
          delay: 7000,
        });
      } else if (
        !logInForm.email.match(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm)
      ) {
        setNotification({
          show: true,
          type: "danger",
          title: "Erro",
          text: "O e-mail informado não é válido ",
          delay: 7000,
        });
      } else {
        const { email, password } = logInForm;
        const newToken = await api.post("/user/login", { email, password });
        localStorage.setItem("loggedInUser", JSON.stringify(newToken.data));
        getLoggedInUser();
        navigate("/");
      }
    } catch (err) {
      setNotification({
        show: true,
        type: "danger",
        title: "Servidor diz:",
        text: err.response.data.msg,
        delay: 7000,
      });
    }
  }

  return (
    <div style={{ height: "100vh", backgroundColor: "#f9e9d6" }}>
      <Nav
        as="ul"
        style={{ backgroundColor: "black", color: "white" }}
        className="d-flex align-content-center justify-content-around"
      >
        <Nav.Item as="li">
          <Nav.Link
            style={{ color: "white" }}
            onClick={handleShowSignUp}
          >
            Registrar-se
          </Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link
            style={{ color: "white" }}
            onClick={handleShowLogin}
          >
            Entrar
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Container className="mt-5 d-flex align-content-center justify-content-center">
        <Carousel
          variant="dark"
          style={{ width: "90%" }}
        >
          {carrouselComponent}
        </Carousel>
      </Container>
      <Modal
        show={showSignUp}
        onHide={handleCloseSignUp}
      >
        <Modal.Header closeButton>
          <Modal.Title>Faça seu cadastro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                value={signUpForm.nome}
                name="nome"
                onChange={handleSignUpChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type="email"
                value={signUpForm.email}
                name="email"
                onChange={handleSignUpChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                value={signUpForm.password}
                name="password"
                onChange={handleSignUpChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirmar Senha</Form.Label>
              <Form.Control
                type="password"
                value={signUpForm.confirmPassword}
                name="confirmPassword"
                onChange={handleSignUpChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleCloseSignUp}
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={handleSignUpSubmit}
          >
            Cadastrar
          </Button>
        </Modal.Footer>
      </Modal>

      {
        //modal do login
      }
      <Modal
        show={showLogin}
        onHide={handleCloseLogin}
      >
        <Modal.Header closeButton>
          <Modal.Title>Faça seu cadastro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type="email"
                value={logInForm.email}
                name="email"
                onChange={handleLoginChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                value={logInForm.password}
                name="password"
                onChange={handleLoginChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleCloseSignUp}
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={handleLoginSubmit}
          >
            Entrar
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
    </div>
  );
}

export default LandingPage;
