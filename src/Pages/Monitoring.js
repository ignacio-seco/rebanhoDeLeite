import "./HomePage.css";
import { Col, Container, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import monitoramentoLeite from "../assets/MonitoramentoLeite.jfif";
import monitoramentoPeso from "../assets/MonitoramentoPeso.jpg";
import { Link } from "react-router-dom";

function Monitoring() {
  const cardImageStyle = { width: "auto", height: "25vh" };

  return (
    <Container className="homePageLinks">
      <Row
        xs={1}
        md={1}
        lg={1}
        xl={2}
      >
        <Col>
          <Link to={`/monitoramento/monitoramentoleite`}>
            <Card>
              <Card.Img
                style={cardImageStyle}
                variant="top"
                src={monitoramentoLeite}
              />
              <Card.Body>
                <Card.Title>
                  <h1>Produção de leite</h1>
                </Card.Title>
                <Card.Text>
                  Registrar a produção de leite do dia dos animais do curral
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col>
          <Link to={`/monitoramento/monitoramentopeso`}>
            <Card>
              <Card.Img
                style={cardImageStyle}
                variant="top"
                src={monitoramentoPeso}
              />
              <Card.Body>
                <Card.Title>
                  <h1>Peso do rebanho</h1>
                </Card.Title>
                <Card.Text>Realizar o registro do peso atual dos animais do rebanho</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
export default Monitoring;