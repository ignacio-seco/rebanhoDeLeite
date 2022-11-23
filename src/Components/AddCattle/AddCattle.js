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

function AddCattle() {
  const navigate = useNavigate();
  const [newAnimal, setNewAnimal] = useState({
    imagem_url: "https://pngimg.com/uploads/cow/cow_PNG50576.png",
    brinco: "",
    sexo: "",
    dtNascimento: "",
    brincoDaMae: "",
    nome: "",
    comprado: false,
    dtCompra: "",
    valorCompra: "",
    vendedor: "",
    dtCruzamento: "",
    pasto: "",
    dtEntradaCurral: "",
    noCurral: false,
    dtSaidaCurral: "",
    vendida: false,
    dtVenda: "",
    morreu: false,
    dtMorte: "",
    pesagem: [],
    historico: [],
    producaoLeite: [],
  });

  const [radioValue, setRadioValue] = useState("");

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
      comprado: false,
      dtCompra: "",
      valorCompra: "",
      vendedor: "",
      dtCruzamento: "",
      pasto: "",
      dtEntradaCurral: "",
      noCurral: false,
      dtSaidaCurral: "",
      vendida: false,
      dtVenda: "",
      morreu: false,
      dtMorte: "",
      pesagem: [],
      historico: [],
      producaoLeite: [],
    };
    if (
      newAnimal.name !== "" &&
      newAnimal.sexo !== "" &&
      newAnimal.dtNascimento !== ""
    ) {
      axios
        .post("https://ironrest.cyclic.app/cattleControl", newAnimal)
        .then((response) => {
          setNewAnimal(cleanForm);
          setRadioValue("");
          console.log(response);
          navigate(`../gado/${response.data.ops[0]._id}`);
        });
    } else {
      alert(
        `É necessário fornecer um nome, um sexo e uma data de nascimento para cadastrar um novo animal`
      );
      return;
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
    </Container>
  );
}

export default AddCattle;
