import {
  Button,
  Col,
  Container,
  Figure,
  Form,
  Image,
  Row,
} from "react-bootstrap";
import "./LandingPage.css";
import Card from "react-bootstrap/Card";
import feature1Rebanho from "../assets/AllCattlePhoto.jpg";
import feature3NewAnimal from "../assets/newAnimal.jpg";
import feature4Relatorios from "../assets/relatorio.jpg";
import feature5Monitoramento from "../assets/monitoramento.jpeg";
import cow from "../assets/cow.png";
import Modal from "react-bootstrap/Modal";
import Notification from "../Components/Notification";
import api from "../api/api";
import { AuthContext } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

export default function LandingPage2(props) {
  const { getLoggedInUser, setNotification } = useContext(AuthContext);
  let navigate = useNavigate();

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
          text: err.response.data.errorMessage,
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
        text: err.response.data.errorMessage,
        delay: 7000,
      });
    }
  }

  const features = [
    {
      img: feature1Rebanho,
      title: "Rebanho",
      description: "Tenha uma visão abrangente e detalhada do seu rebanho",
    },
    {
      img: feature3NewAnimal,
      title: "Seu gado",
      description: "Cadastre e edite as informações de cada animal",
    },
    {
      img: feature4Relatorios,
      title: "Relatórios",
      description: "Visualize relatórios sobre o seu rebanho",
    },
    {
      img: feature5Monitoramento,
      title: "Monitoramentos",
      description: "Monitore as últimas atualizações do seu rebanho",
    },
  ];

  return (
    <>
      <section className="hero-section pt-4">
        <Container className="bg-transparent">
          <Row className="justify-content-center">
            <Col
              md={7}
              className="align-self-center"
            >
              <Card className="bg-transparent border-0 text-white">
                <Card.Body>
                  <Card.Title>
                    <h1 className="fw-bold display-4">
                      O seu rebanho na palma da mão
                    </h1>
                  </Card.Title>
                  <Card.Text>
                    <span style={{ textAlign: "justify" }}>
                      Aplicativo desenvolvido para auxiliar pequenos pecuaristas
                      do Brasil a ter um melhor controle do rebanho
                    </span>
                  </Card.Text>
                  <Button
                    variant="success"
                    className="me-3"
                    onClick={handleShowLogin}
                  >
                    Entrar
                  </Button>
                  <Button
                    variant="outline-success"
                    className="btn-criar-conta"
                    onClick={handleShowSignUp}
                  >
                    Criar conta
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col
              sm={2}
              md={5}
              lg={4}
              className="d-none d-md-block"
            >
              <Image
                src={cow}
                style={{ maxWidth: 336, width: "100%" }}
              />
            </Col>
          </Row>
        </Container>
      </section>
      <section className="features-section py-5">
        <Container>
          <h2 className="display-6 text-center text-white fw-bold my-3">
            Principais recursos
          </h2>
          <hr />
        </Container>
        <Container>
          <Row className="justify-content-center gx-3">
            {features.map((feature, index) => (
              <Col
                xs={12}
                md={6}
                lg={4}
                key={index}
                style={{ color: "white" }}
              >
                <Card className="border-0 bg-transparent">
                  <Card.Body>
                    <Figure>
                      <Figure.Image src={feature.img} />
                    </Figure>
                    <Card.Title>{feature.title}</Card.Title>
                    <Card.Text>{feature.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      <section className="inspirational-section py-5">
        <Container>
          <p className="blockquote text-center">
            Aplicativo desenvolvido para auxiliar pequenos pecuaristas do Brasil
            a ter um melhor controle do rebanho.
          </p>
        </Container>
      </section>

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
      <Modal
        show={showLogin}
        onHide={handleCloseLogin}
      >
        <Modal.Header closeButton>
          <Modal.Title>Faça seu login!</Modal.Title>
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
    </>
  );
}
