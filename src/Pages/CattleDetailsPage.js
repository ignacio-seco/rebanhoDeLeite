import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import imgPlaceholder from "../assets/cow2.png";

export default function CattleDetailsPage(props) {
  const { _id } = useParams();
  const [oneAnimal, setOneAnimal] = useState({});
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
        <Card.Header className="">
          {oneAnimal.nome}{" "}
          <span className="font-monospace text-muted float-sm-end">
            #{oneAnimal._id}
          </span>
        </Card.Header>
        <Card.Body>
          <Card.Subtitle>Informações principais</Card.Subtitle>
          <Form>
            <Row className="py-3">
              <Col xs="4">
                <Container className="cow-details-img-container mx-3">
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
            <Row className="g-2">
              <Col xs={12}>
                <Card.Subtitle className="mb-3">
                  Outras informações
                </Card.Subtitle>
              </Col>
              <Col
                xs={12}
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
                    checked={oneAnimal.sexo !== "FEMEA"}
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
              <Col md={6}>
                <Form.Group as={Row}>
                  <Form.Label
                    column
                    xs={3}
                    className="text-nowrap"
                    htmlFor="brinco"
                  >
                    Brinco:
                  </Form.Label>
                  <Col xs={9}>
                    <Form.Control
                      type="number"
                      id="brinco"
                    />
                  </Col>
                </Form.Group>
              </Col>
              <Col
                xs={3}
                md={3}
              >
                <Form.Label
                  column
                  xs={3}
                  className="text-nowrap"
                  htmlFor="dt-nascimento-gado"
                >
                  Nascimento:
                </Form.Label>
              </Col>
              <Col xs={9}>
                <Form.Control
                  type="date"
                  id="dt-nascimento-gado"
                  value={oneAnimal.dtNascimento}
                  onChange={(e) =>
                    setOneAnimal((prevState) => ({
                      ...prevState,
                      dtNascimento: e.target.value,
                    }))
                  }
                />
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
