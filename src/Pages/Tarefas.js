//todo
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
import { v4 } from "uuid";
import unchecked from "../assets/checkBlack.png";
import checked from "../assets/icons8-check-64.png";
import urgente from "../assets/urgente.png";
import naoUrgente from "../assets/naourgente.png";
import tarefaSchema from "../Models/tarefa.models";
import Modal from "react-bootstrap/Modal";
import searchIcon from "../assets/search.png";

export default function Tarefas() {
  const { data, loading, getData, user, setData } = useContext(AuthContext);
  const [showBTNDetalhes, setShowBTNDetalhes] = useState(true);
  const [findedData, setFindedData] = useState(false);
  const [newData, setNewData] = useState({ ...data });
  const [showModal, setShowModal] = useState(false);
  const [tarefasForm, setTarefasForm] = useState({ ...tarefaSchema });
  let [search, setSearch] = useState("");

  function handleTarefasChange(e) {
    setTarefasForm({ ...tarefasForm, [e.target.name]: e.target.value });
  }
  const handleCloseModal = () => {
    setTarefasForm({ ...tarefaSchema });
    setShowModal(false);
  };
  useEffect(() => {
    getData();
  }, []);
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
      return newData.tarefas
        .filter(
          (element) =>
            !element.dadosServidor.deletado &&
            element.descricao.indexOf(search) !== -1
        )
        .sort(
          (a, b) =>
            new Date(b.dtCriacao).getTime() - new Date(a.dtCriacao).getTime()
        );
    };

    const renderTarefasTable = () => {
      let filteredData = filterData();
      const todasAsTarefas = filteredData.filter(
        (element) => !element.concluida
      );
      if (todasAsTarefas.length === 0) {
        return (
          <tbody>
            <tr>
              <td
                colSpan={4}
                className="text-center"
              >
                Não existem tarefas cadastradas.
              </td>
            </tr>
          </tbody>
        );
      } else {
        return (
          <tbody>
            {todasAsTarefas.map((elemento, index) => (
              <tr key={index}>
                <td>{filteredData.indexOf(elemento) + 1}</td>
                <td>{formatDate(elemento.dtCriacao)}</td>
                <td>{elemento.descricao}</td>
                <td>
                  <fieldset disabled={showBTNDetalhes}>
                    <img
                      src={elemento.urgente ? urgente : naoUrgente}
                      alt="check"
                      className="w-auto"
                      onClick={() => {
                        if (!showBTNDetalhes) {
                          let index = data.tarefas.findIndex(
                            (tarefas) => tarefas.uuid === elemento.uuid
                          );
                          console.log(index);
                          let dataToChange = { ...data };
                          dataToChange.tarefas[index].urgente =
                            !dataToChange.tarefas[index].urgente;
                          dataToChange.tarefas[index].dadosServidor.lastUpdate =
                            getLastUpdate();
                          setNewData(dataToChange);
                        } else {
                          return;
                        }
                      }}
                    />
                  </fieldset>
                </td>
                <td>
                  <fieldset disabled={!showBTNDetalhes}>
                    <img
                      src={elemento.concluida ? checked : unchecked}
                      alt="check"
                      className="w-auto"
                      onClick={async () => {
                        if (showBTNDetalhes) {
                          try {
                            let index = data.tarefas.findIndex(
                              (tarefas) => tarefas.uuid === elemento.uuid
                            );
                            console.log("this is the index", index);
                            let dataToChange = {
                              ...data,
                              dadosServidor: {
                                ...data.dadosServidor,
                                lastUpdate: getLastUpdate(),
                              },
                            };
                            dataToChange.tarefas[index].concluida =
                              !dataToChange.tarefas[index].concluida;
                            dataToChange.tarefas[
                              index
                            ].dadosServidor.lastUpdate = getLastUpdate();
                            setData(dataToChange);
                            setNewData(dataToChange);
                            await user.update(data.uuid, dataToChange);
                          } catch (err) {
                            console.log(err);
                          }
                        }
                      }}
                    />
                  </fieldset>
                </td>
                <td>
                  <fieldset disabled={showBTNDetalhes}>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        let index = data.tarefas.findIndex(
                          (tarefas) => tarefas.uuid === elemento.uuid
                        );
                        console.log(index);
                        let dataToChange = { ...data };
                        dataToChange.tarefas[
                          index
                        ].dadosServidor.deletado = true;
                        dataToChange.tarefas[index].dadosServidor.lastUpdate =
                          getLastUpdate();
                        setNewData(dataToChange);
                      }}
                    >
                      Excluir
                    </Button>
                  </fieldset>
                </td>
              </tr>
            ))}
          </tbody>
        );
      }
    };

    const renderTarefasConcluidasTable = () => {
      let filteredData = filterData();
      const todasAsTarefas = filteredData.filter(
        (element) => element.concluida
      );
      if (todasAsTarefas.length === 0) {
        return (
          <tbody>
            <tr>
              <td
                colSpan={4}
                className="text-center"
              >
                Não existem tarefas concluídas para exibir.
              </td>
            </tr>
          </tbody>
        );
      } else {
        return (
          <tbody>
            {todasAsTarefas.map((elemento, index) => (
              <tr key={index}>
                <td>{filteredData.indexOf(elemento) + 1}</td>
                <td>{formatDate(elemento.dtCriacao)}</td>
                <td>{elemento.descricao}</td>
                <td>
                  <fieldset disabled={showBTNDetalhes}>
                    <img
                      src={elemento.urgente ? urgente : naoUrgente}
                      alt="check"
                      className="w-auto"
                      onClick={() => {
                        if (!showBTNDetalhes) {
                          let index = data.tarefas.findIndex(
                            (tarefas) => tarefas.uuid === elemento.uuid
                          );
                          console.log(index);
                          let dataToChange = { ...data };
                          dataToChange.tarefas[index].urgente =
                            !dataToChange.tarefas[index].urgente;
                          dataToChange.tarefas[index].dadosServidor.lastUpdate =
                            getLastUpdate();
                          setNewData(dataToChange);
                        } else {
                          return;
                        }
                      }}
                    />
                  </fieldset>
                </td>
                <td>
                  <fieldset disabled={!showBTNDetalhes}>
                    <img
                      src={elemento.concluida ? checked : unchecked}
                      alt="check"
                      className="w-auto"
                      onClick={async () => {
                        if (!showBTNDetalhes) {
                          let index = data.tarefas.findIndex(
                            (tarefas) => tarefas.uuid === elemento.uuid
                          );
                          console.log("this is the index", index);
                          let dataToChange = {
                            ...data,
                            dadosServidor: {
                              ...data.dadosServidor,
                              lastUpdate: getLastUpdate(),
                            },
                          };
                          dataToChange.tarefas[index].concluida =
                            !dataToChange.tarefas[index].concluida;
                          dataToChange.tarefas[index].dadosServidor.lastUpdate =
                            getLastUpdate();
                          setNewData(dataToChange);
                        }
                      }}
                    />
                  </fieldset>
                </td>
                <td>
                  <fieldset disabled={showBTNDetalhes}>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        let index = data.tarefas.findIndex(
                          (tarefas) => tarefas.uuid === elemento.uuid
                        );
                        console.log(index);
                        let dataToChange = { ...data };
                        dataToChange.tarefas[
                          index
                        ].dadosServidor.deletado = true;
                        dataToChange.tarefas[index].dadosServidor.lastUpdate =
                          getLastUpdate();
                        setNewData(dataToChange);
                      }}
                    >
                      Excluir
                    </Button>
                  </fieldset>
                </td>
              </tr>
            ))}
          </tbody>
        );
      }
    };

    const handleTarefasSubmit = async () => {
      try {
        if (tarefasForm.descricao) {
          let changeData = { ...tarefasForm, uuid: v4(), creator: data._id };
          changeData.dtCriacao = formatDateToDefault(new Date(Date.now()));
          let dataToAdd = {
            ...data,
            dadosServidor: {
              ...data.dadosServidor,
              lastUpdate: getLastUpdate(),
            },
            tarefas: [...data.tarefas, changeData],
          };
          await user.update(dataToAdd.uuid, dataToAdd);
          setTarefasForm({ ...tarefaSchema });
          getData();
          setFindedData(false);
        } else {
          alert("É necessário preecher a descrição da tarefa para o cadastro");
        }
      } catch (err) {
        console.log(err);
      }
    };

    return (
      <div>
        <Container className="mt-4">
          <Container
            className="mt-4 sticky-top"
            style={{ backgroundColor: "white", padding: "0.5", zIndex: "3" }}
          >
            <Row>
              <Button
                variant="outline-success"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                Cadastrar nova{" "}
                <span style={{ color: "purple", fontWeight: "700" }}>
                  tarefa
                </span>
              </Button>
            </Row>
          </Container>
          <div>
            <Container
              className="sticky-top mt-4 flex-row flex-nowrap"
              style={{
                top: "2.45em",
                backgroundColor: "white",
                padding: "0.5",
                zIndex: "3",
              }}
            >
              <Form.Control
                type="search"
                placeholder={`Procurar tarefa`}
                className="mb-4"
                defaultValue=""
                aria-label="Search"
                onChange={(e) => setSearch(e.currentTarget.value)}
              />
            </Container>
            <div>
              {showBTNDetalhes && (
                <div
                  className="mt-4 sticky-top"
                  style={{
                    top: "4.9em",
                    backgroundColor: "white",
                    padding: "0.5",
                    zIndex: "3",
                  }}
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
                  className="mt-4 ms-3 sticky-top"
                  style={{
                    top: "4.9em",
                    backgroundColor: "white",
                    padding: "0.5",
                    zIndex: "3",
                  }}
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
              <div>
                <div>
                  <Row className="mt-3 gy-2 gx-3">
                    <hr />
                    <Card.Subtitle
                      className="text-center"
                      style={{ fontSize: "2em" }}
                    >
                      Tarefas para realizar
                    </Card.Subtitle>
                    <Col xs={12}>
                      <Table hover>
                        <thead
                          className="sticky-top"
                          style={{
                            top: "7.25em",
                            backgroundColor: "white",
                            padding: "0.5",
                            zIndex: "1",
                          }}
                        >
                          <tr>
                            <th>#</th>
                            <th>Data</th>
                            <th>Descrição</th>
                            <th>Urgente</th>
                            <th>Concluída</th>
                            <th></th>
                          </tr>
                        </thead>
                        {renderTarefasTable()}
                      </Table>
                    </Col>
                  </Row>
                  <Row className="mt-3 gy-2 gx-3">
                    <hr />
                    <Card.Subtitle
                      className="text-center"
                      style={{ fontSize: "2em" }}
                    >
                      Tarefas Concluidas
                    </Card.Subtitle>
                    <Col xs={12}>
                      <Table hover>
                        <thead
                          className="sticky-top"
                          style={{
                            top: "7.25em",
                            backgroundColor: "white",
                            zIndex: "1",
                          }}
                        >
                          <tr>
                            <th>#</th>
                            <th>Data</th>
                            <th>Descrição</th>
                            <th>Urgente</th>
                            <th>Concluída</th>
                            <th></th>
                          </tr>
                        </thead>
                        {renderTarefasConcluidasTable()}
                      </Table>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </Container>
        <Modal
          show={showModal}
          onHide={handleCloseModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Cadastrar nova Tarefa</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  type="text"
                  value={tarefasForm.descricao}
                  name="descricao"
                  onChange={handleTarefasChange}
                />
              </Form.Group>
              <Form.Check
                type="switch"
                id="dead-switch"
                label="urgente"
                style={{ color: "red" }}
                checked={tarefasForm.urgente}
                className="text-nowrap"
                onChange={() => {
                  setTarefasForm({
                    ...tarefasForm,
                    urgente: !tarefasForm.urgente,
                  });
                }}
              />
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="success"
              onClick={handleTarefasSubmit}
            >
              Cadastrar
            </Button>
            <Button
              className="ms-4"
              variant="secondary"
              onClick={() => {
                handleCloseModal();
                setTarefasForm({ ...tarefaSchema });
              }}
            >
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
