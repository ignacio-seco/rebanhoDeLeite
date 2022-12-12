import { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import {
  calculateAge,
  filterMonths,
  formatDate,
  formatDateToDefault,
  getLastUpdate,
  stringEqualizer,
} from "../../helpers/CalculateAge";
import { AuthContext } from "../../contexts/authContext";
import litragemSchema from "../../Models/litragem.models";

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
      let cowIndex = await property.rebanho.findIndex((cow) => cow._id === id);
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
        .update(property._id, newData)
        .then(setSearch(""))
        .catch((err) => alert(err));
    }

    function renderTable() {
      let filteredData = cattle
        .filter(
          (cow) =>
            !(cow.dadosMorte.morreu || cow.dadosVenda.vendida) &&
            cow.noCurral &&
            cow.sexo === "FEMEA" &&
            (cow.producaoLeite.length > 0
              ? cow.producaoLeite[cow.producaoLeite.length - 1]
                  .dtVerificacao !==
                  formatDateToDefault(new Date(Date.now())) ||
                cow.producaoLeite[cow.producaoLeite.length - 1].dadosServidor
                  .deletado
              : true) &&
            filterMonths(cow.dtNascimento) > 11
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
                      dadosServidor: {
                        ...filteredData[i].dadosServidor,
                        lastUpdate: getLastUpdate(),
                      },
                      producaoLeite: [
                        ...filteredData[i].producaoLeite,
                        {
                          ...litragemSchema,
                          _id: uuidv4(),
                          qtdLitros: e.target[0].value,
                          dtVerificacao: formatDateToDefault(
                            new Date(Date.now())
                          ),
                          creator: property._id,
                          animal: filteredData[i]._id,
                          dadosServidor: {
                            ...litragemSchema.dadosServidor,
                            lastUpdate: getLastUpdate(),
                          },
                        },
                      ],
                    };
                    console.log(e);
                    e.target[0].value = "";
                    let newAnimal = filteredData[i];
                    let uuid = newAnimal._id;
                    postIt(uuid, newAnimal);
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
                <th>Idade</th>
                <th>Entrada no curral</th>
                <th>Tempo no curral</th>
                <th>Litros monitoramento</th>
              </tr>
            </thead>
            <tbody>{renderTable()}</tbody>
          </Table>
        </Container>
      </div>
    );
  }
}
