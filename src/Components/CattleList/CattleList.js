import { useEffect, useMemo, useState } from "react";
import {Col, Container, Form, Row} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import { calculateAge, stringEqualizer } from "../../helpers/CalculateAge";
import "./CattleList.css";

function CattleList({cattle, getCattle, cowFilterFn}) {
  const [ search, setSearch ] = useState("");
  
  useEffect(getCattle,[])  
  
  const renderCattle = () => {
    let filteredCattle = search
        ? cattle.filter(cow =>
            cow.brinco.indexOf(search) !== -1 ||
            stringEqualizer(cow.nome).indexOf(stringEqualizer(search)) !== -1)
            .sort((a, b) => Number(a.brinco) - Number(b.brinco))
        : cattle;
    
    if (cowFilterFn){
      filteredCattle = filteredCattle.filter(cowFilterFn)
    }
    
    return filteredCattle.map((cow) => {
      return (
          <Col>
            <Container
                className="justify-content-center BeerCard my-3"
                key={cow._id}
            >
              <div className="imageHolder">
                <Link to={`./${cow._id}`}>
                  <img
                      src={cow.imagem_url}
                      alt={cow.nome}
                  />
                </Link>
              </div>
              <Card style={{width: "18rem", marginLeft: "0px"}}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <span className="BoldStyle">Brinco: </span> {cow.brinco}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span className="BoldStyle">nome: </span>
                    {cow.nome}
                  </ListGroup.Item>
                  <ListGroup.Item>{calculateAge(cow.nascimento)}</ListGroup.Item>
                </ListGroup>
              </Card>
            </Container>
          </Col>
      );
    });
  }

  return (
    <div className="justify-content-center">
      <div style={{ position: "sticky", display: "block" }}>
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
      </div>
      <Row xs={1} md={2} lg={3}>
        { renderCattle() }
      </Row>
    </div>
  );
}
export default CattleList;
