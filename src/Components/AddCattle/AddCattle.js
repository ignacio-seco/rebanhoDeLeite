import axios from "axios";
import { useState } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Form,
  Row,
  ToggleButton,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { filterMonths, formatDateToDefault } from "../../helpers/CalculateAge";
import Notification from "../Notification";

function AddCattle() {
  const navigate = useNavigate();
  const [newAnimal, setNewAnimal] = useState({
    imagem_url: "https://pngimg.com/uploads/cow/cow_PNG50576.png",
    brinco: "",
    sexo: "",
    dtNascimento: "",
    brincoDaMae: "",
    nome: "",
    dtCruzamento: "",
    pasto: "",
    noCurral: false,
    estadaCurral: [],
    vendida: false,
    dtVenda: "",
    valorVenda: "",
    comprador: "",
    comprado: false,
    dtCompra: "",
    valorCompra: "",
    vendedor: "",
    morreu: false,
    dtMorte: "",
    causaMorte: "",
    pesagem: [],
    historico: [
      {
        descricao: "Animal registrado no aplicativo",
        dtHistorico: formatDateToDefault(new Date(Date.now())),
      },
    ],
  });

  const [radioValue, setRadioValue] = useState("");
  const [notification, setNotification] = useState({
    show: false,
    type: "",
    title: "",
    text: "",
    delay: 2000
  });
  const setNotificationShow = value => setNotification({ ...notification, show: value  });

  function handleChange(e) {
    setNewAnimal({ ...newAnimal, [e.target.name]: e.target.value });
    console.log(newAnimal);
  }
  function handleSubmit(e) {
    e.preventDefault();
    const cleanForm = {
      imagem_url: "https://pngimg.com/uploads/cow/cow_PNG50576.png",
      brinco: "",
      sexo: "",
      dtNascimento: "",
      brincoDaMae: "",
      nome: "",
      dtCruzamento: "",
      pasto: "",
      noCurral: false,
      estadaCurral: [],
      vendida: false,
      dtVenda: "",
      valorVenda: "",
      comprador: "",
      comprado: false,
      dtCompra: "",
      valorCompra: "",
      vendedor: "",
      morreu: false,
      dtMorte: "",
      causaMorte: "",
      pesagem: [],
      historico: [
        {
          descricao: "Animal registrado no aplicativo",
          dtHistorico: formatDateToDefault(new Date(Date.now())),
        },
      ],
    };
    if (newAnimal.nome && newAnimal.sexo && newAnimal.dtNascimento) {
      axios
        .post("https://ironrest.cyclic.app/cattleControl", newAnimal)
        .then((response) => {
          setNewAnimal(cleanForm);
          setRadioValue("");
          console.log(response);
          navigate(`../gado/${response.data.ops[0]._id}`);
        });
    } else {
      setNotification({
        show: true,
        type: "danger",
        title: "Erro",
        text: "É necessário fornecer um nome, um sexo e uma data de nascimento para cadastrar um novo animal",
        delay: 7000
      });
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Row
          xs={1}
          md={2}
          lg={2}
          xl={2}
        >
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                value={newAnimal.nome}
                name="nome"
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Form.Check
              type="checkbox"
              id="comprado-checkbox"
              size="lg"
              name="comprado"
              className="text-nowrap"
              checked={newAnimal.comprado}
              label={`Animal comprado`}
              onChange={(_) => {
                setNewAnimal((prevState) => ({
                  ...prevState,
                  comprado: !prevState.comprado,
                  dtCompra: !newAnimal.comprado
                    ? formatDateToDefault(new Date(Date.now()))
                    : "",
                  valorCompra: "",
                  vendedor: "",
                }));
                console.log(newAnimal);
              }}
            />
          </Col>
        </Row>
        {newAnimal.comprado && (
          <Row
            xs={1}
            md={3}
            lg={3}
            xl={3}
          >
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Valor da compra (R$)</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  step=".01"
                  value={(
                    Math.round(newAnimal.valorCompra * 100) / 100
                  ).toFixed(2)}
                  name="valorCompra"
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Vendedor</Form.Label>
                <Form.Control
                  type="text"
                  value={newAnimal.vendedor}
                  name="vendedor"
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Data da compra</Form.Label>
                <Form.Control
                  type="date"
                  value={newAnimal.dtCompra}
                  name="dtCompra"
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
        )}
        <ButtonGroup
          className="d-flex justify-content-around align-itens-center"
          name="sexo"
          value={radioValue}
          onChange={handleChange}
        >
          <ToggleButton
            id={`radio-0`}
            type="radio"
            variant={0 % 2 ? "outline-success" : "outline-danger"}
            name="sexo"
            value="MACHO"
            checked={radioValue === "MACHO"}
            onChange={(e) => {
              setRadioValue(e.currentTarget.value);
            }}
          >
            Macho
          </ToggleButton>
          <ToggleButton
            id={`radio-1`}
            type="radio"
            variant={1 % 2 ? "outline-success" : "outline-danger"}
            name="sexo"
            value="FEMEA"
            checked={radioValue === "FEMEA"}
            onChange={(e) => {
              setRadioValue(e.currentTarget.value);
            }}
          >
            Fêmea
          </ToggleButton>
        </ButtonGroup>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Nascimento</Form.Label>
              <Form.Control
                type="date"
                value={newAnimal.dtNascimento}
                name="dtNascimento"
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Meses de vida</Form.Label>
              <Form.Control
                type="number"
                value={
                  newAnimal.dtNascimento
                    ? filterMonths(newAnimal.dtNascimento)
                    : ""
                }
                onChange={(e) => {
                  let now = new Date(Date.now());
                  let Monthdif = now.getMonth() - e.target.value;
                  let newDate = now.setMonth(Monthdif);
                  let formatedDate = formatDateToDefault(newDate);
                  setNewAnimal({ ...newAnimal, dtNascimento: formatedDate });
                  console.log(newAnimal);
                }}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3 ">
              <Form.Label>Brinco (opcional)</Form.Label>
              <Form.Control
                type="number"
                value={newAnimal.brinco}
                name="brinco"
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Brinco da mãe (opcional)</Form.Label>
              <Form.Control
                type="number"
                value={newAnimal.brincoDaMae}
                name="brincoDaMae"
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button
          variant="primary"
          type="submit"
          onClick={handleSubmit}
        >
          Cadastrar Animal
        </Button>
      </Form>
      <Notification show={notification.show}
                    setShow={setNotificationShow}
                    type={notification.type}
                    title={notification.title}
                    delay={notification.delay}
                    text={notification.text}/>
    </Container>
  );
}

export default AddCattle;
