import { useContext, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import { calculateAge, formatDate } from "../../helpers/CalculateAge";

export default function Observacoes() {
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
        cow.dadosObservacao.animalObservado &&
        !(cow.dadosMorte.morreu || cow.dadosVenda.vendida)
    );
    const dataToRender = cattle.map((cow) => {
      return {
        ...cow,
        pesagem: cow.pesagem.sort(
          (a, b) =>
            new Date(a.dtPesagem).getTime() - new Date(b.dtPesagem).getTime()
        ),
      };
    });
    const sortedObservacoes = () => {
      return dataToRender.sort(
        (a, b) =>
          new Date(b.dtNascimento).getTime() -
          new Date(a.dtNascimento).getTime()
      );
    };

    return (
      <div style={{ width: "100%", height: "90vh", overflow: "auto" }}>
        <Container>
          <h2 style={{ textAlign: "center" }}>Animais em observação</h2>
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
                <th>Idade</th>
                <th>Motivo em observação</th>
                <th>Ultimo peso</th>
                <th>Data pesagem</th>
              </tr>
            </thead>
            <tbody>
              {sortedObservacoes().map((cow) => {
                return (
                  <tr key={cow.uuid}>
                    <td>{cow.brinco}</td>
                    <td>
                      <Link to={`/gado/${cow.uuid}`}>{cow.nome}</Link>
                    </td>
                    <td>{calculateAge(cow.dtNascimento)}</td>
                    <td>{cow.dadosObservacao.motivo}</td>
                    <td>
                      {cow.pesagem.length > 0
                        ? cow.pesagem[cow.pesagem.length - 1].peso
                        : `-`}
                    </td>
                    <td>
                      {cow.pesagem.length > 0
                        ? formatDate(
                            cow.pesagem[cow.pesagem.length - 1].dtPesagem
                          )
                        : `-`}
                    </td>
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
