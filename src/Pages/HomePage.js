import "./HomePage.css";
import { Col, Container, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import rebanho from "../assets/AllCattlePhoto.jpg";
import curral from "../assets/curral.jpg";
import novoAnimal from "../assets/newAnimal.jpg";
import relatorios from "../assets/relatorio.jpg";
import monitoramento from "../assets/monitoramento.jpeg";
import { Link } from "react-router-dom";

function HomePage() {
  const cardImageStyle = { width: "auto", height: "25vh" };

  return (
    <Container className="homePageLinks">
      <Row
        xs={1}
        md={1}
        lg={1}
        xl={3}
      >
        <Col>
          <Link to={`/gado`}>
            <Card>
              <Card.Img
                style={cardImageStyle}
                variant="top"
                src={rebanho}
              />
              <Card.Body>
                <Card.Title>
                  <h1>Seu Rebanho</h1>
                </Card.Title>
                <Card.Text>
                  Aqui você checa e altera dados do seu rebanho atual
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col>
          <Link to="/curral">
            <Card>
              <Card.Img
                style={cardImageStyle}
                variant="top"
                src={curral}
              />
              <Card.Body>
                <Card.Title>
                  <h1>Curral</h1>
                </Card.Title>
                <Card.Text>Checar e alterar o gado do curral</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col>
          <Link to="/cadastrarAnimal">
            <Card>
              <Card.Img
                style={cardImageStyle}
                variant="top"
                src={novoAnimal}
              />
              <Card.Body>
                <Card.Title>
                  <h1>Novo animal</h1>
                </Card.Title>
                <Card.Text>Cadastrar um novo animal no rebanho</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col>
          <Link to="/relatorios">
            <Card>
              <Card.Img
                style={cardImageStyle}
                variant="top"
                src={relatorios}
              />
              <Card.Body>
                <Card.Title>
                  <h1>Relatórios</h1>
                </Card.Title>
                <Card.Text>Visualizar relatórios sobre seu rebanho</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col>
          <Link to="/monitoramento">
            <Card>
              <Card.Img
                style={cardImageStyle}
                variant="top"
                src={monitoramento}
              />
              <Card.Body>
                <Card.Title>
                  <h1>Monitoramentos</h1>
                </Card.Title>
                <Card.Text>
                  Realizar atualização de informações monitoradas do rebanho
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
export default HomePage;
