import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import {
  calculateAge,
  formatDate,
  formatDateToDefault,
  stringEqualizer,
} from "../../helpers/CalculateAge";

export default function MilkMonitoring({ cattle, getCattle }) {
  useEffect(getCattle, []);
  let [search, setSearch] = useState("");

  function postIt(id, object) {
    delete object._id;
    axios
      .put(`https://ironrest.cyclic.app/cattleControl/${id}`, object)
      .then(setSearch(""))
      .then(getCattle)
      .catch((err) => alert(err));
  }

  function renderTable() {
    let filteredData = cattle
      .filter(
        (cow) =>
          !(cow.morreu || cow.vendida) &&
          (cow.pesagem.length > 0
            ? cow.pesagem[cow.pesagem.length - 1].dtPesagem !==
              formatDateToDefault(new Date(Date.now()))
            : true)
      )
      .sort((a, b) => Number(a.brinco) - Number(b.brinco));
    search &&
      (filteredData = filteredData.filter(
        (cow) =>
          cow.brinco.indexOf(search) !== -1 ||
          stringEqualizer(cow.nome).indexOf(stringEqualizer(search)) !== -1
      ));
    return filteredData.map((cow, i) => {
      return (
        <tr key={i}>
          <td>{cow.brinco}</td>
          <td>{cow.nome}</td>
          <td>{calculateAge(cow.dtNascimento)}</td>
          <td>
            {cow.pesagem.length > 0
              ? formatDate(cow.pesagem[cow.pesagem.length - 1].dtPesagem)
              : ""}
          </td>
          <td>
            {cow.pesagem.length > 0
              ? cow.pesagem[cow.pesagem.length - 1].peso
              : ""}
          </td>
          <td>
            <Form
              onSubmit={(e) => {
                if (e.target[0].value === "" || e.target[0].value === "0") {
                  alert("nenhum dado de peso apontado");
                  e.preventDefault();
                } else {
                  e.preventDefault();
                  filteredData[i] = {
                    ...filteredData[i],
                    pesagem: [
                      ...filteredData[i].pesagem,
                      {
                        peso: e.target[0].value,
                        dtPesagem: formatDateToDefault(new Date(Date.now())),
                      },
                    ],
                  };
                  console.log(e);
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
                    name="peso"
                  />
                </Col>
                <Col>
                  <Button type="submit">Registrar pesagem</Button>
                </Col>
              </Row>
            </Form>
          </td>
        </tr>
      );
    });
  }

  return (
    <div>
      <Container className="sticky-top">
        <Form.Control
          type="search"
          placeholder="Digite o nome ou nº de brinco"
          className="mb-4"
          value={search}
          aria-label="Search"
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
      </Container>
      <Container>
        <Table
          striped
          bordered
          hover
        >
          <thead
            className="sticky-top"
            style={{ backgroundColor: "white", top:"2.4em" }}
          >
            <tr>
              <th>Brinco</th>
              <th>Nome</th>
              <th>Idade</th>
              <th>Última Pesagem</th>
              <th>Último Peso</th>
              <th>Registrar novo peso</th>
            </tr>
          </thead>
          <tbody>{renderTable()}</tbody>
        </Table>
      </Container>
    </div>
  );
}
