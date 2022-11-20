import axios from "axios";
import { useState } from "react";
import {
  Button,
  ButtonGroup,
  Container,
  Form,
  ToggleButton,
} from "react-bootstrap";

function AddCattle() {
  const [newAnimal, setNewAnimal] = useState({
    imagem_url: "https://pngimg.com/uploads/cow/cow_PNG50576.png",
    brinco: "",
    sexo: "",
    nascimento: "",
    brincoDaMãe: "",
    nome: "",
    cruzamento: "",
    pasto: "",
    entradaNoCurral: "",
    noCurral: false,
    saidaDoCurral: "",
    vendida: false,
    dataDaVenda: "",
    morreu: false,
    dataDaMorte: "",
    pesagem: [],
    dataDePesagem: [],
    historico: [],
    dataHistorico: [],
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
      nascimento: "",
      brincoDaMãe: "",
      nome: "",
      cruzamento: "",
      pasto: "",
      entradaNoCurral: "",
      noCurral: false,
      saidaDoCurral: "",
      vendida: false,
      dataDaVenda: "",
      morreu: false,
      dataDaMorte: "",
      pesagem: [],
      dataDePesagem: [],
      historico: [],
      dataHistorico: [],
    };
    if (
      newAnimal.name !== "" &&
      newAnimal.sexo !== "" &&
      newAnimal.nascimento !== ""
    ) {
      axios
        .post("https://ironrest.cyclic.app/cattleControl", newAnimal)
        .then((response) => {
          setNewAnimal(cleanForm);
          setRadioValue("");
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
        <Form.Group className="mb-3">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            value={newAnimal.nome}
            name="nome"
            onChange={handleChange}
          />
        </Form.Group>
        <ButtonGroup
          name="sexo"
          value={radioValue}
          onChange={handleChange}
        >
          <ToggleButton
            id={`radio-0`}
            type="radio"
            variant={0 % 2 ? "outline-success" : "outline-danger"}
            name="sexo"
            value="macho"
            checked={radioValue === "macho"}
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
            value="femea"
            checked={radioValue === "femea"}
            onChange={(e) => {
              setRadioValue(e.currentTarget.value);
            }}
          >
            Fêmea
          </ToggleButton>
        </ButtonGroup>
        <Form.Group className="mb-3">
          <Form.Label>Nascimento</Form.Label>
          <Form.Control
            type="date"
            value={newAnimal.nascimento}
            name="nascimento"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Brinco (opcional)</Form.Label>
          <Form.Control
            type="number"
            value={newAnimal.brinco}
            name="brinco"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Brinco da mãe (opcional)</Form.Label>
          <Form.Control
            type="number"
            value={newAnimal.brincoDaMãe}
            name="brincoDaMãe"
            onChange={handleChange}
          />
        </Form.Group>
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
