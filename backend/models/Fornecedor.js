class Fornecedor {
    constructor(id, nome, cnpj, endereco, contato) {
      this.id = id;
      this.nome = nome;
      this.cnpj = cnpj;
      this.endereco = endereco;
      this.contato = contato;
    }
  }
  
  module.exports = Fornecedor;