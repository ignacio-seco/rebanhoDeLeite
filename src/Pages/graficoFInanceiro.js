import {
  formatDate,
  formatDateToDefault,
  getLastUpdate,
} from '../helpers/CalculateAge';
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
import { Charts } from '../Components/Charts/Chart';

export default function GraficoFinanceiro() {
  const { data, loading, getData, user, setData } = useContext(AuthContext);
  const [dateMin, setDateMin] = useState(formatDateToDefault(new Date(0)));
  const [dateMax, setDateMax] = useState(
    formatDateToDefault(new Date(Date.now() + 24 * 60 * 60 * 1000))
  );

  function firstSort() {
    const filteredGanhos = data.ganhos.filter(
      (element) =>
        !element.dadosServidor.deletado &&
        new Date(element.dtGanho).getTime() >
          new Date(dateMin).getTime() - 24 * 60 * 60 * 1000 &&
        new Date(element.dtGanho).getTime() <
          new Date(dateMax).getTime() + 24 * 60 * 60 * 1000
    );
    const filteredGastos = data.gastos.filter(
      (element) =>
        !element.dadosServidor.deletado &&
        new Date(element.dtGasto).getTime() >
          new Date(dateMin).getTime() - 24 * 60 * 60 * 1000 &&
        new Date(element.dtGasto).getTime() <
          new Date(dateMax).getTime() + 24 * 60 * 60 * 1000
    );
    const allData = [];
    filteredGanhos.forEach((element) => {
      allData.push(element);
    });
    filteredGastos.forEach((element) => {
      allData.push(element);
    });
    const sortedData = allData.sort(
      (a, b) =>
        new Date(a.dtGanho ? a.dtGanho : a.dtGasto).getTime() -
        new Date(b.dtGanho ? b.dtGanho : b.dtGasto).getTime()
    );
    return sortedData;
  }

  const filterData = () => {
    const sortedData = firstSort();
    let result = [
      {
        valor: 0,
        data: formatDateToDefault(
          new Date(new Date(dateMin).getTime() - 24 * 60 * 60 * 1000)
        ),
      },
    ];
    for (let i = 0; i < sortedData.length; i++) {
      let newObj = {
        valor: result[i].valor + Number(sortedData[i].valor),
        data: sortedData[i].dtGanho
          ? sortedData[i].dtGanho
          : sortedData[i].dtGasto,
      };
      result.push(newObj);
    }
    console.log(result);
    return result;
  };

  const renderAllDataTable = () => {
    let filteredData = firstSort();
    if (filteredData.length === 0) {
      return (
        <tbody>
          <tr>
            <td
              colSpan={4}
              className="text-center"
            >
              Não existem lançamentos cadastrados.
            </td>
          </tr>
        </tbody>
      );
    } else
      return (
        <tbody>
          {filteredData.map((elemento, index) => (
            <tr key={index} style={elemento.valor>0 ? {color:"green"} : {color:"red"}}>
              <td>{filteredData.indexOf(elemento) + 1}</td>
              <td>
                {formatDate(
                  elemento.dtGasto ? elemento.dtGasto : elemento.dtGanho
                )}
              </td>
              <td>{elemento.valor}</td>
              <td>{elemento.descricao}</td>
            </tr>
          ))}
        </tbody>
      );
  };
  const calculateTotal = () => {
    let filteredData = firstSort();
    let result = 0;
    filteredData.forEach((element) => {
      result = result + Number(element.valor);
    });
    return result;
  };

  return (
    <div>
      <Container>
        <h2 style={{ textAlign: 'center' }}>Filtrar período</h2>
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
      <Container>
        <Charts
          chartTitle="Evolução financeira"
          dataTitle="Consolidado financeiro"
          chartLabels={filterData().map((e) => e.data)}
          chartData={filterData().map((e) => e.valor)}
          lineColor="green"
          barColor="rgba(255, 99, 132, 0.5)"
          type="line"
        />
      </Container>
      <Container>
        <Row className="mt-3 gy-2 gx-3">
          <hr />
          <Card.Subtitle>Lançamentos do período</Card.Subtitle>
          <Col xs={12}>
            <Table
              bordered
              hover
            >
              <thead
                className="sticky-top"
                style={{ top: '5em', backgroundColor: 'white' }}
              >
                <tr>
                  <th>#</th>
                  <th>Data</th>
                  <th>Valor</th>
                  <th>Descrição</th>
                </tr>
              </thead>
              {renderAllDataTable()}
              <tfoot>
                <tr>
                  <th scope="row">Total:</th>
                  <td style={calculateTotal()<0 ? {color:"red"} : {color:"green"}}>{calculateTotal()}</td>
                </tr>
              </tfoot>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
