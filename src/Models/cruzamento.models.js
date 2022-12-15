const cruzamentoSchema = {
  creator: "",
  _id: "",
  uuid: "",
  animal: "",
  animaluuid: "",
  semen: "",
  dtCruzamento: "",
  confirmacaoPrenhez: true,
  dtProvavelNascimento: "",
  confirmacaoNascimento: false,
  esconderCampo: false,
  dadosServidor: {
    colecao: "cruzamento",
    relacao: "cow",
    referencia: "dadosCruzamentos",
    populaveis: [],
    lastUpdate: "",
    deletado: false,
  },
};
export default cruzamentoSchema;
