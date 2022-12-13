const gastoSchema = {
  creator: "",
  _id: "",
  uuid:"",
  dtGasto: "",
  valor: "",
  descricao: "",
  dadosServidor: {
    colecao: "gastos",
    relacao: "propriedade",
    referencia: "gastos",
    populaveis:[],
    lastUpdate: "",
    deletado: false,
  },
};

export default gastoSchema;
