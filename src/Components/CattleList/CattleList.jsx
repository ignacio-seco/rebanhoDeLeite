import { useContext, useEffect, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContext';
import { calculateAge, stringEqualizer } from '../../helpers/CalculateAge';
import cattlePhoto from '../../assets/cow_PNG50576.png';
import './CattleList.css';

function CattleList({ cowFilterFn }) {
  let [search, setSearch] = useState('');
  const { data, getData, loading } = useContext(AuthContext);
  let cattle = data.rebanho.filter((cow) => !cow.dadosServidor.deletado);
  const navigate = useNavigate()
  let getCattle = getData;
  useEffect(() => {
    getCattle();
  }, []);
  if (loading) {
    return <h3>loading...</h3>;
  } else {
    const cattleSize = () => {
      if (cowFilterFn) {
        return cattle
          .filter((cow) => !(cow.dadosMorte.morreu || cow.dadosVenda.vendida))
          .filter(cowFilterFn).length;
      }
      return cattle.filter(
        (cow) => !(cow.dadosMorte.morreu || cow.dadosVenda.vendida)
      ).length;
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
        .filter((cow) => !(cow.dadosMorte.morreu || cow.dadosVenda.vendida))
        .sort((a, b) => Number(a.brinco) - Number(b.brinco));

      if (cowFilterFn) {
        filteredCattle = filteredCattle.filter(cowFilterFn);
      }


      return filteredCattle.map((cow) => {
        let imageToUse = (cow.imagem_url === 'https://pngimg.com/uploads/cow/cow_PNG50576.png' || !cow.imagem_url) ? cattlePhoto : cow.imagem_url
        return (
          <Col key={cow.uuid}>
            <Container className="justify-content-center BeerCard my-3" style={{cursor:"pointer"}} onClick={()=>{navigate(`/gado/${cow.uuid}`)}}>
              <div className="imageHolder">
                <Link to={`/gado/${cow.uuid}`}>
                  <img
                    src={imageToUse}
                    alt={cow.nome}
                    crossOrigin='anonymous'
                    style={{width:"180px", height:"120px"}}
                  />
                </Link>
              </div>
              <Card style={{ width: '18rem', marginLeft: '0px' }}>
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
        <h3 style={{ textAlign: 'center' }}>
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
}
export default CattleList;
