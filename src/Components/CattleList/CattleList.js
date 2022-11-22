import { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import { calculateAge, stringEqualizer } from "../../helpers/CalculateAge";
import "./CattleList.css";

function CattleList({ cattle, getCattle, cowFilterFn }) {
  let [search, setSearch] = useState("");

  useEffect(getCattle, []);

  const cattleSize = () => {
    if (cowFilterFn) {
      return cattle
        .filter((cow) => !(cow.morreu || cow.vendida))
        .filter(cowFilterFn).length;
    }
    return cattle.filter((cow) => !(cow.morreu || cow.vendida)).length;
  };

  const renderCattle = () => {
    let filteredCattle = search
      ? cattle.filter(
          (cow) =>
            cow.brinco.indexOf(search) !== -1 ||
            stringEqualizer(cow.nome).indexOf(stringEqualizer(search)) !== -1
        )
      : cattle;
    filteredCattle = filteredCattle
      .filter((cow) => !(cow.morreu || cow.vendida))
      .sort((a, b) => Number(a.brinco) - Number(b.brinco));

    if (cowFilterFn) {
      filteredCattle = filteredCattle.filter(cowFilterFn);
    }

    return filteredCattle.map((cow) => {
      return (
        <Col key={cow._id}>
          <Container className="justify-content-center BeerCard my-3">
            <div className="imageHolder">
              <Link to={`/gado/${cow._id}`}>
                <img
                  src={cow.imagem_url}
                  alt={cow.nome}
                />
              </Link>
            </div>
            <Card style={{ width: "18rem", marginLeft: "0px" }}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <span className="BoldStyle">Brinco: </span> {cow.brinco}
                </ListGroup.Item>
                <ListGroup.Item>
                  <span className="BoldStyle">nome: </span>
                  {cow.nome}
                </ListGroup.Item>
                <ListGroup.Item>
                  {calculateAge(cow.dtNascimento)}
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Container>
        </Col>
      );
    });
  };

  return (
    <div className="justify-content-center">
      <Container className="sticky-top">
        <Form.Control
          type="search"
          placeholder="Digite o nome ou nº de brinco"
          className="mb-4"
          defaultValue=""
          aria-label="Search"
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
      </Container>
      <h3 style={{ textAlign: "center" }}>
        {cowFilterFn
          ? `${cattleSize()} animais no curral`
          : `Seu rebanho de ${cattleSize()} Animais`}
      </h3>

      <Row
        xs={1}
        md={2}
        lg={3}
        xl={3}
      >
        {renderCattle()}
      </Row>
    </div>
  );
}
export default CattleList;
