class Cesta {
  constructor(id, usuarioId) {
    this.id = id; this.usuarioId = usuarioId; this.itens = [];
  }
  adicionarProduto(produto) { this.itens.push(produto); }
  valorTotal() { return this.itens.reduce((s, p) => s + Number(p.preco), 0); }
  quantidadeItens() { return this.itens.length; }
}