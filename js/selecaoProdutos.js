function coletarSelecionados() {
  const checks = document.querySelectorAll('.check-produto:checked');
  return Array.from(checks).map(c => c.value);
}

async function adicionarACesta() {
  const ids = coletarSelecionados();
  if(ids.length === 0) { alert('Selecione ao menos um produto antes de continuar.'); return; }
  
  const usuario = JSON.parse(sessionStorage.getItem('usuario'));
  const { data: cesta } = await supabase.from('cestas').insert({ usuario_id: usuario.id }).select().single();

  const itens = ids.map(pid => ({ cesta_id: cesta.id, produto_id: pid }));
  await supabase.from('cesta_itens').insert(itens);
  window.location.href = 'carrinho.html?cesta=' + cesta.id;
}