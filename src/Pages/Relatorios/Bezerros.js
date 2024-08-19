import { useContext, useEffect, useState } from 'react';
import {
  ButtonGroup,
  Col,
  Container,
  Form,
  Row,
  ToggleButton,
} from 'react-bootstrap';
import ReportsTable from '../../Components/Reports/ReportsTable';
import { AuthContext } from '../../contexts/authContext';
import { filterMonths } from '../../helpers/CalculateAge';

export default function Bezerros() {
  const [filterAge, setFilterAge] = useState(false);
  const [filterSex, setFilterSex] = useState(false);
  const [filterWeight, setFilterWeight] = useState(false);
  const [mesesMax, setMesesMax] = useState(120);
  const [mesesMin, setMesesMin] = useState(0);
  const [pesoMax, setPesoMax] = useState(2500);
  const [pesoMin, setPesoMin] = useState(0);
  const [sexToFilter, setSexToFilter] = useState('');
  const { data, getData, loading } = useContext(AuthContext);
  let cattle = data.rebanho.filter((cow) => !cow.dadosServidor.deletado);
  let getCattle = getData;
  useEffect(() => {
    getCattle();
  }, []);

  if (loading) {
    return <h3>loading...</h3>;
  } else {
    const sortedCattle = () => {
      cattle = cattle.filter(
        (cow) => !(cow.dadosMorte.morreu || cow.dadosVenda.vendida)
      );
      filterAge &&
        (cattle = cattle.filter(
          (cow) =>
            filterMonths(cow.dtNascimento) > mesesMin - 1 &&
            filterMonths(cow.dtNascimento) < mesesMax + 1
        ));
      filterWeight &&
        (cattle = cattle
          .map((cow) => {
            return {
              ...cow,
              pesagem: cow.pesagem.sort(
                (a, b) =>
                  new Date(a.dtPesagem).getTime() -
                  new Date(b.dtPesagem).getTime()
              ),
            };
          })
          .filter(
            (cow) =>
              cow.pesagem.length > 0 &&
              Number(cow.pesagem[cow.pesagem.length - 1].peso) >
                pesoMin - 0.01 &&
              Number(cow.pesagem[cow.pesagem.length - 1].peso) < pesoMax + 0.01
          ));
      filterSex &&
        (cattle = cattle.filter((cow) => cow.sexo.indexOf(sexToFilter) !== -1));

      return cattle.sort(
        (a, b) => filterMonths(a.dtNascimento) - filterMonths(b.dtNascimento)
      );
    };

    return (
      <div style={{ width: '100%', height: '90vh', overflow: 'auto' }}>
        <Container>
          <h2 style={{ textAlign: 'center' }}>Filtrar animais</h2>
          <Form.Check
            type="switch"
            className="text-start text-nowrap"
            id="idade-switch"
            size="lg"
            name="Filtrar por idade"
            checked={filterAge}
            label={`Filtrar por idade`}
            onChange={(_) => {
              setFilterAge(!filterAge);
            }}
          />
          {filterAge && (
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Idade mínima (meses)</Form.Label>
                  <Form.Control
                    type="number"
                    value={mesesMin}
                    onChange={(e) => setMesesMin(Number(e.currentTarget.value))}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Idade máxima (meses)</Form.Label>
                  <Form.Control
                    type="number"
                    value={mesesMax}
                    onChange={(e) => setMesesMax(Number(e.currentTarget.value))}
                  />
                </Form.Group>
              </Col>
            </Row>
          )}
          <Form.Check
            type="switch"
            className="text-start text-nowrap"
            id="idade-switch"
            size="lg"
            name="Filtrar por último peso"
            checked={filterWeight}
            label={`Filtrar por último peso`}
            onChange={(_) => {
              setFilterWeight(!filterWeight);
            }}
          />
          {filterWeight && (
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Peso Mínimo(kg)</Form.Label>
                  <Form.Control
                    type="number"
                    value={pesoMin}
                    onChange={(e) => setPesoMin(Number(e.currentTarget.value))}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Peso máximo (kg)</Form.Label>
                  <Form.Control
                    type="number"
                    value={pesoMax}
                    onChange={(e) => setPesoMax(Number(e.currentTarget.value))}
                  />
                </Form.Group>
              </Col>
            </Row>
          )}
          <Form.Check
            type="switch"
            className="text-start text-nowrap"
            id="idade-switch"
            size="lg"
            name="Filtrar por sexo"
            checked={filterSex}
            label={`Filtrar por sexo`}
            onChange={(_) => {
              setFilterSex(!filterSex);
            }}
          />
          {filterSex && (
            <ButtonGroup
              className="d-flex justify-content-around align-itens-center"
              name="sexo"
              value={sexToFilter}
            >
              <ToggleButton
                id={`radio-0`}
                type="radio"
                variant={0 % 2 ? 'outline-success' : 'outline-danger'}
                name="sexo"
                value="MACHO"
                checked={sexToFilter === 'MACHO'}
                onChange={(e) => {
                  setSexToFilter(e.currentTarget.value);
                }}
              >
                Macho
              </ToggleButton>
              <ToggleButton
                id={`radio-1`}
                type="radio"
                variant={1 % 2 ? 'outline-success' : 'outline-danger'}
                name="sexo"
                value="FEMEA"
                checked={sexToFilter === 'FEMEA'}
                onChange={(e) => {
                  setSexToFilter(e.currentTarget.value);
                }}
              >
                Fêmea
              </ToggleButton>
            </ButtonGroup>
          )}
        </Container>

        <ReportsTable data={sortedCattle(mesesMin, mesesMax)} />
      </div>
    );
  }
}
