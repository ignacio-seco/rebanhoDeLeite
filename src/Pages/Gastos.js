import {
  formatDate,
  formatDateToDefault,
  getLastUpdate,
} from "../helpers/CalculateAge";
import { AuthContext } from "../contexts/authContext";
import { useContext, useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Row,
  Table,
  Form,
} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import gastoSchema from "../Models/gastos.models";
import { v4 } from "uuid";

export default function Gastos() {
  const { data, loading, getData, user, setData } = useContext(AuthContext);
  const [showBTNDetalhes, setShowBTNDetalhes] = useState(true);
  const [findedData, setFindedData] = useState(false);
  const [newData, setNewData] = useState({ ...data });
  const [showModal, setShowModal] = useState(false);
  const [financasForm, setFinancasForm] = useState({ ...gastoSchema });
  const [dateMin, setDateMin] = useState(formatDateToDefault(new Date(0)));
  const [dateMax, setDateMax] = useState(
    formatDateToDefault(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000))
  );

  const handleCloseModal = () => {
    setFinancasForm({ ...gastoSchema });
    setShowModal(false);
  };
  function handleFinancasChange(e) {
    setFinancasForm({ ...financasForm, [e.target.name]: e.target.value });
  }
  useEffect(() => {
    getData();
  }, []);
  console.log("this is the data", data);
  if (loading) {
    return <h1>Loading</h1>;
  } else {
    function putNewData() {
      setNewData({ ...data });
      setFindedData(true);
      console.log(newData);
    }
    !findedData && putNewData();

    const filterData = () => {
      return newData.gastos
        .filter(
          (element) =>
            !element.dadosServidor.deletado &&
            new Date(element.dtGasto).getTime() >
              new Date(dateMin).getTime() - 24 * 60 * 60 * 1000 &&
            new Date(element.dtGasto).getTime() <
              new Date(dateMax).getTime() + 24 * 60 * 60 * 1000
        )
        .sort(
          (a, b) =>
            new Date(b.dtGasto).getTime() - new Date(a.dtGasto).getTime()
        );
    };
    const renderGanhosTable = () => {
      let filteredData = filterData();
      if (filteredData.length === 0) {
        return (
          <tbody>
            <tr>
              <td
                colSpan={4}
                className="text-center"
              >
                Não existem gastos cadastrados.
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
                <td>{formatDate(elemento.dtGasto)}</td>
                <td>R$ {(elemento.valor * -1).toLocaleString("pt-BR")}</td>
                <td>{elemento.descricao}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      let index = data.gastos.findIndex(
                        (gastos) => gastos.uuid === elemento.uuid
                      );
                      console.log(index);
                      let dataToChange = { ...data };
                      dataToChange.gastos[index].dadosServidor.deletado = true;
                      dataToChange.gastos[index].dadosServidor.lastUpdate =
                        getLastUpdate();
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
    const calculateTotal = () => {
      let filteredData = filterData();
      let result = 0;
      filteredData.forEach((element) => {
        result = result + Number(element.valor);
      });
      return result * -1;
    };

    const handleFinancasSubmit = async () => {
      try {
        if (
          financasForm.dtGasto &&
          financasForm.valor &&
          financasForm.descricao
        ) {
          let changeData = { ...financasForm };
          changeData.valor = (changeData.valor * -1).toFixed(2);
          console.log("formulario a ser adicionado", changeData);
          let dataToAdd = {
            ...data,
            dadosServidor: {
              ...data.dadosServidor,
              lastUpdate: getLastUpdate(),
            },
            gastos: [...data.gastos, changeData],
          };
          await user.update(dataToAdd.uuid, dataToAdd);
          setFinancasForm({ ...gastoSchema });
          handleCloseModal();
          getData();
          setFindedData(false);
        } else {
          alert(
            "É necessário preecher todos os campos para cadastrar um novo gasto"
          );
        }
      } catch (err) {
        console.log(err);
      }
    };

    return (
      <div>
        <Container
          className="mt-4 sticky-top"
          style={{ backgroundColor: "white" }}
        >
          <Container>
            <Row>
              <Button
                variant="outline-danger"
                onClick={() => {
                  setShowModal(true);
                  setFinancasForm({
                    ...financasForm,
                    dtGasto: formatDateToDefault(new Date(Date.now())),
                    uuid: v4(),
                    creator: data._id,
                    dadosServidor: {
                      ...financasForm.dadosServidor,
                      lastUpdate: getLastUpdate(),
                    },
                  });
                }}
              >
                Cadastrar novo{" "}
                <span style={{ color: "purple", fontWeight: "700" }}>
                  gasto
                </span>
              </Button>
            </Row>
          </Container>
        </Container>
        <Container>
          <Container>
            <h2 style={{ textAlign: "center" }}>Filtrar período</h2>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Periodo inicial</Form.Label>
                  <Form.Control
                    type="date"
                    value={dateMin}
                    onChange={(e) => setDateMin(e.currentTarget.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Período final</Form.Label>
                  <Form.Control
                    type="date"
                    value={dateMax}
                    onChange={(e) => setDateMax(e.currentTarget.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Container>
          {showBTNDetalhes && (
            <div
              className="mt-4 sticky-top"
              style={{ top: "2.4em", backgroundColor: "white" }}
            >
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
                Editar lançamentos
              </Button>
            </div>
          )}
          {!showBTNDetalhes && (
            <div
              className="mt-4 sticky-top"
              style={{ top: "2.4em", backgroundColor: "white" }}
            >
              <Button
                variant="success"
                onClick={async () => {
                  try {
                    console.log(newData);
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
            <Card.Subtitle className="text-center" style={{fontSize:"2em"}}>Custos da propriedade</Card.Subtitle>
            <Col xs={12}>
              <fieldset disabled={showBTNDetalhes}>
                <Table
                  striped
                  bordered
                  hover
                >
                  <thead
                    className="sticky-top"
                    style={{ top: "5em", backgroundColor: "white" }}
                  >
                    <tr>
                      <th>#</th>
                      <th>Data</th>
                      <th>Valor</th>
                      <th>Descrição</th>
                      <th></th>
                    </tr>
                  </thead>
                  {renderGanhosTable()}
                  <tfoot>
                    <tr>
                      <td></td>
                      <th scope="row">Total:</th>
                      <td>R$ {calculateTotal().toLocaleString("pt-BR")}</td>
                    </tr>
                  </tfoot>
                </Table>
              </fieldset>
            </Col>
          </Row>
        </Container>
        <Modal
          show={showModal}
          onHide={handleCloseModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Registrar um gasto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Data</Form.Label>
                <Form.Control
                  type="date"
                  value={financasForm.dtGasto}
                  name="dtGasto"
                  onChange={handleFinancasChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Valor</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  value={financasForm.valor}
                  name="valor"
                  onChange={handleFinancasChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  type="text"
                  value={financasForm.descricao}
                  name="descricao"
                  onChange={handleFinancasChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={handleCloseModal}
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={handleFinancasSubmit}
            >
              Cadastrar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
