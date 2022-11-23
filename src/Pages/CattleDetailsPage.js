import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {Card, Col, Container, Form, InputGroup, Row} from "react-bootstrap";
import imgPlaceholder from "../assets/cow2.png";
import "./CattleDetailsPage.css"

export default function CattleDetailsPage(props) {
  const { _id } = useParams();
  const [oneAnimal, setOneAnimal] = useState({
    sexo: "",
    brinco: "",
    brincoDaMae: "",
    morreu: false,
    noCurral: false,
    vendida: false,
    dtVenda: "",
    dtNascimento: "",
    causaMorte: "",
    dtCruzamento: "",
    estadaCurral: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    getOneAnimal();
  }, []);

  async function getOneAnimal() {
    try {
      const response = await axios.get(`/${_id}`);
      setOneAnimal(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDelete(e) {
    e.preventDefault();
    await axios.delete(`/${_id}`);
    navigate(-1);
  }

  return (
    <Container>
      <Card>
        <Card.Header className="cattle-details-header">
          <Container className="d-flex justify-content-between align-items-baseline">
            <span>{oneAnimal.nome}</span>
            <span className="font-monospace text-muted float-sm-end d-none d-sm-inline-block">
            #{oneAnimal._id}
          </span>
          </Container>
        </Card.Header>
        <Card.Body>
          <Card.Subtitle>Informações principais</Card.Subtitle>
          <Form>
            <Row className="py-3">
              <Col xs="4">
                <Container className="cow-details-img-container me-3">
                  <img
                    src={oneAnimal.imagem_url || imgPlaceholder}
                    alt="cow-image"
                    className="w-75"
                  />
                </Container>
              </Col>
              <Col className="ps-xl-4 align-self-center">
                <fieldset>
                  <Row>
                    <Col>
                      <Form.Check
                        type="switch"
                        id="sold-switch"
                        label="No Curral"
                        checked={oneAnimal.noCurral}
                        className="text-nowrap"
                        onChange={(_) =>
                          setOneAnimal((prevState) => ({
                            ...prevState,
                            noCurral: !prevState.noCurral,
                          }))
                        }
                      />
                    </Col>
                    <Col>
                      <Form.Check
                        type="switch"
                        id="dead-switch"
                        label="Morreu"
                        checked={oneAnimal.morreu}
                        className="text-nowrap"
                        onChange={(_) =>
                          setOneAnimal((prevState) => ({
                            ...prevState,
                            ...(prevState.morreu && { causaMorte: "" }),
                            morreu: !prevState.morreu,
                          }))
                        }
                      />
                    </Col>
                    <Col>
                      <Form.Check
                        type="switch"
                        id="sold-switch"
                        label="Vendido"
                        checked={oneAnimal.vendida}
                        className="text-nowrap"
                        onChange={(_) =>
                            setOneAnimal((prevState) => ({
                              ...prevState,
                              ...(prevState.vendida && {dtVenda: ""}),
                              ...(prevState.vendida && {valorVenda: ""}),
                              ...(prevState.vendida && {comprador: ""}),
                              vendida: !prevState.vendida,
                            }))
                        }
                      />
                    </Col>
                  </Row>
                </fieldset>
              </Col>
            </Row>
            <Row className="my-3">
              <hr />
            </Row>
            <Row className="gy-2 gx-3">
              <Col xs={12}>
                <Card.Subtitle className="mb-3">
                  Outras informações
                </Card.Subtitle>
              </Col>
              <Col
                xs={{span: 12, order: 1}}
                md={6}
                className="pt-2"
              >
                <Form.Group>
                  <Form.Label className="me-3">Sexo:</Form.Label>
                  <Form.Check
                    inline
                    label="Macho"
                    name="genderGroup"
                    type="radio"
                    id={`inline-radio-gender-1`}
                    checked={oneAnimal.sexo === "MACHO"}
                    onChange={(_) =>
                      setOneAnimal((prevState) => ({
                        ...prevState,
                        sexo: "MACHO",
                      }))
                    }
                  />
                  <Form.Check
                    inline
                    label="Fêmea"
                    name="genderGroup"
                    type="radio"
                    id={`inline-radio-gender-2`}
                    checked={oneAnimal.sexo === "FEMEA"}
                    onChange={(_) =>
                      setOneAnimal((prevState) => ({
                        ...prevState,
                        sexo: "FEMEA",
                      }))
                    }
                  />
                </Form.Group>
              </Col>
              <Col xs={{order: 2}} md={6}>
                <Form.Group as={Row}>
                  <Form.Label
                    column
                    xs={4}
                    className="text-nowrap"
                    htmlFor="brinco"
                  >
                    Brinco:
                  </Form.Label>
                  <Col xs={8}>
                    <Form.Control
                      type="number"
                      id="brinco"
                      placeholder="Não informado"
                      value={oneAnimal.brinco}
                      onChange={e => setOneAnimal(prevState =>
                          ({ ...prevState, brinco: e.target.value })
                      )}
                    />
                  </Col>
                </Form.Group>
              </Col>
              <Col xs={{span: 12, order: 4}} sm={{ order: 4}} md={6}>
                <Form.Group as={Row}>
                  <Form.Label
                      column
                      xs={4}
                      className="text-nowrap"
                      htmlFor="dt-nascimento-gado"
                  >
                    Nascimento:
                  </Form.Label>
                  <Col xs={8}>
                    <Form.Control
                        type="date"
                        id="dt-nascimento-gado"
                        placeholder="Não informada"
                        value={oneAnimal.dtNascimento}
                        onChange={(e) =>
                            setOneAnimal((prevState) => ({
                              ...prevState,
                              dtNascimento: e.target.value,
                            }))
                        }
                    />
                  </Col>
                </Form.Group>
              </Col>
              <Col xs={{ order: 3 }} md={{span: 6, order: 4}}>
                <Form.Group as={Row}>
                  <Form.Label
                      column
                      xs={4}
                      className="text-nowrap"s
                      htmlFor="brinco-da-mae"
                  >
                    Brinco da mãe:
                  </Form.Label>
                  <Col xs={8}>
                    <Form.Control
                        type="number"
                        id="brinco-da-mae"
                        placeholder="Não informado"
                        value={oneAnimal.brincoDaMae}
                        onChange={e => setOneAnimal(prevState =>
                            ({ ...prevState, brincoDaMae: e.target.value })
                        )}
                    />
                  </Col>
                </Form.Group>
              </Col>
              <Col xs={{ order: 5 }} md={6}>
                <Form.Group as={Row}>
                  <Form.Label column xs={4} htmlFor="dt-cruzamento">Cruzamento:</Form.Label>
                  <Col xs={8}>
                    <Form.Control
                        type="date"
                        id="dt-cruzamento"
                        placeholder="Não informada"
                        value={oneAnimal.dtCruzamento}
                        onChange={(e) =>
                            setOneAnimal((prevState) => ({
                              ...prevState,
                              dtCruzamento: e.target.value,
                            }))
                        }
                    />
                  </Col>
                </Form.Group>
              </Col>
              <Col xs={{ order: 6 }} md={6}>
                <Form.Group as={Row}>
                  <Form.Label column xs={4} htmlFor="pasto">Pasto:</Form.Label>
                  <Col xs={8}>
                    <Form.Control
                        type="text"
                        id="pasto"
                        placeholder="Não informado"
                        value={oneAnimal.pasto}
                        onChange={(e) =>
                            setOneAnimal((prevState) => ({
                              ...prevState,
                              pasto: e.target.value,
                            }))
                        }
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            {oneAnimal.morreu &&
                <Form.Group as={Row} className="mt-3">
                  <Form.Label column xs={4} md={3} htmlFor="causa-morte">
                    Causa da morte:
                  </Form.Label>
                  <Col>
                    <Form.Control
                        id="causa-morte"
                        as="textarea"
                        rows={3}
                        value={oneAnimal.causaMorte}
                        onChange={e => setOneAnimal(prevState =>
                            ({...prevState, causaMorte: e.target.value})
                        )}
                    />
                  </Col>
                </Form.Group>
            }
            { oneAnimal.vendida &&
              <Row className="mt-3 gy-2 gx-3">
                <hr/>
                <Card.Subtitle>Dados da venda</Card.Subtitle>
                <Col xs={12} md={6} lg={4}>
                  <Form.Group as={Row}>
                    <Form.Label column xs={3} htmlFor="dt-venda">Data:</Form.Label>
                    <Col xs={9}>
                      <Form.Control
                          id="dt-venda"
                          type="date"
                          value={oneAnimal.dtVenda}
                          onChange={(e) =>
                              setOneAnimal((prevState) => ({
                                ...prevState,
                                dtVenda: e.target.value,
                              }))
                          }
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col xs={12} md={6} lg={4}>
                  <Form.Group as={Row} >
                    <Form.Label column xs={3} htmlFor="valor-venda">Preço:</Form.Label>
                    <Col xs={9}>
                      <InputGroup>
                        <InputGroup.Text>R$</InputGroup.Text>
                        <Form.Control
                            id="valor-venda"
                            type="number"
                            value={oneAnimal.valorVenda}
                            onChange={(e) =>
                                setOneAnimal((prevState) => ({
                                  ...prevState,
                                  valorVenda: e.target.value,
                                }))
                            }
                        />
                      </InputGroup>
                    </Col>
                  </Form.Group>
                </Col>
                <Col xs={12} lg={4}>
                  <Form.Group as={Row} >
                    <Form.Label column xs={3} lg={5} htmlFor="comprador">Comprador:</Form.Label>
                    <Col xs={9} lg={7}>
                      <Form.Control
                          id="comprador"
                          type="text"
                          value={oneAnimal.comprador}
                          onChange={(e) =>
                              setOneAnimal((prevState) => ({
                                ...prevState,
                                comprador: e.target.value,
                              }))
                          }
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
            }
            {/*<Row className="mt-3 gy-2 gx-3"> */}
            {/*  */}
            {/*</Row>*/}
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
