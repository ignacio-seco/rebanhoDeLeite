const ganhoSchema ={
    creator: "",
    uuid: "",
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
