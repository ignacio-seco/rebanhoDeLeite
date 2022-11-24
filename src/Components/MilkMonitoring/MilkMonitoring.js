import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import {
  calculateAge,
  filterMonths,
  formatDate,
  formatDateToDefault,
} from "../../helpers/CalculateAge";

export default function MilkMonitoring({ cattle, getCattle }) {
  useEffect(getCattle, [cattle.length]);
  let filterToMonitor = (data) => {
    return data.filter(
      (cow) =>
        !(cow.morreu || cow.vendida) &&
        cow.noCurral &&
        cow.sexo === "FEMEA" &&
        cow.producaoLeite[cow.producaoLeite.length - 1].dtVerificacao !==
          formatDateToDefault(new Date(Date.now())) &&
        filterMonths(cow.dtNascimento) > 11
    );
  };
  let [filteredData, setFilteredData] = useState(filterToMonitor(cattle));
  useMemo(() => {
    setFilteredData(filterToMonitor(cattle));
  }, [cattle.length]);

  function postIt(id, object, originArray, index) {
    let newArray = [...originArray];
    delete object._id;
    axios
      .put(`https://ironrest.cyclic.app/cattleControl/${id}`, object)
      .then(originArray[index])
      .then(newArray.splice(index, 1))
      .then(setFilteredData(newArray))
      .catch((err) => alert(err));
  }

  function renderTable(data) {
    let milkTable = data.map((cow, i) => {
      return (
        <tr key={i}>
          <td>{cow.brinco}</td>
          <td>{cow.nome}</td>
          <td>{calculateAge(cow.dtNascimento)}</td>
          <td>
            {formatDate(
              cow.estadaCurral[cow.estadaCurral.length - 1].dtEntradaCurral
            )}
          </td>
          <td>
            {calculateAge(
              cow.estadaCurral[cow.estadaCurral.length - 1].dtEntradaCurral
            )}
          </td>
          <td>
            <Form
              onSubmit={(e) => {
                if (e.target[0].value === "" || e.target[0].value === "0") {
                  alert("nenhum dado de produção apontado");
                  e.preventDefault();
                } else {
                  e.preventDefault();
                  filteredData[i] = {
                    ...filteredData[i],
                    producaoLeite: [
                      ...filteredData[i].producaoLeite,
                      {
                        qtdLitros: e.target[0].value,
                        dtVerificacao: formatDateToDefault(
                          new Date(Date.now())
                        ),
                      },
                    ],
                  };
                  e.target[0].value = "";
                  let newAnimal = filteredData[i];
                  let id = newAnimal._id;
                  postIt(id, newAnimal, filteredData, i);
                }
                console.log(filteredData);
              }}
            >
              <Row>
                <Col style={{ width: "80%" }}>
                  <Form.Control
                    type="number"
                    min="0"
                    step=".01"
                    name="qtdLitros"
                  />
                </Col>
                <Col>
                  <Button type="submit">Registrar litragem</Button>
                </Col>
              </Row>
            </Form>
          </td>
        </tr>
      );
    });
    return milkTable;
  }

  return (
    <Container>
      <Table
        striped
        bordered
        hover
      >
        <thead
          className="sticky-top"
          style={{ backgroundColor: "white" }}
        >
          <tr>
            <th>Brinco</th>
            <th>Nome</th>
            <th>Idade</th>
            <th>Entrada no curral</th>
            <th>Tempo no curral</th>
            <th>Litragem Monitorada</th>
          </tr>
        </thead>
        <tbody>{renderTable(filteredData)}</tbody>
      </Table>
    </Container>
  );
}
