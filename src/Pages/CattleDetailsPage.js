import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  InputGroup,
  Modal,
  Row,
  Toast,
} from 'react-bootstrap';
import imgPlaceholder from '../assets/cow2.png';
import './CattleDetailsPage.css';
import Table from 'react-bootstrap/Table';
import moment from 'moment';
import Notification from '../Components/Notification';
import { Charts } from '../Components/Charts/Chart';
import {
  calculateAge,
  calculateMonths,
  formatDateToDefault,
} from '../helpers/CalculateAge';

export default function CattleDetailsPage({
  cattle,
  getCattle,
  pasturesArray,
}) {
  const { id } = useParams();
  useEffect(getCattle, [cattle.length]);

  let [oneAnimal, setOneAnimal] = useState({
    brinco: '',
    brincoDaMae: '',
    causaMorte: '',
    comprado: false,
    comprador: '',
    dtCompra: '',
    dtCruzamento: '',
    dtMorte: '',
    dtNascimento: '',
    dtVenda: '',
    estadaCurral: [],
    historico: [],
    imagem_url: 'https://pngimg.com/uploads/cow/cow_PNG50576.png',
    morreu: false,
    noCurral: false,
    nome: '',
    pasto: '',
    pesagem: [],
    producaoLeite: [],
    sexo: '',
    valorCompra: '',
    valorVenda: '',
    vendedor: '',
    vendida: false,
  });

  const [formState, setFormState] = useState({
    ocorrenciaHistoricoToAdd: {
      descricao: '',
      dtHistorico: formatDateToDefault(new Date(Date.now())),
    },
    btnAdicionarHistorico: {
      clicked: false,
      disabled: false,
      text: 'Nova observação',
      variant: 'outline-primary',
      marginRightClass: '',
    },
    ocorrenciaLeiteToAdd: { qtdLitros: '', dtVerificacao: '' },
    btnAdicionarLitragem: {
      clicked: false,
      disabled: false,
      text: 'Nova Litragem',
      variant: 'outline-primary',
      marginRightClass: '',
    },
    ocorrenciaPesoToAdd: { dtPesagem: '', peso: '' },
    btnAdicionarPesagem: {
      clicked: false,
      disabled: false,
      text: 'Nova Pesagem',
      variant: 'outline-primary',
      marginRightClass: '',
    },
    ocorrenciaPastoToAdd: '',
    btnAdicionarEstada: {
      clicked: false,
      disabled: false,
      text: '',
      variant: 'outline-primary',
      marginRightClass: '',
    },
    labelEstadaDatePicker: '',
    btnEditarDetalhes: {
      show: true,
    },
    btnSalvarDetalhes: {
      loading: false,
      text: 'Salvar Alterações',
    },
    btnCancelarAlteracoes: {
      text: 'Cancelar',
      disabled: false,
    },
  });

  const [modalConfirmaExclusao, setModalConfirmaExclusao] = useState({
    show: false,
    btnConfirmar: {
      loading: false,
      text: 'Confirmar',
    },
  });

  const [notification, setNotification] = useState({
    show: false,
    type: '',
    title: '',
    text: '',
    delay: 2000,
  });

  const setNotificationShow = (value) =>
    setNotification({ ...notification, show: value });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getOneAnimal();
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const getOneAnimal = async () => {
    const { data } = await axios.get(`/${id}`);
    setOneAnimal(data);
    console.log(data);

    ehUltimaOcorrenciaPastoSaida(data);
  };

  async function handleMorreuCheckButtonChange(_) {
    let morreu = !oneAnimal.morreu;


    setOneAnimal((prevState) => ({
      ...prevState,
      morreu:!oneAnimal.morreu,
      causaMorte:"",
      dtMorte:(oneAnimal.dtMorte ? "" : formatDateToDefault(new Date(Date.now())))
    }));

    try {
      let data = { ...oneAnimal, morreu:!oneAnimal.morreu,
        causaMorte:"",
        dtMorte:(oneAnimal.dtMorte ? "" : formatDateToDefault(new Date(Date.now())))};
      delete data._id;
      await axios.put(`/${id}`, data);
    } catch (e) {
      morreu = !morreu;
      setOneAnimal((prevState) => ({
        ...prevState,
        morreu,
        causaMorte: morreu ? oneAnimal.causaMorte : '',
        dtMorte: morreu ? oneAnimal.dtMorte : '',
      }));
      setNotification({
        type: 'danger',
        title: 'Erro',
        text: `Não foi possível registrar as alterações. Tente mais tarde.`,
        show: true,
      });
      console.error(e);
    }
  }

  async function handleVendaCheckButtonChange(_) {
    let vendida = !oneAnimal.vendida;
    const dtVenda = vendida ? oneAnimal.dtVenda : '';
    const valorVenda = vendida ? oneAnimal.valorVenda : '';
    const comprador = vendida ? oneAnimal.comprador : '';

    setOneAnimal((prevState) => ({
      ...prevState,
      dtVenda,
      valorVenda,
      comprador,
      vendida,
    }));

    try {
      let data = { ...oneAnimal, vendida, dtVenda, valorVenda, comprador };
      delete data._id;
      await axios.put(`/${id}`, data);
    } catch (e) {
      vendida = !vendida;
      setOneAnimal((prevState) => ({
        ...prevState,
        dtVenda: vendida ? oneAnimal.dtVenda : '',
        valorVenda: vendida ? oneAnimal.valorVenda : '',
        comprador: vendida ? oneAnimal.comprador : '',
        vendida,
      }));
      setNotification({
        type: 'danger',
        title: 'Erro',
        text: `Não foi possível registrar as alterações. Tente mais tarde.`,
        show: true,
      });
      console.error(e);
    }
  }

  function ehUltimaOcorrenciaPastoSaida(animal) {
    const lastOccurrence = animal.estadaCurral
      ? animal.estadaCurral[animal.estadaCurral.length - 1]
      : null;

    const result = Boolean(
      lastOccurrence?.dtSaidaCurral || !animal.estadaCurral.length
    );

    let txtBtnAdicionarEstada = result ? 'Nova Entrada' : 'Nova Saída';

    let txtLabelEstadaDatePicker = result
      ? 'Data da nova entrada'
      : 'Data da nova saída';

    setFormState((prevState) => ({
      ...prevState,
      labelEstadaDatePicker: txtLabelEstadaDatePicker,
      btnAdicionarEstada: {
        text: txtBtnAdicionarEstada,
        variant: 'outline-primary',
      },
    }));

    return {
      result,
      lastOccurrence,
    };
  }

  function handleAddEstadaBtnClick(cancelBtn = false) {
    let { clicked, disabled, variant, text, marginRightClass } =
      formState.btnAdicionarEstada;
    const { lastOccurrence } = ehUltimaOcorrenciaPastoSaida(oneAnimal);

    if (!clicked) {
      clicked = true;
      disabled = true;
      variant = 'outline-success';
      text = 'Confirmar';
      marginRightClass = 'me-2';
    } else {
      if (oneAnimal.estadaCurral.length && !lastOccurrence.dtSaidaCurral) {
        text = 'Nova Entrada';
        if (formState.ocorrenciaPastoToAdd) {
          if (!cancelBtn) {
            oneAnimal.estadaCurral[
              oneAnimal.estadaCurral.indexOf(lastOccurrence)
            ].dtSaidaCurral = formState.ocorrenciaPastoToAdd;
          }
          handleBtnSalvarAlteracoesClick();
          text = 'Nova Entrada';
        } else {
          text = 'Nova Saída';
          disabled = false;
        }
      } else {
        if (!cancelBtn && formState.ocorrenciaPastoToAdd) {
          oneAnimal.estadaCurral.push({
            dtEntradaCurral: formState.ocorrenciaPastoToAdd,
          });
          handleBtnSalvarAlteracoesClick();
          text = 'Nova Saída';
        } else {
          text = 'Nova Entrada';
          disabled = false;
        }
      }
      clicked = false;
      variant = 'outline-primary';
      marginRightClass = '';
    }

    setOneAnimal((prevState) => ({
      ...prevState,
      noCurral: Boolean(
        oneAnimal.estadaCurral.length &&
          !oneAnimal.estadaCurral[oneAnimal.estadaCurral.length - 1]
            .dtSaidaCurral
      ),
    }));

    setFormState((prevState) => ({
      ...prevState,
      ocorrenciaPastoToAdd: '',
      btnAdicionarEstada: {
        clicked,
        disabled,
        variant,
        text,
        marginRightClass,
      },
    }));
  }
  function handleAddPesagemBtnClick(cancelBtn = false) {
    let { clicked, disabled, variant, text, marginRightClass } =
      formState.btnAdicionarPesagem;

    if (!clicked) {
      clicked = true;
      disabled = true;
      variant = 'outline-success';
      text = 'Confirmar';
      marginRightClass = 'me-2';
    } else {
      if (
        !cancelBtn &&
        formState.ocorrenciaPesoToAdd.dtPesagem &&
        formState.ocorrenciaPesoToAdd.peso
      ) {
        oneAnimal.pesagem.push(formState.ocorrenciaPesoToAdd);
        setOneAnimal({
          ...oneAnimal,
          pesagem: oneAnimal.pesagem.sort(
            (a, b) =>
              new Date(a.dtPesagem).getTime() - new Date(b.dtPesagem).getTime()
          ),
        });
        handleBtnSalvarAlteracoesClick();
        text = 'Nova pesagem';
      } else if (!cancelBtn) {
        alert(
          'É necessário preencher o peso e a data da pesagem para cadastrar novo registro'
        );
      } else {
        text = 'Nova pesagem';
        disabled = false;
      }
      clicked = false;
      variant = 'outline-primary';
      marginRightClass = '';
    }
    setFormState((prevState) => ({
      ...prevState,
      ocorrenciaPesoToAdd: { dtPesagem: '', peso: '' },
      btnAdicionarPesagem: {
        clicked,
        disabled,
        variant,
        text,
        marginRightClass,
      },
    }));
  }

  function handleAddLitragemBtnClick(cancelBtn = false) {
    let { clicked, disabled, variant, text, marginRightClass } =
      formState.btnAdicionarLitragem;

    if (!clicked) {
      clicked = true;
      disabled = true;
      variant = 'outline-success';
      text = 'Confirmar';
      marginRightClass = 'me-2';
    } else {
      if (
        !cancelBtn &&
        formState.ocorrenciaLeiteToAdd.dtVerificacao &&
        formState.ocorrenciaLeiteToAdd.qtdLitros
      ) {
        oneAnimal.producaoLeite.push(formState.ocorrenciaLeiteToAdd);
        setOneAnimal({
          ...oneAnimal,
          producaoLeite: oneAnimal.producaoLeite.sort(
            (a, b) =>
              new Date(a.dtVerificacao).getTime() -
              new Date(b.dtVerificacao).getTime()
          ),
        });
        handleBtnSalvarAlteracoesClick();
        text = 'Nova litragem';
      } else if (!cancelBtn) {
        alert(
          'É necessário preencher os litros e a data da monitoração para cadastrar novo registro'
        );
      } else {
        text = 'Nova litragem';
        disabled = false;
      }
      clicked = false;
      variant = 'outline-primary';
      marginRightClass = '';
    }
    setFormState((prevState) => ({
      ...prevState,
      ocorrenciaLeiteToAdd: { dtVerificacao: '', qtdLitros: '' },
      btnAdicionarLitragem: {
        clicked,
        disabled,
        variant,
        text,
        marginRightClass,
      },
    }));
  }

  function handleAddHistoricoBtnClick(cancelBtn = false) {
    let { clicked, disabled, variant, text, marginRightClass } =
      formState.btnAdicionarHistorico;

    if (!clicked) {
      clicked = true;
      disabled = true;
      variant = 'outline-success';
      text = 'Confirmar';
      marginRightClass = 'me-2';
    } else {
      if (
        !cancelBtn &&
        formState.ocorrenciaHistoricoToAdd.dtHistorico &&
        formState.ocorrenciaHistoricoToAdd.descricao
      ) {
        oneAnimal.historico.push(formState.ocorrenciaHistoricoToAdd);
        setOneAnimal({
          ...oneAnimal,
          historico: oneAnimal.historico.sort(
            (a, b) =>
              new Date(a.dtHistorico).getTime() -
              new Date(b.dtHistorico).getTime()
          ),
        });
        handleBtnSalvarAlteracoesClick();
        text = 'Nova observação';
      } else if (!cancelBtn) {
        alert(
          'É necessário preencher a descrição e a data da observação para cadastrar novo registro'
        );
      } else {
        text = 'Nova observação';
        disabled = false;
      }
      clicked = false;
      variant = 'outline-primary';
      marginRightClass = '';
    }
    setFormState((prevState) => ({
      ...prevState,
      ocorrenciaHistoricoToAdd: {
        dtHistorico: formatDateToDefault(new Date(Date.now())),
        descricao: '',
      },
      btnAdicionarHistorico: {
        clicked,
        disabled,
        variant,
        text,
        marginRightClass,
      },
    }));
  }
  function handleBtnEditarDetalhesClick(e) {
    e.preventDefault();
    setFormState((prevState) => ({
      ...prevState,
      btnEditarDetalhes: { show: false },
    }));
  }

  async function handleBtnSalvarAlteracoesClick() {
    setFormState((prevState) => ({
      ...prevState,
      btnSalvarDetalhes: {
        text: 'Salvando...',
        loading: true,
      },
    }));

    try {
      let data = {
        ...oneAnimal,
        pesagem: oneAnimal.pesagem.sort(
          (a, b) =>
            new Date(a.dtPesagem).getTime() - new Date(b.dtPesagem).getTime()
        ),
      };
      delete data._id;
      await axios.put(`/${id}`, data);
      setNotification({
        type: 'success',
        title: 'Sucesso',
        text: 'Suas alterações foram salvas!',
        show: true,
      });
    } catch (e) {
      setNotification({
        type: 'danger',
        title: 'Erro',
        text: `Não foi possível salvar as alterações. Tente mais tarde.`,
        show: true,
      });
      console.error(e);
    } finally {
      setFormState((prevState) => ({
        ...prevState,
        btnEditarDetalhes: { show: true },
        btnSalvarDetalhes: {
          text: 'Salvar Alterações',
          loading: false,
        },
      }));
    }
  }

  async function handleBtnModalConfirmarExclusao(e) {
    e.preventDefault();
    setModalConfirmaExclusao((prevState) => ({
      ...prevState,
      btnConfirmar: {
        loading: true,
        text: 'Excluindo...',
      },
    }));
    try {
      await axios.delete(`/${id}`);
      navigate(-1);
    } catch (e) {
      setNotification({
        type: 'danger',
        title: 'Erro',
        text: `Não foi possível remover o animal. Tente mais tarde.`,
        show: true,
      });
      console.error(e);
    } finally {
      setModalConfirmaExclusao((prevState) => ({
        ...prevState,
        show: false,
        btnConfirmar: {
          loading: false,
          text: 'Confirmar',
        },
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
          <Container className="d-flex justify-content-between p-0">
            <Card.Title>Informações principais</Card.Title>
            <Button
              variant="danger"
              className="text-nowrap"
              style={{ maxHeight: 40 }}
              onClick={() =>
                setModalConfirmaExclusao({
                  ...modalConfirmaExclusao,
                  show: true,
                })
              }
            >
              Excluir Animal
            </Button>
          </Container>
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
                <fieldset disabled={!formState.btnEditarDetalhes.show}>
                  <Row>
                    <Col>
                      <Form.Check
                        type="switch"
                        id="sold-switch"
                        disabled
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
                        onChange={handleMorreuCheckButtonChange}
                      />
                    </Col>
                    <Col>
                      <Form.Check
                        type="switch"
                        id="sold-switch"
                        label="Vendido"
                        checked={oneAnimal.vendida}
                        className="text-nowrap"
                        onChange={handleVendaCheckButtonChange}
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
                  <Button
                    variant="primary"
                    className={`${
                      !formState.btnEditarDetalhes.show ? 'd-none' : ''
                    }`}
                    onClick={handleBtnEditarDetalhesClick}
                  >
                    Editar Detalhes
                  </Button>
                  <Container
                    className={`${
                      formState.btnEditarDetalhes.show
                        ? 'd-none'
                        : 'd-flex justify-content-end'
                    }`}
                  >
                    <Button
                      variant="success"
                      className="me-3"
                      disabled={formState.btnSalvarDetalhes.loading}
                      onClick={handleBtnSalvarAlteracoesClick}
                    >
                      {formState.btnSalvarDetalhes.text}
                    </Button>
                    <Button
                      variant="outline-danger"
                      onClick={async () => {
                        setFormState((prev) => ({
                          ...prev,
                          btnCancelarAlteracoes: {
                            text: 'Cancelando...',
                            disabled: true,
                          },
                        }));
                        try {
                          await getOneAnimal();
                        } catch (e) {
                          console.log(e);
                        } finally {
                          setFormState((prevState) => ({
                            ...prevState,
                            btnEditarDetalhes: {
                              show: true,
                            },
                            btnCancelarAlteracoes: {
                              text: 'Cancelar',
                              disabled: false,
                            },
                          }));
                        }
                      }}
                    >
                      Cancelar
                    </Button>
                  </Container>
                </Container>
                <Card.Subtitle>Dados do animal</Card.Subtitle>
              </Col>
            </Row>
            <Row className="gy-2 gx-3">
              <Col
                xs={{ span: 12, order: 1 }}
                md={6}
                className="pt-2"
              >
                <fieldset disabled={formState.btnEditarDetalhes.show}>
                  <Form.Group>
                    <Form.Label className="me-3">Sexo:</Form.Label>
                    <Form.Check
                      inline
                      label="Macho"
                      name="genderGroup"
                      type="radio"
                      id={`inline-radio-gender-1`}
                      checked={oneAnimal.sexo === 'MACHO'}
                      onChange={(_) =>
                        setOneAnimal((prevState) => ({
                          ...prevState,
                          sexo: 'MACHO',
                        }))
                      }
                    />
                    <Form.Check
                      inline
                      label="Fêmea"
                      name="genderGroup"
                      type="radio"
                      id={`inline-radio-gender-2`}
                      checked={oneAnimal.sexo === 'FEMEA'}
                      onChange={(_) =>
                        setOneAnimal((prevState) => ({
                          ...prevState,
                          sexo: 'FEMEA',
                        }))
                      }
                    />
                  </Form.Group>
                </fieldset>
              </Col>
              <Col
                xs={{ order: 2 }}
                md={6}
              >
                <fieldset disabled={formState.btnEditarDetalhes.show}>
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
                        onChange={(e) =>
                          setOneAnimal((prevState) => ({
                            ...prevState,
                            brinco: e.target.value,
                          }))
                        }
                      />
                    </Col>
                  </Form.Group>
                </fieldset>
              </Col>
              <Col
                xs={{ span: 12, order: 4 }}
                md={{ span: 6, order: 3 }}
              >
                <fieldset disabled={formState.btnEditarDetalhes.show}>
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
                </fieldset>
              </Col>
              <Col
                xs={{ span: 12, order: 3 }}
                md={{ span: 6, order: 4 }}
              >
                <fieldset disabled={formState.btnEditarDetalhes.show}>
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
                        onChange={(e) =>
                          setOneAnimal((prevState) => ({
                            ...prevState,
                            brincoDaMae: e.target.value,
                          }))
                        }
                      />
                    </Col>
                  </Form.Group>
                </fieldset>
              </Col>
              <Col
                xs={{ span: 12, order: 5 }}
                md={6}
              >
                <fieldset disabled={formState.btnEditarDetalhes.show}>
                  <Form.Group as={Row}>
                    <Form.Label
                      column
                      xs={4}
                      htmlFor="dt-cruzamento"
                    >
                      Cruzamento:
                    </Form.Label>
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
                </fieldset>
              </Col>
              <Col
                xs={{ span: 12, order: 1 }}
                md={6}
              >
                <Form.Group as={Row}>
                  <Form.Label
                    column
                    xs={4}
                    htmlFor="pasto"
                  >
                    Pasto:
                  </Form.Label>
                  <Col xs={8}>
                    <Form.Select
                      aria-label="Pastos da propriedade"
                      onChange={(e) => {
                        let data = { ...oneAnimal, pasto: e.target.value };
                        delete data._id;
                        axios.put(`/${id}`, data)
                        .then(getOneAnimal())
                        .then(()=>{setNotification({
        type: 'success',
        title: 'Sucesso',
        text: 'Novo pasto registrado para o animal',
        show: true,
      })})
                        .catch((err)=>{setNotification({
        type: 'danger',
        title: 'Erro',
        text: `Não foi possível alterar o pasto do animal. Tente mais tarde.`,
        show: true,
      })});
                      }}
                      defaultValue={oneAnimal.pasto}
                    >
                      {pasturesArray.map((p, i) => (
                        <option key={i}>{p}</option>
                      ))}
                    </Form.Select>
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            {!formState.btnEditarDetalhes.show && (
              <Form.Group
                as={Row}
                className="mt-3"
              >
                <Form.Label
                  column
                  xs={4}
                  md={3}
                  htmlFor="nome"
                >
                  Nome:
                </Form.Label>
                <Col>
                  <Form.Control
                    id="nome"
                    type="text"
                    value={oneAnimal.nome}
                    onChange={(e) =>
                      setOneAnimal((prevState) => ({
                        ...prevState,
                        nome: e.target.value,
                      }))
                    }
                  />
                </Col>
              </Form.Group>
            )}
            {oneAnimal.morreu && (
              <Form.Group className="mt-3">
              <Row className="mb-2">
              <Form.Label
                    column
                    xs={4}
                    md={3}
                    htmlFor="causa-morte"
                  >
                    Data da morte:
                  </Form.Label>
                  <Col>
                  <Form.Control
                      id="data-morte"
                      type="date"
                      value={oneAnimal.dtMorte}
                      onChange={(e) =>
                        setOneAnimal((prevState) => ({
                          ...prevState,
                          dtMorte: e.target.value,
                        }))
                      }
                    />
                  </Col>
                </Row>
                <Row>
                  <Form.Label
                    column
                    xs={4}
                    md={3}
                    htmlFor="causa-morte"
                  >
                    Causa da morte:
                  </Form.Label>
                  <Col>
                    <Form.Control
                      id="causa-morte"
                      as="textarea"
                      placeholder="Não informada"
                      rows={3}
                      value={oneAnimal.causaMorte}
                      onChange={(e) =>
                        setOneAnimal((prevState) => ({
                          ...prevState,
                          causaMorte: e.target.value,
                        }))
                      }
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button
                      className="mt-2"
                      onClick={handleBtnSalvarAlteracoesClick}
                    >
                      Salvar informação
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
            )}
            {oneAnimal.vendida && (
              <div>
                <Row className="mt-3 gy-2 gx-3">
                  <hr />
                  <Card.Subtitle>Dados da venda</Card.Subtitle>
                  <Col
                    xs={12}
                    md={6}
                    lg={4}
                  >
                    <Form.Group as={Row}>
                      <Form.Label
                        column
                        xs={3}
                        htmlFor="dt-venda"
                      >
                        Data:
                      </Form.Label>
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
                  <Col
                    xs={12}
                    md={6}
                    lg={4}
                  >
                    <Form.Group as={Row}>
                      <Form.Label
                        column
                        xs={3}
                        htmlFor="valor-venda"
                      >
                        Preço:
                      </Form.Label>
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
                  <Col
                    xs={12}
                    lg={4}
                  >
                    <Form.Group as={Row}>
                      <Form.Label
                        column
                        xs={3}
                        lg={5}
                        htmlFor="comprador"
                      >
                        Comprador:
                      </Form.Label>
                      <Col
                        xs={9}
                        lg={7}
                      >
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
                <Row>
                  <Button
                    className="mt-2"
                    onClick={handleBtnSalvarAlteracoesClick}
                  >
                    Salvar informação
                  </Button>
                </Row>
              </div>
            )}
            <Row className="mt-3 gy-2 gx-3">
              <hr />

              <Card.Subtitle>Estada no Curral</Card.Subtitle>
              <Col xs={12}>
                <fieldset disabled={formState.btnEditarDetalhes.show}>
                  <Table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Entrada</th>
                        <th>Saída</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {oneAnimal.estadaCurral.length <= 0 && (
                        <tr>
                          <td
                            colSpan={4}
                            className="text-center"
                          >
                            Não existem ocorrências cadastradas.
                          </td>
                        </tr>
                      )}
                      {oneAnimal.estadaCurral.length > 0 &&
                        oneAnimal.estadaCurral.map((estada, index) => (
                          <tr key={index}>
                            <td>
                              {oneAnimal.estadaCurral.indexOf(estada) + 1}
                            </td>
                            <td>
                              {estada.dtEntradaCurral &&
                                moment(estada.dtEntradaCurral).format(
                                  'DD/MM/yyyy'
                                )}
                            </td>
                            <td>
                              {estada.dtSaidaCurral &&
                                moment(estada.dtSaidaCurral).format(
                                  'DD/MM/yyyy'
                                )}
                            </td>
                            <td>
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => {
                                  const newEstadaCurral =
                                    oneAnimal.estadaCurral.filter(
                                      (estada, indexEstada) =>
                                        index !== indexEstada
                                    );
                                  setOneAnimal((prevState) => ({
                                    ...prevState,
                                    estadaCurral: newEstadaCurral,
                                    noCurral: false,
                                  }));
                                  setFormState((prevState) => ({
                                    ...prevState,
                                    btnAdicionarEstada: {
                                      ...formState.btnAdicionarEstada,
                                      text: 'Nova Entrada',
                                    },
                                  }));
                                }}
                              >
                                Excluir
                              </Button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </fieldset>
              </Col>
              <Col
                xs={12}
                md={4}
                className="align-self-center"
              >
                <Button
                  disabled={formState.btnAdicionarEstada.disabled}
                  variant={formState.btnAdicionarEstada.variant}
                  className={formState.btnAdicionarEstada.marginRightClass}
                  onClick={() => handleAddEstadaBtnClick()}
                >
                  {formState.btnAdicionarEstada.text}
                </Button>
                {formState.btnAdicionarEstada.clicked && (
                  <Button
                    variant="outline-danger"
                    onClick={(e) => handleAddEstadaBtnClick(true)}
                  >
                    Cancelar
                  </Button>
                )}
              </Col>
              {formState.btnAdicionarEstada.clicked && (
                <Col
                  xs={12}
                  md={4}
                >
                  <FloatingLabel
                    controlId="floating-entrada-curral"
                    label={formState.labelEstadaDatePicker}
                  >
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
                            disabled:
                              !e.target.value &&
                              prevState.btnAdicionarEstada.clicked,
                          },
                        }))
                      }
                    />
                  </FloatingLabel>
                </Col>
              )}
            </Row>
            {/*Formulário da pesagem*/}
            <Row className="mt-3 gy-2 gx-3">
              <hr />
              <Card.Subtitle>Peso</Card.Subtitle>
              <Col xs={12}>
                <fieldset disabled={formState.btnEditarDetalhes.show}>
                  <Table>
                    <thead>
                      <tr>
                        <th style={{ width: '10%' }}>#</th>
                        <th style={{ width: '14%' }}>Peso</th>
                        <th style={{ width: '28%' }}>Data da pesagem</th>
                        <th style={{ width: '28%' }}>Meses na pesagem</th>
                        <th style={{ width: '20%' }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {oneAnimal.pesagem.length <= 0 && (
                        <tr>
                          <td
                            colSpan={4}
                            className="text-center"
                          >
                            Não existem ocorrências cadastradas.
                          </td>
                        </tr>
                      )}
                      {oneAnimal.pesagem.length > 0 &&
                        oneAnimal.pesagem.map((elemento, index) => (
                          <tr key={index}>
                            <td>{oneAnimal.pesagem.indexOf(elemento) + 1}</td>
                            <td>{elemento.peso}</td>
                            <td>
                              {moment(elemento.dtPesagem).format('DD/MM/yyyy')}
                            </td>
                            <td>
                              {calculateMonths(
                                oneAnimal.dtNascimento,
                                elemento.dtPesagem
                              )}
                            </td>
                            <td>
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => {
                                  const newPesagem = oneAnimal.pesagem.filter(
                                    (elemento, indexelemento) =>
                                      index !== indexelemento
                                  );
                                  setOneAnimal((prevState) => ({
                                    ...prevState,
                                    pesagem: newPesagem,
                                  }));
                                }}
                              >
                                Excluir
                              </Button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </fieldset>
              </Col>
              <Col
                xs={12}
                md={4}
                className="align-self-center"
              >
                <Button
                  disabled={formState.btnAdicionarPesagem.disabled}
                  variant={formState.btnAdicionarPesagem.variant}
                  className={formState.btnAdicionarPesagem.marginRightClass}
                  onClick={() => handleAddPesagemBtnClick()}
                >
                  {formState.btnAdicionarPesagem.text}
                </Button>
                {formState.btnAdicionarPesagem.clicked && (
                  <Button
                    variant="outline-danger"
                    onClick={(e) => handleAddPesagemBtnClick(true)}
                  >
                    Cancelar
                  </Button>
                )}
              </Col>
              {formState.btnAdicionarPesagem.clicked && (
                <Col
                  xs={12}
                  md={4}
                >
                  <FloatingLabel
                    controlId="floating-entrada-curral"
                    label={'Data da Pesagem'}
                  >
                    <Form.Control
                      type="date"
                      placeholder="Data da pesagem"
                      defaultValue=""
                      onChange={(e) =>
                        setFormState((prevState) => ({
                          ...prevState,
                          ocorrenciaPesoToAdd: {
                            ...prevState.ocorrenciaPesoToAdd,
                            dtPesagem: e.target.value,
                          },
                          btnAdicionarPesagem: {
                            ...prevState.btnAdicionarPesagem,
                            disabled:
                              !e.target.value &&
                              prevState.btnAdicionarPesagem.clicked,
                          },
                        }))
                      }
                    />
                  </FloatingLabel>
                </Col>
              )}
              {formState.btnAdicionarPesagem.clicked && (
                <Col
                  xs={12}
                  md={4}
                >
                  <FloatingLabel
                    controlId="floating-entrada-curral"
                    label={'Peso'}
                  >
                    <Form.Control
                      type="number"
                      step=".01"
                      placeholder="Peso"
                      defaultValue=""
                      onChange={(e) =>
                        setFormState((prevState) => ({
                          ...prevState,
                          ocorrenciaPesoToAdd: {
                            ...prevState.ocorrenciaPesoToAdd,
                            peso: e.target.value,
                          },
                          btnAdicionarPesagem: {
                            ...prevState.btnAdicionarPesagem,
                            disabled:
                              !e.target.value &&
                              prevState.btnAdicionarPesagem.clicked,
                          },
                        }))
                      }
                    />
                  </FloatingLabel>
                </Col>
              )}
            </Row>
            {/*Formulário de Litragem*/}

            {oneAnimal.sexo === 'FEMEA' && (
              <Row className="mt-3 gy-2 gx-3">
                <hr />
                <Card.Subtitle>Produção de leite</Card.Subtitle>
                <Col xs={12}>
                  <fieldset disabled={formState.btnEditarDetalhes.show}>
                    <Table>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Litros</th>
                          <th>Data</th>
                          <th>Idade na verificação</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {oneAnimal.producaoLeite.length <= 0 && (
                          <tr>
                            <td
                              colSpan={4}
                              className="text-center"
                            >
                              Não existem ocorrências cadastradas.
                            </td>
                          </tr>
                        )}
                        {oneAnimal.producaoLeite.length > 0 &&
                          oneAnimal.producaoLeite.map((elemento, index) => (
                            <tr key={index}>
                              <td>
                                {oneAnimal.producaoLeite.indexOf(elemento) + 1}
                              </td>
                              <td>{elemento.qtdLitros}</td>
                              <td>
                                {moment(elemento.dtVerificacao).format(
                                  'DD/MM/yyyy'
                                )}
                              </td>
                              <td>
                                {calculateMonths(
                                  oneAnimal.dtNascimento,
                                  elemento.dtVerificacao
                                )}
                              </td>
                              <td>
                                <Button
                                  variant="danger"
                                  size="sm"
                                  onClick={() => {
                                    const newLitragem =
                                      oneAnimal.producaoLeite.filter(
                                        (elemento, indexelemento) =>
                                          index !== indexelemento
                                      );
                                    setOneAnimal((prevState) => ({
                                      ...prevState,
                                      producaoLeite: newLitragem,
                                    }));
                                  }}
                                >
                                  Excluir
                                </Button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>
                  </fieldset>
                </Col>
                <Col
                  xs={12}
                  md={4}
                  className="align-self-center"
                >
                  <Button
                    disabled={formState.btnAdicionarLitragem.disabled}
                    variant={formState.btnAdicionarLitragem.variant}
                    className={formState.btnAdicionarLitragem.marginRightClass}
                    onClick={() => handleAddLitragemBtnClick()}
                  >
                    {formState.btnAdicionarLitragem.text}
                  </Button>
                  {formState.btnAdicionarLitragem.clicked && (
                    <Button
                      variant="outline-danger"
                      onClick={(e) => handleAddLitragemBtnClick(true)}
                    >
                      Cancelar
                    </Button>
                  )}
                </Col>
                {formState.btnAdicionarLitragem.clicked && (
                  <Col
                    xs={12}
                    md={4}
                  >
                    <FloatingLabel
                      controlId="floating-entrada-curral"
                      label={'Data da Verificação'}
                    >
                      <Form.Control
                        type="date"
                        placeholder="Data da Verificação"
                        defaultValue=""
                        onChange={(e) =>
                          setFormState((prevState) => ({
                            ...prevState,
                            ocorrenciaLeiteToAdd: {
                              ...prevState.ocorrenciaLeiteToAdd,
                              dtVerificacao: e.target.value,
                            },
                            btnAdicionarLitragem: {
                              ...prevState.btnAdicionarLitragem,
                              disabled:
                                !e.target.value &&
                                prevState.btnAdicionarLitragem.clicked,
                            },
                          }))
                        }
                      />
                    </FloatingLabel>
                  </Col>
                )}
                {formState.btnAdicionarLitragem.clicked && (
                  <Col
                    xs={12}
                    md={4}
                  >
                    <FloatingLabel
                      controlId="floating-entrada-curral"
                      label={'Litros'}
                    >
                      <Form.Control
                        type="number"
                        step=".01"
                        placeholder="Litros"
                        defaultValue=""
                        onChange={(e) =>
                          setFormState((prevState) => ({
                            ...prevState,
                            ocorrenciaLeiteToAdd: {
                              ...prevState.ocorrenciaLeiteToAdd,
                              qtdLitros: e.target.value,
                            },
                            btnAdicionarLitragem: {
                              ...prevState.btnAdicionarLitragem,
                              disabled:
                                !e.target.value &&
                                prevState.btnAdicionarLitragem.clicked,
                            },
                          }))
                        }
                      />
                    </FloatingLabel>
                  </Col>
                )}
              </Row>
            )}
            <Row
              xs={1}
              md={1}
              lg={2}
              xl={2}
            >
              <Col>
                <Charts
                  chartTitle="Evolução do peso"
                  dataTitle={oneAnimal.nome}
                  chartLabels={oneAnimal.pesagem.map((e) => e.dtPesagem)}
                  chartData={oneAnimal.pesagem.map((e) => e.peso)}
                  lineColor="red"
                  barColor="rgba(255, 99, 132, 0.5)"
                  type="line"
                />
              </Col>
              {oneAnimal.sexo === 'FEMEA' && (
                <Col>
                  <Charts
                    chartTitle="Produção de leite"
                    dataTitle={oneAnimal.nome}
                    chartLabels={oneAnimal.producaoLeite.map(
                      (e) => e.dtVerificacao
                    )}
                    chartData={oneAnimal.producaoLeite.map((e) => e.qtdLitros)}
                    lineColor="black"
                    barColor="rgba(106, 121, 247, 0.5)"
                    type="bar"
                  />
                </Col>
              )}
            </Row>
            {/*Formulário de observações*/}
            <Row className="mt-3 gy-2 gx-3">
              <hr />
              <Card.Subtitle>Observações do animal</Card.Subtitle>
              <Col xs={12}>
                <fieldset disabled={formState.btnEditarDetalhes.show}>
                  <Table>
                    <thead>
                      <tr>
                        <th style={{ width: '10%' }}>#</th>
                        <th style={{ width: '20%' }}>Data da observação</th>
                        <th style={{ width: '50%' }}>Relato</th>
                        <th style={{ width: '20%' }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {oneAnimal.historico.length <= 0 && (
                        <tr>
                          <td
                            colSpan={4}
                            className="text-center"
                          >
                            Não existem ocorrências cadastradas.
                          </td>
                        </tr>
                      )}
                      {oneAnimal.historico.length > 0 &&
                        oneAnimal.historico.map((elemento, index) => (
                          <tr key={index}>
                            <td>{oneAnimal.historico.indexOf(elemento) + 1}</td>
                            <td>
                              {moment(elemento.dtHistorico).format(
                                'DD/MM/yyyy'
                              )}
                            </td>
                            <td>{elemento.descricao}</td>
                            <td>
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => {
                                  const newHistorico =
                                    oneAnimal.historico.filter(
                                      (elemento, indexelemento) =>
                                        index !== indexelemento
                                    );
                                  setOneAnimal((prevState) => ({
                                    ...prevState,
                                    historico: newHistorico,
                                  }));
                                }}
                              >
                                Excluir
                              </Button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </fieldset>
              </Col>
              <Col
                xs={12}
                md={4}
                className="align-self-center"
              >
                <Button
                  disabled={formState.btnAdicionarHistorico.disabled}
                  variant={formState.btnAdicionarHistorico.variant}
                  className={formState.btnAdicionarHistorico.marginRightClass}
                  onClick={() => handleAddHistoricoBtnClick()}
                >
                  {formState.btnAdicionarHistorico.text}
                </Button>
                {formState.btnAdicionarHistorico.clicked && (
                  <Button
                    variant="outline-danger"
                    onClick={(e) => handleAddHistoricoBtnClick(true)}
                  >
                    Cancelar
                  </Button>
                )}
              </Col>
              {formState.btnAdicionarHistorico.clicked && (
                <Col
                  xs={12}
                  md={4}
                >
                  <FloatingLabel
                    controlId="floating-entrada-curral"
                    label={'Data da Observação'}
                  >
                    <Form.Control
                      type="date"
                      placeholder="Data da Observação"
                      defaultValue={formatDateToDefault(new Date(Date.now()))}
                      onChange={(e) =>
                        setFormState((prevState) => ({
                          ...prevState,
                          ocorrenciaHistoricoToAdd: {
                            ...prevState.ocorrenciaHistoricoToAdd,
                            dtHistorico: e.target.value,
                          },
                          btnAdicionarHistorico: {
                            ...prevState.btnAdicionarHistorico,
                            disabled:
                              !e.target.value &&
                              prevState.btnAdicionarHistorico.clicked,
                          },
                        }))
                      }
                    />
                  </FloatingLabel>
                </Col>
              )}
            </Row>
            {formState.btnAdicionarHistorico.clicked && (
              <Row>
                <Col>
                  <FloatingLabel
                    controlId="floating-entrada-curral"
                    label={'Observação'}
                  >
                    <Form.Control
                      type="textarea"
                      rows={3}
                      placeholder="observação"
                      defaultValue=""
                      onChange={(e) =>
                        setFormState((prevState) => ({
                          ...prevState,
                          ocorrenciaHistoricoToAdd: {
                            ...prevState.ocorrenciaHistoricoToAdd,
                            descricao: e.target.value,
                          },
                          btnAdicionarHistorico: {
                            ...prevState.btnAdicionarHistorico,
                            disabled:
                              !e.target.value &&
                              prevState.btnAdicionarHistorico.clicked,
                          },
                        }))
                      }
                    />
                  </FloatingLabel>
                </Col>
              </Row>
            )}

            {/*<Row className="mt-3 gy-2 gx-3">*/}
            {/*  <hr/>*/}
            {/*  <Card.Subtitle>Histórico</Card.Subtitle>*/}
            {/*</Row>*/}
          </Form>
        </Card.Body>
      </Card>

      <Notification
        show={notification.show}
        setShow={setNotificationShow}
        type={notification.type}
        title={notification.title}
        delay={notification.delay}
        text={notification.text}
      />

      <Modal
        show={modalConfirmaExclusao.show}
        onHide={() =>
          setModalConfirmaExclusao({ ...modalConfirmaExclusao, show: false })
        }
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmação</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Você deseja realmente excluir o registro deste animal?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={() =>
              setModalConfirmaExclusao({
                ...modalConfirmaExclusao,
                show: false,
              })
            }
          >
            Cancelar
          </Button>
          <Button
            variant="danger"
            disabled={modalConfirmaExclusao.btnConfirmar.loading}
            onClick={handleBtnModalConfirmarExclusao}
          >
            {modalConfirmaExclusao.btnConfirmar.text}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
