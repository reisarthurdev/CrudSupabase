async function cadastrarProduto(nome, preco, estoque, fornecedorId) {
  const usuario = JSON.parse(sessionStorage.getItem('usuario'));
  const { error } = await supabase.from('produtos').insert({ nome, preco, estoque, fornecedor_id: fornecedorId, usuario_id: usuario.id });
  
  if(error) alert(error.message); else alert('Produto cadastrado!');
}