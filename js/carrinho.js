async function carregarCesta(cestaId) {
  const { data: itens } = await supabase.from('cesta_itens').select('produtos(nome, preco)').eq('cesta_id', cestaId);

  const cesta = new Cesta(cestaId);
  itens.forEach(i => cesta.adicionarProduto(i.produtos));

  document.getElementById('total').innerText = `R$ ${cesta.valorTotal().toFixed(2)}`;
  document.getElementById('qtd').innerText = cesta.quantidadeItens();

  const lista = document.getElementById('lista-cesta');
  lista.innerHTML = cesta.itens.map(p => `<li>${p.nome} - R$ ${Number(p.preco).toFixed(2)}</li>`).join('');
}