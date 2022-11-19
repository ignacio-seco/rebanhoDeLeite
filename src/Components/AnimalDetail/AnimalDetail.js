import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";

function AnimalDetail() {
  const { _id } = useParams();
  const [oneAnimal, setOneAnimal] = useState({});

  async function getOneAnimal() {
    try {
      const response = await axios.get(`/${_id}`);
      setOneAnimal(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  function handleChange(e) {
    setOneAnimal({ ...oneAnimal, [e.target.name]: e.target.value });
    console.log(oneAnimal);
  }

  useEffect(() => {
    getOneAnimal();
  }, []);

  //usei esta formula abaixo para gerar fomulários de forma automática e não ter que criar um a um na mão...
  //acho que deve dar para usar alguns deles depois...
  /*const getTheFormValues = Object.keys(oneAnimal).filter((e, i) => i > 0);
  const makeAform = getTheFormValues.map((e, i) => {
    return `<Form.Group className="mb-3"><Form.Label>${e.toUpperCase()}</Form.Label><Form.Control type="text" defaultValue={oneAnimal.${e}} name="${e}" onChange={handleChange}/></Form.Group>`;
  });*/

  return (
    <Container>
    {
        //{makeAform}
    }
      <Form.Group className="mb-3">
        <Form.Label>IMAGEM_URL</Form.Label>
        <Form.Control
          type="text"
          defaultValue={oneAnimal.imagem_url}
          name="imagem_url"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>BRINCO</Form.Label>
        <Form.Control
          type="text"
          defaultValue={oneAnimal.brinco}
          name="brinco"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>NOME</Form.Label>
        <Form.Control
          type="text"
          defaultValue={oneAnimal.nome}
          name="nome"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>FÊMEA</Form.Label>
        <Form.Control
          type="text"
          defaultValue={oneAnimal.fêmea}
          name="fêmea"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>NASCIMENTO</Form.Label>
        <Form.Control
          type="text"
          defaultValue={oneAnimal.nascimento}
          name="nascimento"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>BRINCODAMÃE</Form.Label>
        <Form.Control
          type="text"
          defaultValue={oneAnimal.brincoDaMãe}
          name="brincoDaMãe"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>CRUZAMENTO</Form.Label>
        <Form.Control
          type="text"
          defaultValue={oneAnimal.cruzamento}
          name="cruzamento"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>PASTO</Form.Label>
        <Form.Control
          type="text"
          defaultValue={oneAnimal.pasto}
          name="pasto"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>ENTRADANOCURRAL</Form.Label>
        <Form.Control
          type="text"
          defaultValue={oneAnimal.entradaNoCurral}
          name="entradaNoCurral"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>NOCURRAL</Form.Label>
        <Form.Control
          type="text"
          defaultValue={oneAnimal.noCurral}
          name="noCurral"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>SAIDADOCURRAL</Form.Label>
        <Form.Control
          type="text"
          defaultValue={oneAnimal.saidaDoCurral}
          name="saidaDoCurral"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>VENDIDA</Form.Label>
        <Form.Control
          type="text"
          defaultValue={oneAnimal.vendida}
          name="vendida"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>DATADAVENDA</Form.Label>
        <Form.Control
          type="text"
          defaultValue={oneAnimal.dataDaVenda}
          name="dataDaVenda"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>MORREU</Form.Label>
        <Form.Control
          type="text"
          defaultValue={oneAnimal.morreu}
          name="morreu"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>DATADAMORTE</Form.Label>
        <Form.Control
          type="text"
          defaultValue={oneAnimal.dataDaMorte}
          name="dataDaMorte"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>PESAGEM</Form.Label>
        <Form.Control
          type="text"
          defaultValue={oneAnimal.pesagem}
          name="pesagem"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>DATADEPESAGEM</Form.Label>
        <Form.Control
          type="text"
          defaultValue={oneAnimal.dataDePesagem}
          name="dataDePesagem"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>HISTORICO</Form.Label>
        <Form.Control
          type="text"
          defaultValue={oneAnimal.historico}
          name="historico"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>DATAHISTORICO</Form.Label>
        <Form.Control
          type="text"
          defaultValue={oneAnimal.dataHistorico}
          name="dataHistorico"
          onChange={handleChange}
        />
      </Form.Group>
    </Container>
  );
}

export default AnimalDetail;
