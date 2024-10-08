import { getLastUpdate } from '../helpers/CalculateAge';
import { AuthContext } from '../contexts/authContext';
import { useContext, useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Container,
  Row,
  Table,
  Form,
} from 'react-bootstrap';

export default function CadastrarPastos() {
  const { data, loading, getData, user, setData, setNotification } = useContext(AuthContext);
  const [showBTNDetalhes, setShowBTNDetalhes] = useState(true);
  const [findedData, setFindedData] = useState(false);
  const [newData, setNewData] = useState({ ...data });
  useEffect(() => {
    getData();
  }, []);
  function putNewData() {
      setNewData({ ...data });
      setFindedData(true);
      //console.log(newData);
    }
  //console.log('this is the data', data);
  if (loading) {
    return <h1>Loading</h1>;
  } else {
    
    !findedData && putNewData();
    const renderTable = () => {
      let filteredData = newData.pastos.filter(
        (element) => element !== 'sem pasto definido'
      );
      //console.log(filteredData);
      if (filteredData.length === 0) {
        return (
          <tbody>
            <tr>
              <td
                colSpan={4}
                className="text-center"
              >
                Não existem pastos cadastrados.
              </td>
            </tr>
          </tbody>
        );
      } else
        return (
          <tbody>
            {filteredData.map((elemento, index) => (
              <tr key={index}>
                <td>{filteredData.indexOf(elemento) + 1}</td>
                <td>{elemento}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={async () => {
                      let dataToChange = { ...data };
                      dataToChange.pastos.splice(
                        newData.pastos.indexOf(elemento),
                        1
                      );
                      dataToChange.dadosServidor.lastUpdate = getLastUpdate();
                      setNewData(dataToChange);
                    }}
                  >
                    Excluir
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        );
    };

    return (
      <Container>
        {showBTNDetalhes && (
          <div className="mt-4">
            <Button
              variant="outline-primary"
              onClick={async () => {
                try {
                  setShowBTNDetalhes(!showBTNDetalhes);
                } catch (err) {
                  console.log(err);
                }
              }}
            >
              Apagar pastos
            </Button>
          </div>
        )}
        {!showBTNDetalhes && (
          <div className="mt-4">
            <Button
              variant="success"
              onClick={async () => {
                try {
                  setData(newData);
                  await user.update(data.uuid, data);
                  getData();
                  setNotification({
                  show: true,
        type: 'success',
        title: 'Seu desejo é uma ordem',
        text: 'Pedido atendido!',
        delay: 5000,
                })
                  setFindedData(false);
                  setShowBTNDetalhes(!showBTNDetalhes);
                } catch (err) {
                  console.log(err);
                }
              }}
            >
              Salvar Alterações
            </Button>
            <Button
              className="ms-4"
              variant="danger"
              onClick={() => {
                getData();
                setFindedData(false);
                setShowBTNDetalhes(!showBTNDetalhes);
              }}
            >
              Cancelar
            </Button>
          </div>
        )}

        <Row className="mt-3 gy-2 gx-3">
          <hr />
          <Card.Subtitle>Pastos da propriedade</Card.Subtitle>
          <Col xs={12}>
            <fieldset disabled={showBTNDetalhes}>
              <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th></th>
                  </tr>
                </thead>
                {renderTable()}
              </Table>
            </fieldset>
          </Col>
          <Form
            onSubmit={async (e) => {e.preventDefault();
              try {
                if (e.target[0].value === '') {
                  setNotification({
                  show: true,
        type: 'danger',
        title: 'Erro de valor vazio',
        text: 'Escreva o nome do pasto que deseja cadastrar',
        delay: 5000,
                });
                  
                } else {
                  let dataToChange = { ...data };
                  dataToChange.pastos.push(e.target[0].value);
                  dataToChange.dadosServidor.lastUpdate = getLastUpdate();
                  await user.update(dataToChange.uuid, dataToChange);
                  setData(dataToChange);
                  setNewData(dataToChange);
                  e.target[0].value = '';
                  e.preventDefault();
                }
              } catch (err) {
                setNotification({
                  show: true,
        type: 'danger',
        title: 'Oooooops',
        text: 'Tente outra vez...',
        delay: 5000,
                })
                console.log(err);
              }
            }}
          >
            <Col style={{ width: '80%' }}>
              <Form.Control
                type="text"
                name="Nome do pasto"
                placeholder="Nome do pasto"
              />
            </Col>
            <Col>
              <Button
                variant="success"
                type="submit"
                className="mt-3 "
              >
                Registrar Pasto
              </Button>
            </Col>
          </Form>
        </Row>
      </Container>
    );
  }
}
