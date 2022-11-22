import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container } from "react-bootstrap";

function AnimalDetail() {
  const { _id } = useParams();
  const [oneAnimal, setOneAnimal] = useState({});
  const navigate = useNavigate();

  async function getOneAnimal() {
    try {
      const response = await axios.get(
        `https://ironrest.cyclic.app/cattleControl/${_id}`
      );
      setOneAnimal(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getOneAnimal();
  }, []);

  function handleChange(e) {
    setOneAnimal({ ...oneAnimal, [e.target.name]: e.target.value });
    console.log(oneAnimal);
  }

  async function handleDelete(e) {
    e.preventDefault();
    await axios.delete(`https://ironrest.cyclic.app/cattleControl/${_id}`);
    navigate(-1);
  }

  //Hani, pode apagar o código commitado se quiser, só usei ele para gerar o código dos campos de formulários de forma automatizada.
  // Também precisei de adiantar um botão de deletar animal para poder mexer melhor no formulário de incluir animais... Mas pode deletar tudo e fazer como achar melhor
  /*const getTheFormValues = Object.keys(oneAnimal).filter((e, i) => i > 0);
  const makeAform = getTheFormValues.map((e) => {
    return `<Form.Group className="mb-3"><Form.Label>${e.toUpperCase()}</Form.Label><Form.Control type="text" defaultValue={oneAnimal.${e}} name="${e}" onChange={handleChange}/></Form.Group>`;
  });*/

  return (
    <Container>
      {
        //{makeAform}
      }
      <Button
        variant="danger"
        onClick={handleDelete}
      >
        Deletar animal
      </Button>
    </Container>
  );
}

export default AnimalDetail;
