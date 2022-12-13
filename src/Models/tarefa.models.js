const tarefaSchema = {
  creator: "",
  uuid:"",
  _id: "",
  dtCriacao: "",
  urgente: false,
  descricao: "",
  concluida: false,
  dadosServidor: {
    colecao: "tarefa",
    relacao: "propriedade",
    referencia: "tarefas",
    lastUpdate: "",
    populaveis: [],
    deletado: false,
  },
};
export default tarefaSchema;
