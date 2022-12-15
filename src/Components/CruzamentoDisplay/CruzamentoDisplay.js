import { useContext, useState } from "react";
import { Button, Card, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import "../../Pages/CattleDetailsPage.css";
import Table from "react-bootstrap/Table";
import {
  formatDateToDefault,
  getLastUpdate,
  formatDate,
  calculateBirthDate,
} from "../../helpers/CalculateAge";
import { AuthContext } from "../../contexts/authContext";
import cruzamentoSchema from "../../Models/cruzamento.models";
import { v4 } from "uuid";

export default function CruzamentoDisplay({
  oneAnimal,
  setOneAnimal,
  formState,
  setAnimalFinded,
  setNotification,
}) {
  const { data, user } = useContext(AuthContext);
  let property = data;
  const [showCruzamentoForm, setShowCruzamentoForm] = useState(false);
  const [cruzamentoForm, setCruzamentoForm] = useState({ ...cruzamentoSchema });

  let activeCruzamentos = oneAnimal.dadosCruzamentos
    .filter((cruzamento) => !cruzamento.dadosServidor.deletado)
    .sort(
      (a, b) =>
        new Date(a.dtCruzamento).getTime() - new Date(b.dtCruzamento).getTime()
    );

  return (
    <Row className="mt-3 gy-2 gx-3">
      <hr />
      <Card.Subtitle>Cruzamentos do animal</Card.Subtitle>

      {activeCruzamentos.length <= 0 && (
        <Col xs={12}>
          <fieldset disabled={formState.btnEditarDetalhes.show}>
            <Table>
              <thead>
                <tr>
                  <th className="text-center">Dados de cruzamento</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    colSpan={4}
                    className="text-center"
                  >
                    Não existem ocorrências cadastradas.
                  </td>
                </tr>
              </tbody>
            </Table>
          </fieldset>
        </Col>
      )}
      {activeCruzamentos.length > 0 &&
        activeCruzamentos.map((elemento, index) => {
          if (!elemento.esconderCampo) {
            return (
              <Col
                xs={12}
                key={index}
                style={{borderStyle:"solid", borderColor:"rgba(0, 0, 0, 0.1 )"}}
              >
                <Table>
                  <thead>
                    <tr>
                      <th className="text-left">Data inseminação/cruzamento</th>
                      <th className="text-center">Animal prenhe?</th>
                      <th style={{ textAlign: "center" }}>
                        Previsão do Nascimento
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <fieldset disabled={formState.btnEditarDetalhes.show}>
                          <Form.Control
                            type="date"
                            id="dtCruzamento"
                            value={elemento.dtCruzamento}
                            onChange={(e) => {
                              let newAnimal = { ...oneAnimal };
                              newAnimal.dadosCruzamentos[
                                newAnimal.dadosCruzamentos.indexOf(elemento)
                              ].dtCruzamento = e.target.value;
                              newAnimal.dadosCruzamentos[
                                newAnimal.dadosCruzamentos.indexOf(elemento)
                              ].dtProvavelNascimento = calculateBirthDate(
                                e.target.value
                              );
                              setOneAnimal(newAnimal);
                            }}
                          />
                        </fieldset>
                      </td>
                      <td>
                        <fieldset
                          className="text-nowrap d-flex align-content-center align-items-center justify-content-center"
                          disabled={!formState.btnEditarDetalhes.show}
                        >
                          <Form.Check
                            type="switch"
                            id="confirmada prenhez"
                            checked={elemento.confirmacaoPrenhez}
                            className="text-nowrap"
                            onChange={async () => {
                              try {
                                let newAnimal = {
                                  ...oneAnimal,
                                  dadosServidor: {
                                    ...oneAnimal.dadosServidor,
                                    lastUpdate: formatDateToDefault(
                                      new Date(Date.now())
                                    ),
                                  },
                                };
                                newAnimal.dadosCruzamentos[
                                  newAnimal.dadosCruzamentos.indexOf(elemento)
                                ].confirmacaoPrenhez =
                                  !newAnimal.dadosCruzamentos[
                                    newAnimal.dadosCruzamentos.indexOf(elemento)
                                  ].confirmacaoPrenhez;
                                if (!elemento.confirmacaoPrenhez) {
                                  newAnimal.dadosCruzamentos[
                                    newAnimal.dadosCruzamentos.indexOf(elemento)
                                  ].esconderCampo = true;
                                } else {
                                  newAnimal.dadosCruzamentos[
                                    newAnimal.dadosCruzamentos.indexOf(elemento)
                                  ].esconderCampo = false;
                                }
                                setOneAnimal(newAnimal);
                                let cowIndex = await property.rebanho.findIndex(
                                  (cow) => cow.uuid === newAnimal.uuid
                                );
                                let newData = {
                                  ...property,
                                  dadosServidor: {
                                    ...property.dadosServidor,
                                    lastUpdate: new Date(Date.now()).getTime(),
                                  },
                                };
                                console.log(
                                  `data before update`,
                                  property.rebanho[cowIndex]
                                );
                                newData.rebanho[cowIndex] = newAnimal;
                                console.log(
                                  `data after update`,
                                  newData.rebanho[cowIndex]
                                );

                                await user.update(property.uuid, newData);
                                setNotification({
                                  type: "success",
                                  title: "Sucesso",
                                  text: "Suas alterações foram salvas!",
                                  show: true,
                                });
                              } catch (err) {
                                setAnimalFinded(false);
                                setNotification({
                                  type: "danger",
                                  title: "Erro",
                                  text: `Não foi possível salvar as alterações. Tente mais tarde.`,
                                  show: true,
                                });
                                console.error(err);
                              }
                            }}
                          />
                        </fieldset>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {formatDate(elemento.dtProvavelNascimento)}
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <Table>
                  <thead>
                    <tr>
                      <th>Semem/Touro</th>
                      <th className="text-center">Nascimento confirmado</th>
                      <th className="text-center">Esconder informação</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <fieldset disabled={formState.btnEditarDetalhes.show}>
                          <Form.Control
                            type="text"
                            id="Semem"
                            value={elemento.semen}
                            onCHange={(e) => {
                              let newAnimal = { ...oneAnimal };
                              newAnimal.dadosCruzamentos[
                                newAnimal.dadosCruzamentos.indexOf(elemento)
                              ].semem = e.target.value;
                              setOneAnimal(newAnimal);
                            }}
                          />
                        </fieldset>
                      </td>
                      <td>
                        <fieldset
                          className="text-nowrap d-flex align-content-center align-items-center justify-content-center"
                          disabled={!formState.btnEditarDetalhes.show}
                        >
                          <Form.Check
                            type="switch"
                            id="pariu"
                            checked={elemento.confirmacaoNascimento}
                            className="text-nowrap align-self-center"
                            onChange={async () => {
                              try {
                                let newAnimal = {
                                  ...oneAnimal,
                                  dadosServidor: {
                                    ...oneAnimal.dadosServidor,
                                    lastUpdate: formatDateToDefault(
                                      new Date(Date.now())
                                    ),
                                  },
                                };
                                newAnimal.dadosCruzamentos[
                                  newAnimal.dadosCruzamentos.indexOf(elemento)
                                ].confirmacaoNascimento =
                                  !newAnimal.dadosCruzamentos[
                                    newAnimal.dadosCruzamentos.indexOf(elemento)
                                  ].confirmacaoNascimento;
                                if (elemento.confirmacaoNascimento) {
                                  newAnimal.dadosCruzamentos[
                                    newAnimal.dadosCruzamentos.indexOf(elemento)
                                  ].esconderCampo = true;
                                } else {
                                  newAnimal.dadosCruzamentos[
                                    newAnimal.dadosCruzamentos.indexOf(elemento)
                                  ].esconderCampo = false;
                                }
                                setOneAnimal(newAnimal);
                                let cowIndex = await property.rebanho.findIndex(
                                  (cow) => cow.uuid === newAnimal.uuid
                                );
                                let newData = {
                                  ...property,
                                  dadosServidor: {
                                    ...property.dadosServidor,
                                    lastUpdate: new Date(Date.now()).getTime(),
                                  },
                                };
                                console.log(
                                  `data before update`,
                                  property.rebanho[cowIndex]
                                );
                                newData.rebanho[cowIndex] = newAnimal;
                                console.log(
                                  `data after update`,
                                  newData.rebanho[cowIndex]
                                );
                                await user.update(property.uuid, newData);
                                setNotification({
                                  type: "success",
                                  title: "Sucesso",
                                  text: "Suas alterações foram salvas!",
                                  show: true,
                                });
                              } catch (err) {
                                setAnimalFinded(false);
                                setNotification({
                                  type: "danger",
                                  title: "Erro",
                                  text: `Não foi possível salvar as alterações. Tente mais tarde.`,
                                  show: true,
                                });
                                console.error(err);
                              }
                            }}
                          />
                        </fieldset>
                      </td>
                      <td>
                        <div
                          className="text-nowrap d-flex align-content-center align-items-center justify-content-center"
                          disabled={!formState.btnEditarDetalhes.show}
                        >
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={async () => {
                              try {
                                let newAnimal = { ...oneAnimal };
                                newAnimal.dadosCruzamentos[
                                  newAnimal.dadosCruzamentos.indexOf(elemento)
                                ].esconderCampo = true;
                                newAnimal.dadosCruzamentos[
                                  newAnimal.dadosCruzamentos.indexOf(elemento)
                                ].dadosServidor.lastUpdate = getLastUpdate();
                                setOneAnimal(newAnimal);
                                let cowIndex = await property.rebanho.findIndex(
                                  (cow) => cow.uuid === newAnimal.uuid
                                );
                                let newData = {
                                  ...property,
                                  dadosServidor: {
                                    ...property.dadosServidor,
                                    lastUpdate: new Date(Date.now()).getTime(),
                                  },
                                };
                                console.log(
                                  `data before update`,
                                  property.rebanho[cowIndex]
                                );
                                newData.rebanho[cowIndex] = newAnimal;
                                console.log(
                                  `data after update`,
                                  newData.rebanho[cowIndex]
                                );
                                await user.update(property.uuid, newData);
                                setNotification({
                                  type: "success",
                                  title: "Sucesso",
                                  text: "Suas alterações foram salvas!",
                                  show: true,
                                });
                              } catch (err) {
                                setAnimalFinded(false);
                                setNotification({
                                  type: "danger",
                                  title: "Erro",
                                  text: `Não foi possível salvar as alterações. Tente mais tarde.`,
                                  show: true,
                                });
                                console.error(err);
                              }
                            }}
                          >
                            Esconder
                          </Button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <fieldset disabled={formState.btnEditarDetalhes.show}>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => {
                              let newAnimal = { ...oneAnimal };
                              newAnimal.dadosCruzamentos[
                                newAnimal.dadosCruzamentos.indexOf(elemento)
                              ].dadosServidor.deletado = true;
                              newAnimal.dadosCruzamentos[
                                newAnimal.dadosCruzamentos.indexOf(elemento)
                              ].dadosServidor.lastUpdate = getLastUpdate();
                              setOneAnimal(newAnimal);
                            }}
                          >
                            Excluir
                          </Button>
                        </fieldset>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            );
          } else {
            return (
              <Table>
                <thead>
                  <tr>
                    <th>{activeCruzamentos.indexOf(elemento) + 1}</th>
                    <th>
                      {!elemento.confirmacaoPrenhez ? (
                        <span style={{ color: "red" }}>Prenhez não vingou</span>
                      ) : elemento.confirmacaoNascimento ? (
                        <span style={{ color: "green" }}> Bezerro já nasceu!</span>
                      ) : (
                        <span>informação oculta</span>
                      )}
                    </th>
                    <th>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={async () => {
                          try {
                            let newAnimal = { ...oneAnimal };
                            newAnimal.dadosCruzamentos[
                              newAnimal.dadosCruzamentos.indexOf(elemento)
                            ].esconderCampo = false;
                            newAnimal.dadosCruzamentos[
                              newAnimal.dadosCruzamentos.indexOf(elemento)
                            ].dadosServidor.lastUpdate = getLastUpdate();
                            setOneAnimal(newAnimal);
                            let cowIndex = await property.rebanho.findIndex(
                              (cow) => cow.uuid === newAnimal.uuid
                            );
                            let newData = {
                              ...property,
                              dadosServidor: {
                                ...property.dadosServidor,
                                lastUpdate: new Date(Date.now()).getTime(),
                              },
                            };
                            console.log(
                              `data before update`,
                              property.rebanho[cowIndex]
                            );
                            newData.rebanho[cowIndex] = newAnimal;
                            console.log(
                              `data after update`,
                              newData.rebanho[cowIndex]
                            );
                            await user.update(property.uuid, newData);
                            setNotification({
                              type: "success",
                              title: "Sucesso",
                              text: "Suas alterações foram salvas!",
                              show: true,
                            });
                          } catch (err) {
                            setAnimalFinded(false);
                            setNotification({
                              type: "danger",
                              title: "Erro",
                              text: `Não foi possível salvar as alterações. Tente mais tarde.`,
                              show: true,
                            });
                            console.error(err);
                          }
                        }}
                      >
                        Mostrar
                      </Button>
                    </th>
                  </tr>
                </thead>
              </Table>
            );
          }
        })}

      {!showCruzamentoForm && (
        <Col
          xs={12}
          md={4}
          className="align-self-center"
        >
          <Button
            variant="outline-primary"
            onClick={() => setShowCruzamentoForm(true)}
          >
            Nova inseminação/cruzamento
          </Button>
        </Col>
      )}
      {showCruzamentoForm && (
        <Col
          xs={12}
          md={4}
          className="align-self-center"
        >
          <Button
            variant="outline-success"
            onClick={async () => {
              try {
                if (cruzamentoForm.dtCruzamento) {
                  setShowCruzamentoForm(false);
                  let dataToAdd = {
                    ...cruzamentoForm,
                    creator: data._id,
                    uuid: v4(),
                    animaluuid: oneAnimal.uuid,
                    dtProvavelNascimento: calculateBirthDate(
                      cruzamentoForm.dtCruzamento
                    ),
                    dadosServidor: {
                      ...cruzamentoForm.dadosServidor,
                      lastUpdate: getLastUpdate(),
                    },
                  };
                  if (!dataToAdd.semen) {
                    dataToAdd.semen = "não informado";
                  }
                  let newAnimal = { ...oneAnimal };
                  newAnimal.dadosCruzamentos.push(dataToAdd);
                  setOneAnimal(newAnimal);
                  let cowIndex = await property.rebanho.findIndex(
                    (cow) => cow.uuid === newAnimal.uuid
                  );
                  let newData = {
                    ...data,
                    dadosServidor: {
                      ...data.dadosServidor,
                      lastUpdate: getLastUpdate(),
                    },
                  };
                  console.log(`data before update`, property.rebanho[cowIndex]);
                  newData.rebanho[cowIndex] = newAnimal;
                  console.log(`data after update`, newData.rebanho[cowIndex]);
                  await user.update(property.uuid, newData);
                  setNotification({
                    type: "success",
                    title: "Sucesso",
                    text: "Suas alterações foram salvas!",
                    show: true,
                  });
                  setCruzamentoForm({ ...cruzamentoSchema });
                } else {
                  alert(
                    "é necessário indicar, ao menos, uma data de inseminação/cruzamento"
                  );
                }
              } catch (err) {
                setAnimalFinded(false);
                setNotification({
                  type: "danger",
                  title: "Erro",
                  text: `Não foi possível salvar as alterações. Tente mais tarde.`,
                  show: true,
                });
                console.error(err);
              }
            }}
          >
            Confirmar
          </Button>
          <Button
            className="ms-2"
            variant="outline-danger"
            onClick={() => {
              setShowCruzamentoForm(false);
              setCruzamentoForm({ ...cruzamentoSchema });
            }}
          >
            Cancelar
          </Button>
        </Col>
      )}
      {showCruzamentoForm && (
        <Col
          xs={12}
          md={4}
        >
          <FloatingLabel
            controlId="floating-Data-do-ato"
            label={"Data da inseminação / cruzamento"}
          >
            <Form.Control
              type="date"
              placeholder="Data do Cruzamento"
              onChange={(e) => {
                setCruzamentoForm({
                  ...cruzamentoForm,
                  dtCruzamento: e.target.value,
                });
              }}
            />
          </FloatingLabel>
        </Col>
      )}
      {showCruzamentoForm && (
        <Col
          xs={12}
          md={4}
        >
          <FloatingLabel
            controlId="floating-Pai"
            label={"Semem ou Touro"}
          >
            <Form.Control
              type="text"
              placeholder="Semem ou touro"
              value={cruzamentoForm.semen}
              onChange={(e) => {
                setCruzamentoForm({ ...cruzamentoForm, semen: e.target.value });
              }}
            />
          </FloatingLabel>
        </Col>
      )}
    </Row>
  );
}
