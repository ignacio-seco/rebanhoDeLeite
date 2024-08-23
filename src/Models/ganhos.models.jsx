const ganhoSchema ={
    creator: "",
    _id: "",
    uuid: "",
    dtGanho: "",
    valor: "",
    descricao: "",
    dadosServidor: {
      colecao:'ganhos',
      relacao:'propriedade',
      referencia: 'ganhos',
      populaveis:[],
      lastUpdate: "",
      deletado: false
    },
  }

export default ganhoSchema;
