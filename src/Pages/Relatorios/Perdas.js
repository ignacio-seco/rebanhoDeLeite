import { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import { filterMonths, formatDate } from "../../helpers/CalculateAge";

export default function Perdas() {
  const {data,getData, loading}= useContext(AuthContext)
  let cattle = data.rebanho
  let getCattle = getData
  useEffect(()=>{getCattle()}, []);
  if(loading){return <h3>loading...</h3>} else{
  const sortedCattle = () => {
    return cattle
      .filter((cow) => cow.dadosMorte.morreu)
      .sort((a, b) => filterMonths(a.dadosMorte.dtMorte) - filterMonths(b.dadosMorte.dtMorte));
  };

  return (
    <div style={{ width: "100%", height: "90vh", overflow: "auto" }}>
      <h2 style={{ textAlign: "center" }}>Perda de rebanho</h2>

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
              <th>Data da morte</th>
              <th>Causa da morte</th>
              <th>Último peso</th>
              <th>Data pesagem</th>
            </tr>
          </thead>
          <tbody>
            {sortedCattle().map((cow) => {
              return (
                <tr key={cow._id}>
                  <td>{cow.brinco}</td>
                  <td>
                    <Link to={`/gado/${cow.uuid}`}>{cow.nome}</Link>
                  </td>
                  <td>{cow.sexo}</td>
                  <td>{cow.dadosMorte.dtMorte ? formatDate(cow.dadosMorte.dtMorte) : `-`}</td>
                  <td>{cow.dadosMorte.causaMorte}</td>
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