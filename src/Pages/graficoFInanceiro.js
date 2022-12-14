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
  const [dateMin, setDateMin] = useState(formatDateToDefault(new Date(Date.now() -31* 24 * 60 * 60 * 1000)));
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
    let pureResult=[...result]
    for (let i = 0; i < sortedData.length; i++) {
      let newObj = {
        valor: result[i].valor + Number(sortedData[i].valor),
        data: sortedData[i].dtGanho
          ? sortedData[i].dtGanho
          : sortedData[i].dtGasto,
      };
      let newPureObj={        
        valor: Number(sortedData[i].valor),
        data: sortedData[i].dtGanho
          ? sortedData[i].dtGanho
          : sortedData[i].dtGasto,
      }
      pureResult.push(newPureObj);
      result.push(newObj);
    }
    let dtDif = new Date(dateMax).getTime() - new Date(dateMin).getTime();
    let initialDate = new Date(dateMin).getTime();
    let daysDif = dtDif / (24 * 60 * 60 * 1000);
    if (daysDif < 366) { console.log(daysDif)//Aqui que seto quantos dias o grafico gera a linha detalhada
      for (let i = 0; i < daysDif; i++) {
        pureResult.push({
          valor: 0,
          data: formatDateToDefault(
            new Date(initialDate + i * 24 * 60 * 60 * 1000)
          ),
        });
      }
      let newResult = pureResult.sort(
        (a, b) => new Date(a.data).getTime() - new Date(b.data).getTime()
      );
      console.log("this is the new result",newResult)
      let consolidateArray = [{...newResult[0]}];
      for (let i = 1; i < newResult.length; i++) {
        console.log("this is the data",consolidateArray[consolidateArray.length - 1])
        if (
          newResult[i].data ===
          consolidateArray[consolidateArray.length - 1].data
        ) {
          consolidateArray[consolidateArray.length - 1].valor +=
            newResult[i].valor;
        } else {
          consolidateArray.push({data:newResult[i].data,
        valor:consolidateArray[consolidateArray.length - 1].valor +
        newResult[i].valor});
        }
      }
      console.log(consolidateArray)
      return consolidateArray
    } else {
      console.log(result);
      return result;
    }
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
            <tr
              key={index}
              style={elemento.valor > 0 ? { color: 'green' } : { color: 'red' }}
            >
              <td>{filteredData.indexOf(elemento) + 1}</td>
              <td>
                {formatDate(elemento.dtGasto ? elemento.dtGasto : elemento.dtGanho)}
              </td>
              <td>{`R$ ${Number(elemento.valor).toLocaleString('pt-BR')}`}</td>
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
                  <td></td>
                  <th scope="row">Total:</th>
                  <td
                    style={
                      calculateTotal() < 0
                        ? { color: 'red' }
                        : { color: 'green' }
                    }
                  >
                    R$ {calculateTotal().toLocaleString('pt-BR')}
                  </td>
                </tr>
              </tfoot>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
