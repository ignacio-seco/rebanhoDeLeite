import { useContext, useEffect } from "react";
import ReportsTable from "../../Components/Reports/ReportsTable";
import { AuthContext } from "../../contexts/authContext";

export default function RebanhoDetalhado() {
  const { data, getData, loading } = useContext(AuthContext);
  let cattle = data.rebanho.filter((cow) => !cow.dadosServidor.deletado);
  let getCattle = getData;
  useEffect(() => {
    getCattle();
  }, []);
  if (loading) {
    return <h3>loading...</h3>;
  } else {
    const sortedCattle = () => {
      return cattle
        .filter((cow) => !(cow.dadosMorte.morreu || cow.dadosVenda.vendida))
        .sort((a, b) => Number(a.brinco) - Number(b.brinco));
    };

    return (
      <div style={{ width: "100%", height: "90vh", overflow: "auto" }}>
        <h2 style={{ textAlign: "center" }}>Relatório de rebanho detalhado</h2>

        <ReportsTable data={sortedCattle()} />
      </div>
    );
  }
}
