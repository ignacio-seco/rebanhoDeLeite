import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import {
  calculateAge,
  formatDate,
  formatDateToDefault,
  getLastUpdate,
  stringEqualizer,
} from "../../helpers/CalculateAge";
import { AuthContext } from "../../contexts/authContext";
import pesagemSchema from "../../Models/pesagem.models";
import { v4 } from "uuid";

export default function MilkMonitoring() {
  const { data, loading, getData, user } = useContext(AuthContext);
  let cattle = data.rebanho.filter((cow) => !cow.dadosServidor.deletado);
  let property = data;
  let getCattle = getData;
  useEffect(() => {
    getCattle();
  }, []);
  let [search, setSearch] = useState("");

  if (loading) {
    return <h3>Loading...</h3>;
  } else {
    async function postIt(id, object) {
      let cowIndex = await property.rebanho.findIndex((cow) => cow.uuid === id);
      console.log(property.rebanho[cowIndex]);
      let newData = {
        ...property,
        dadosServidor: {
          ...property.dadosServidor,
          lastUpdate: getLastUpdate(),
        },
      };
      newData.rebanho[cowIndex] = object;
      user
        .update(property.uuid, newData)
        .then(setSearch(""))
        .then(getCattle)
        .catch((err) => alert(err));
    }

    function renderTable() {
      let initialfilter = cattle
        .filter(
          (cow) =>
            !(cow.morreu || cow.vendida) &&
            (cow.pesagem.length > 0
              ? cow.pesagem[cow.pesagem.length - 1].dtPesagem !==
                  formatDateToDefault(new Date(Date.now())) ||
                cow.pesagem[cow.pesagem.length - 1].dadosServidor.deletado
              : true)
        )
        .sort((a, b) => Number(a.brinco) - Number(b.brinco));
      let filteredData = initialfilter.map((cow) => {
        return {
          ...cow,
          pesagem: cow.pesagem.sort(
            (a, b) =>
              new Date(a.dtPesagem).getTime() - new Date(b.dtPesagem).getTime()
          ),
        };
      });
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
            <td >
              <Form
                onSubmit={(e) => {
                  if (e.target[0].value === "" || e.target[0].value === "0") {
                    alert("nenhum dado de peso apontado");
                    e.preventDefault();
                  } else {
                    e.preventDefault();
                    filteredData[i] = {
                      ...filteredData[i],
                      dadosServidor: {
                        ...filteredData[i].dadosServidor,
                        lastUpdate: getLastUpdate(),
                      },
                      pesagem: [
                        ...filteredData[i].pesagem,
                        {
                          ...pesagemSchema,
                          _id: v4(),
                          peso: e.target[0].value,
                          dtPesagem: formatDateToDefault(new Date(Date.now())),
                          creator: property._id,
                          animaluuid: filteredData[i].uuid,
                          dadosServidor: {
                            ...pesagemSchema.dadosServidor,
                            lastUpdate: getLastUpdate(),
                          },
                        },
                      ],
                    };
                    console.log(e);
                    e.target[0].value = "";
                    let newAnimal = filteredData[i];
                    let id = newAnimal.uuid;
                    postIt(id, newAnimal);
                  }
                  console.log(filteredData);
                }}
              >
                <Row className="flex-nowrap">
                  <Col xs={8}>
                    <Form.Control
                      type="number"
                      style={{minWidth:"140px"}}
                      placeholder="Peso do animal"
                      min="0"
                      step=".01"
                      name="peso"
                    />
                  </Col>
                  <Col>
                    <Button type="submit">Salvar</Button>
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
              style={{ backgroundColor: "white", top: "2.4em" }}
            >
              <tr>
                <th>Brinco</th>
                <th>Nome</th>
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
}
