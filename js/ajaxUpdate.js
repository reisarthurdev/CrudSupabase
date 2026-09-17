async function atualizarProdutoAjax(id, campos) {
  const resp = await fetch(`${'https://bdselqtawasfdtipsyqf.supabase.co'}/rest/v1/produtos?id=eq.${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'apikey': sb_publishable_kgTKwX8A-hqht2NsrnGThw_YPP4uHvF,
      'Authorization': `Bearer ${sb_publishable_kgTKwX8A-hqht2NsrnGThw_YPP4uHvF}`,
      'Prefer': 'return=representation'
    },
    body: JSON.stringify(campos)
  });
  const data = await resp.json();
  document.getElementById('status').innerText = 'Produto atualizado!';
  return data;
}