import {useContext, useEffect, useState} from "react";
import {Col, Container, Form, Row} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import {Link} from "react-router-dom";
import {AuthContext} from "../../contexts/authContext";
import {calculateAge, stringEqualizer} from "../../helpers/CalculateAge";
import "./CattleList.css";

function CattleList({cowFilterFn}) {
    let [search, setSearch] = useState("");
    const {data, getData, loading} = useContext(AuthContext);
    let cattle = data.rebanho.filter((cow) => !cow.dadosServidor.deletado);
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
                return (
                    <Col key={cow.uuid}>
                        <Container className="justify-content-center BeerCard my-3">
                            <div className="imageHolder">
                                <Link to={`/gado/${cow.uuid}`}>
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
            <>
                <Container className="bg-light sticky-top d-flex flex-column" style={{ height: 110 }}>
                    <Form.Control
                        type="search"
                        placeholder="Digite o nome ou nº de brinco"
                        defaultValue=""
                        aria-label="Search"
                        style={{ maxHeight: 45 }}
                        onChange={(e) => setSearch(e.currentTarget.value)}
                    />
                    <h4 className="my-2 px-3 py-2 cattle-list-title-info align-self-center" style={{ textAlign: "center" }}>
                        {cowFilterFn
                            ? `${cattleSize()} animais no curral`
                            : `Seu rebanho de ${cattleSize()} animais`}
                    </h4>
                </Container>
                <Container className="justify-content-center">
                    <Container className="mt-4 px-0">
                        <Row
                            xs={1}
                            md={2}
                            lg={3}
                            xl={3}
                        >
                            {renderCattle()}
                        </Row>
                    </Container>
                </Container>
            </>
        );
    }
}

export default CattleList;
