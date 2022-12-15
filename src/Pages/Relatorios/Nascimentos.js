//todo
import { useContext, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import { formatDate } from "../../helpers/CalculateAge";

export default function Nascimentos() {
  const { data, getData, loading } = useContext(AuthContext);
  let getCattle = getData;
  useEffect(() => {
    getCattle();
  }, []);

  if (loading) {
    return <h3>loading...</h3>;
  } else {
    let cattle = data.rebanho.filter(
      (cow) =>
        !cow.dadosServidor.deletado &&
        cow.sexo === "FEMEA" &&
        cow.dadosCruzamentos.length > 0
    );
    const sortedNascimentos = () => {
      const nascimentosData = [];
      cattle.forEach((element) => {
        element.dadosCruzamentos.forEach((cruz) => {
          if (
            cruz.confirmacaoPrenhez &&
            !cruz.confirmacaoNascimento &&
            !cruz.dadosServidor.deletado
          ) {
            nascimentosData.push({
              brinco: element.brinco,
              nome: element.nome,
              animaluuid: element.uuid,
              dtCruzamento: cruz.dtCruzamento,
              dtNascimento: cruz.dtProvavelNascimento,
              semen: cruz.semen,
            });
          }
        });
      });
      console.log(nascimentosData);
      return nascimentosData.sort(
        (a, b) =>
          new Date(a.dtCruzamento).getTime() -
          new Date(b.dtCruzamento).getTime()
      );
    };

    return (
      <div style={{ width: "100%", height: "90vh", overflow: "auto" }}>
        <Container>
          <h2 style={{ textAlign: "center" }}>Próximos Nascimentos</h2>
        </Container>
        <Container>
          <Table
            striped
            bordered
            hover
          >
            <thead
              className="sticky-top"
              style={{ backgroundColor: "white" }}
            >
              <tr>
                <th>Brinco</th>
                <th>Nome</th>
                <th>Data do Cruzamento</th>
                <th>Genética</th>
                <th>Data Provavel do Nascimento</th>
              </tr>
            </thead>
            <tbody>
              {sortedNascimentos().map((cow) => {
                return (
                  <tr key={cow.animaluuid}>
                    <td>{cow.brinco}</td>
                    <td>
                      <Link to={`/gado/${cow.animaluuid}`}>{cow.nome}</Link>
                    </td>
                    <td>{formatDate(cow.dtCruzamento)}</td>
                    <td>{cow.semen}</td>
                    <td>{formatDate(cow.dtNascimento)}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}
