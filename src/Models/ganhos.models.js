const ganhoSchema ={
    creator: "",
    _id: "",
    dtGanho: "",
    valor: "",
    descricao: "",
    dadosServidor: {
      colecao:'ganhos',
      relacao:'propriedade',
      referencia: 'ganhos',
      lastUpdate: "",
      deletado: false
    },
  }

export default ganhoSchema;
