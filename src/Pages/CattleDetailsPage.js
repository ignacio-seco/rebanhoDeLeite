import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {Button, Card, Col, Container, FloatingLabel, Form, InputGroup, ListGroup, Row} from "react-bootstrap";
import imgPlaceholder from "../assets/cow2.png";
import "./CattleDetailsPage.css"
import Table from "react-bootstrap/Table";
import moment from "moment";

export default function CattleDetailsPage() {
  const { id } = useParams();
  
  const [oneAnimal, setOneAnimal] = useState({
    sexo: "",
    brinco: "",
    brincoDaMae: "",
    morreu: false,
    noCurral: false,
    pasto: "",
    vendida: false,
    valorVenda: null,
    dtVenda: "",
    comprador: "",
    dtNascimento: "",
    causaMorte: "",
    dtCruzamento: "",
    estadaCurral: [],
  });
  
  const [formState, setFormState] = useState({
    ocorrenciaPastoToAdd: "",
    btnAdicionarEstada: {
      clicked: false,
      disabled: false,
      text: "",
      variant: "outline-primary",
      marginRightClass: '',
    },
    labelEstadaDatePicker: "",
    btnEditarDetalhes:{
      show: true,
    },    
    btnSalvarDetalhes: {
      loading: false,
      text: "Salvar Alterações"
    }
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/${id}`);
        setOneAnimal(data);
        console.log(data);

        ehUltimaOcorrenciaPastoSaida(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  async function handleDelete(e) {
    e.preventDefault();
    await axios.delete(`/${id}`);
    navigate(-1);
  }
  
  function ehUltimaOcorrenciaPastoSaida(animal){
    const lastOccurrence = animal.estadaCurral 
        ? animal.estadaCurral[animal.estadaCurral.length - 1]
        : null
    
    const result = Boolean(lastOccurrence?.dtSaidaCurral);

    let txtBtnAdicionarEstada = result
        ? "Nova Entrada"
        : "Nova Saída";
    
    let txtLabelEstadaDatePicker = result 
        ? "Data da nova entrada"
        : "Data da nova saída";

    setFormState(prevState => ({
      ...prevState,
      labelEstadaDatePicker: txtLabelEstadaDatePicker,
      btnAdicionarEstada: {
        text: txtBtnAdicionarEstada,
        variant: 'outline-primary'
      }
    }));
    
    return { 
      result,
      lastOccurrence
    };
  }

  function handleAddEstadaBtnClick(cancelBtn = false) {
    let { clicked, disabled, variant, text, marginRightClass} = formState.btnAdicionarEstada;
    let labelEstadaDatePicker = formState.labelEstadaDatePicker;

    const { lastOccurrence } = ehUltimaOcorrenciaPastoSaida(oneAnimal);

    if (!clicked) {
      clicked = true;
      disabled = true;
      variant = 'outline-success';
      text = 'Confirmar';
      // text = result ? 'Nova Entrada' : 'Nova Saída';
      marginRightClass = 'me-2'
    } else {
      if (!lastOccurrence.dtSaidaCurral) {
        labelEstadaDatePicker = "Data da nova entrada";
        if (!cancelBtn && formState.ocorrenciaPastoToAdd) {
          oneAnimal.estadaCurral[oneAnimal.estadaCurral.indexOf(lastOccurrence)].dtSaidaCurral = formState.ocorrenciaPastoToAdd;
          text = "Nova Entrada";
        } else{
          text = "Nova Saída";
          disabled = false;
        }
      } else {
        labelEstadaDatePicker = "Data da nova saída";
        if (!cancelBtn && formState.ocorrenciaPastoToAdd) {
          oneAnimal.estadaCurral.push({
            dtEntradaCurral: formState.ocorrenciaPastoToAdd
          })
          text = "Nova Saída";
        } else {
          text = "Nova Entrada";
          disabled = false;
        }
      }
      clicked = false;
      variant = 'outline-primary';
      marginRightClass = '';
    }

    setFormState(prevState => ({
      ...prevState,
      ocorrenciaPastoToAdd: "",
      labelEstadaDatePicker,
      btnAdicionarEstada: {
        clicked,
        disabled,
        variant,
        text,
        marginRightClass
      }
    }))
  }
  
  function handleBtnEditarDetalhesClick(){
    setFormState(prevState => ({
      ...prevState,
      btnEditarDetalhes: { show: false }
    }));
  }

  async function handleBtnSalvarAlteracoesClick() {
    setFormState(prevState => (
        {
          ...prevState, btnSalvarDetalhes: {
            text: "Salvando...",
            loading: true
          }
        }));

    try {
      let data = {...oneAnimal};
      delete data._id;
      await axios.put(`/${id}`, data);
    } catch (e) {
      console.log(e)
    } finally {
      setFormState(prevState => ({
        ...prevState,
        btnEditarDetalhes: {show: true},
        btnSalvarDetalhes: {
          text: "Salvar Alterações",
          loading: false
        }
      }));
    }
  }

  return (
    <Container>
      <Card className="my-5">
        <Card.Header className="cattle-details-header">
          <Container className="d-flex justify-content-between align-items-baseline">
            <span>{oneAnimal.nome}</span>
            <span className="font-monospace text-muted float-sm-end d-none d-sm-inline-block">
            #{oneAnimal._id}
          </span>
          </Container>
        </Card.Header>
        <Card.Body>
          <Card.Title>Informações principais</Card.Title>
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
            <Row className="mb-2 mt-3">
              <hr />
            </Row>
            <Row>
              <Col xs={12}>
                <Container className="d-flex justify-content-between p-0">
                  <Card.Title className="mb-3">Detalhes</Card.Title>
                  <Button variant="primary"
                          className={`${ !formState.btnEditarDetalhes.show ? 'd-none' : '' }`}
                          onClick={handleBtnEditarDetalhesClick}                  
                  >
                    Editar Detalhes
                  </Button>
                  <Button variant="success" 
                          disabled={formState.btnSalvarDetalhes.loading}
                          className={`${ formState.btnEditarDetalhes.show ? 'd-none' : '' }`}
                          onClick={handleBtnSalvarAlteracoesClick}
                  >
                    { formState.btnSalvarDetalhes.text }
                  </Button>
                </Container>
                <Card.Subtitle>Dados do animal</Card.Subtitle>
              </Col>
            </Row>
            <fieldset disabled={formState.btnEditarDetalhes.show}>
              <Row className="gy-2 gx-3">
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
                <Col xs={{span: 12, order: 4}} md={{ span: 6, order: 3}}>
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
                          defaultValue={oneAnimal.dtNascimento}
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
                <Col xs={{ span: 12, order: 3 }} md={{span: 6, order: 4}}>
                  <Form.Group as={Row}>
                    <Form.Label
                        column
                        xs={4}
                        className="text-nowrap"
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
                <Col xs={{ span: 12, order: 5 }} md={6}>
                  <Form.Group as={Row}>
                    <Form.Label column xs={4} htmlFor="dt-cruzamento">Cruzamento:</Form.Label>
                    <Col xs={8}>
                      <Form.Control
                          type="date"
                          id="dt-cruzamento"
                          placeholder="Não informada"
                          defaultValue={oneAnimal.dtCruzamento}
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
                <Col xs={{ span: 12, order: 5 }} md={6}>
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
                              defaultValue={oneAnimal.dtVenda}
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
                              placeholder="Não informado"
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
              { oneAnimal.estadaCurral?.length > 0 &&
                  <Row className="mt-3 gy-2 gx-3">
                    <hr/>
                    <Card.Subtitle>Estada no Curral</Card.Subtitle>
                    <Col xs={12}>
                      <Table>
                        <thead>
                        <tr>
                          <th>#</th>
                          <th>Entrada</th>
                          <th>Saída</th>
                        </tr>
                        </thead>
                        <tbody>
                        { oneAnimal.estadaCurral.map((estada, index) =>
                            <tr key={index}>
                              <td>{oneAnimal.estadaCurral.indexOf(estada) + 1}</td>
                              <td>{ estada.dtEntradaCurral && moment(estada.dtEntradaCurral).format('L') }</td>
                              <td>{ estada.dtSaidaCurral && moment(estada.dtSaidaCurral).format('L') }</td>
                            </tr>
                        ) }
                        </tbody>
                      </Table>
                    </Col>
                    <Col xs={12} md={4} className="align-self-center">
                      <Button
                          disabled={formState.btnAdicionarEstada.disabled}
                          variant={formState.btnAdicionarEstada.variant}
                          className={formState.btnAdicionarEstada.marginRightClass}
                          onClick={() => handleAddEstadaBtnClick()}
                      >
                        {formState.btnAdicionarEstada.text}
                      </Button>
                      { formState.btnAdicionarEstada.clicked &&
                          <Button
                              variant="outline-danger"
                              onClick={e => handleAddEstadaBtnClick(true)} >
                            Cancelar
                          </Button>
                      }
                    </Col>
                    { formState.btnAdicionarEstada.clicked &&
                        <Col xs={12} md={4}>
                          <FloatingLabel controlId="floating-entrada-curral" label={ formState.labelEstadaDatePicker }>
                            <Form.Control
                                type="date"
                                placeholder="Data de entrada"
                                defaultValue=""
                                onChange={(e) =>
                                    setFormState((prevState) => ({
                                      ...prevState,
                                      ocorrenciaPastoToAdd: e.target.value,
                                      btnAdicionarEstada: {
                                        ...prevState.btnAdicionarEstada,
                                        disabled: !e.target.value && prevState.btnAdicionarEstada.clicked
                                      }
                                    }))
                                }

                            />
                          </FloatingLabel>
                        </Col> }
                  </Row>
              }
            </fieldset>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
