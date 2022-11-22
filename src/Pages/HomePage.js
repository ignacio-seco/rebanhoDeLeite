import "./HomePage.css";
import { Col, Container, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import AllBeersPic from "../assets/AllCattlePhoto.jpg";
import RandomBeersPic from "../assets/curral.webp";
import NewBeerPic from "../assets/newAnimal.webp";
import { Link } from "react-router-dom";

function HomePage() {
  const cardImageStyle = { width: "auto", height: "25vh" };

  return (
    <Container className="homePageLinks">
      <Row
        xs={1}
        md={2}
        lg={3}
        xl={3}
      >
        <Col>
          <Link to={`/gado`}>
            <Card>
              <Card.Img
                style={cardImageStyle}
                variant="top"
                src={AllBeersPic}
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
                src={RandomBeersPic}
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
                src={NewBeerPic}
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
      </Row>
    </Container>
  );
}
export default HomePage;
