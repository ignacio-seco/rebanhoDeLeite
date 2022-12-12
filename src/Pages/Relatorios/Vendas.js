import { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import { filterMonths, formatDate } from "../../helpers/CalculateAge";

export default function Vendas() {
  const { data, loading, getData } = useContext(AuthContext);
  let cattle = data.rebanho.filter((cow) => !cow.dadosServidor.deletado);
  let getCattle = getData;

  useEffect(() => {
    getCattle();
  }, []);
  if (loading) {
    return <h3>loading...</h3>;
  } else {
    function sortedCattle() {
      return cattle
        .filter((cow) => cow.dadosVenda.vendida)
        .sort(
          (a, b) =>
            filterMonths(a.dadosVenda.dtVenda) -
            filterMonths(b.dadosVenda.dtVenda)
        );
    }
    return (
      <div style={{ width: "100%", height: "90vh", overflow: "auto" }}>
        <h2 style={{ textAlign: "center" }}>Cabeças vendidas</h2>

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
                <th>Sexo</th>
                <th>Data da venda</th>
                <th>Valor da venda</th>
                <th>Comprador</th>
                <th>Último peso registrado</th>
                <th>Data pesagem</th>
              </tr>
            </thead>
            <tbody>
              {sortedCattle().map((cow) => {
                return (
                  <tr key={cow._id}>
                    <td>{cow.brinco}</td>
                    <td>
                      <Link to={`/gado/${cow._id}`}>{cow.nome}</Link>
                    </td>
                    <td>{cow.sexo}</td>
                    <td>
                      {cow.dadosVenda.dtVenda
                        ? formatDate(cow.dadosVenda.dtVenda)
                        : `-`}
                    </td>
                    <td>{cow.dadosVenda.valorVenda}</td>
                    <td>{cow.dadosVenda.comprador}</td>
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
