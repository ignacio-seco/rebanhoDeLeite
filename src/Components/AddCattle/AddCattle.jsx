import { useContext, useState } from 'react';
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Form,
  Row,
  ToggleButton,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { filterMonths, formatDateToDefault } from '../../helpers/CalculateAge';
import { animalSchema } from '../../Models/animalModels';
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from '../../contexts/authContext';

function AddCattle() {
  const navigate = useNavigate();
  const { data, getData, user, setNotification } = useContext(AuthContext);
  let property = data;
  let getCattle = getData;
  const [newAnimal, setNewAnimal] = useState({ ...animalSchema });

  const [radioValue, setRadioValue] = useState('');

  function handleChange(e) {
    setNewAnimal({ ...newAnimal, [e.target.name]: e.target.value });
    console.log(newAnimal);
  }
  function handleSubmit(e) {
    e.preventDefault();
    const cleanForm = { ...animalSchema };
    async function updating() {
      try {
        if (newAnimal.nome && newAnimal.sexo && newAnimal.dtNascimento) {
          await getCattle();
          let animalUuid = {
            ...newAnimal,
            uuid: uuidv4(),
            creator: property._id,
            dadosServidor: {
              ...newAnimal.dadosServidor,
              lastUpdate: new Date(Date.now()).getTime(),
            },
          };
          let newUuid = animalUuid.uuid;
          await user.update(property.uuid, {
            ...property,
            rebanho: [...property.rebanho, animalUuid],
          });
          setNewAnimal(cleanForm);
          setRadioValue('');
          await getCattle();
          console.log(property);
          navigate(`/gado/${newUuid}`);
        } else {
          setNotification({
            show: true,
            type: 'danger',
            title: 'Erro',
            text: 'É necessário fornecer um nome, um sexo e uma data de nascimento para cadastrar um novo animal',
            delay: 7000,
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
    updating();
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
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Form.Check
              type="switch"
              className="mb-4 text-nowrap"
              id="comprado-checkbox"
              size="lg"
              name="comprado"
              checked={newAnimal.dadosCompra.comprado}
              label={`Animal comprado`}
              onChange={(_) => {
                setNewAnimal((prevState) => ({
                  ...prevState,
                  dadosCompra: {
                    ...prevState.dadosCompra,
                    comprado: !prevState.dadosCompra.comprado,
                    dtCompra: !newAnimal.dadosCompra.comprado
                      ? formatDateToDefault(new Date(Date.now()))
                      : '',
                    valorCompra: '',
                    vendedor: '',
                  },
                }));
                console.log(newAnimal);
              }}
            />
          </Col>
        </Row>
        {newAnimal.dadosCompra.comprado && (
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
                    Math.round(newAnimal.dadosCompra.valorCompra * 100) / 100
                  ).toFixed(2)}
                  name="valorCompra"
                  onChange={(e) => {
                setNewAnimal((prevState) => ({
                  ...prevState,
                  dadosCompra: {
                    ...prevState.dadosCompra,
                    [e.target.name]: e.target.value,
                  },
                }));
                console.log(newAnimal);
              }}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Vendedor</Form.Label>
                <Form.Control
                  type="text"
                  value={newAnimal.dadosCompra.vendedor}
                  name="vendedor"
                  onChange={(e) => {
                setNewAnimal((prevState) => ({
                  ...prevState,
                  dadosCompra: {
                    ...prevState.dadosCompra,
                    [e.target.name]: e.target.value,
                  },
                }));
                console.log(newAnimal);
              }}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Data da compra</Form.Label>
                <Form.Control
                  type="date"
                  value={newAnimal.dadosCompra.dtCompra}
                  name="dtCompra"
                  onChange={(e) => {
                setNewAnimal((prevState) => ({
                  ...prevState,
                  dadosCompra: {
                    ...prevState.dadosCompra,
                    [e.target.name]: e.target.value,
                  },
                }));
                console.log(newAnimal);
              }}
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
            variant={'outline-danger'}
            name="sexo"
            value="MACHO"
            checked={radioValue === 'MACHO'}
            onChange={(e) => {
              setRadioValue(e.currentTarget.value);
            }}
          >
            Macho
          </ToggleButton>
          <ToggleButton
            id={`radio-1`}
            type="radio"
            variant={'outline-success'}
            name="sexo"
            value="FEMEA"
            checked={radioValue === 'FEMEA'}
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
                    : ''
                }
                onChange={(e) => {
                  let now = new Date(Date.now() - 24 * 60 * 60 * 1000);
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
                type="text"
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
