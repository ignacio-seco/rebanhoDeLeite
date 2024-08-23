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

export default function CadastrarLotes() {
  const { data, loading, getData, user, setData } = useContext(AuthContext);
  const [showBTNDetalhes, setShowBTNDetalhes] = useState(true);
  const [findedData, setFindedData] = useState(false);
  const [newData, setNewData] = useState({ ...data });
  useEffect(() => {
    getData();
  }, []);
  //console.log('this is the data', data);
  function putNewData() {
    setNewData({ ...data });
    setFindedData(true);
    //console.log(newData);
  }
  if (loading) {
    return <h1>Loading</h1>;
  } else {
    !findedData && putNewData();
    const renderTable = () => {
      let filteredData = newData.lotes.filter(
        (element) => element !== 'sem lote definido'
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
                Não existem lotes de venda cadastrados.
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
                      dataToChange.lotes.splice(
                        newData.lotes.indexOf(elemento),
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
              Apagar lotes
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
          <Card.Subtitle>Lotes de animais para venda</Card.Subtitle>
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
            onSubmit={async (e) => {
              try {
                if (e.target[0].value === '') {
                  alert('Dê um nome ao lote de animais para venda');
                  e.preventDefault();
                } else {
                  let dataToChange = { ...data };
                  dataToChange.lotes.push(e.target[0].value);
                  dataToChange.dadosServidor.lastUpdate = getLastUpdate();
                  await user.update(dataToChange.uuid, dataToChange);
                  setData(dataToChange);
                  setNewData(dataToChange);
                  e.target[0].value = '';
                  e.preventDefault();
                }
              } catch (err) {
                console.log(err);
              }
            }}
          >
            <Col style={{ width: '80%' }}>
              <Form.Control
                type="text"
                name="Nome do lote para venda"
                placeholder="Nome do lote para venda"
              />
            </Col>
            <Col>
              <Button
                variant="success"
                type="submit"
                className="mt-3 "
              >
                Registrar lote
              </Button>
            </Col>
          </Form>
        </Row>
      </Container>
    );
  }
}
