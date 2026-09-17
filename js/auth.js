async function cadastrarUsuario(nome, email, senha) {
  const hash = await Usuario.hashSenha(senha);
  const { data, error } = await supabase.from('usuarios').insert({ nome, email, senha_hash: hash }).select().single();
  
  if(error) throw error;
  return data;
}

async function login(email, senha) {
  const hash = await Usuario.hashSenha(senha);
  const { data, error } = await supabase.from('usuarios').select('*').eq('email', email).eq('senha_hash', hash).single();

  if(error || !data) throw new Error('Credenciais inválidas');

  sessionStorage.setItem('usuario', JSON.stringify(data));
  window.location.href = 'dashboard.html';
}