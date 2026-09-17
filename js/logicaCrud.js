import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const supabaseUrl = 'https://bdselqtawasfdtipsyqf.supabase.co';
const supabaseKey = 'sb_publishable_kgTKwX8A-hqht2NsrnGThw_YPP4uHvF';
const supabase = createClient(supabaseUrl, supabaseKey);

const formularioEnviar = document.getElementById('formularioEnviar');
formularioEnviar.addEventListener('submit', async function(event) { event.preventDefault();
    const nome = document.getElementById('nome').value;
    const idade = document.getElementById('idade').value;
    const { error } = await supabase.from('pessoas').insert({ nome, idade });

    if(error) {
        console.error(error);
    } else {
        console.log('Cadastrado:', nome, idade);
    }
});

const formularioPesquisar = document.getElementById('formularioPesquisar');
formularioPesquisar.addEventListener('submit', async function(event) { event.preventDefault();
    const resultado = document.getElementById('resultadoPesquisar');
    const nomePesquisado = document.getElementById('pesquisar').value;
    const { data, error } = await supabase.from('pessoas').select('*').eq('nome', nomePesquisado);

    if(error || !data || data.length === 0) {
        resultado.innerHTML = "Pessoa não encontrada.";
    } else {
        resultado.innerHTML = `Nome: ${data[0].nome}<br>Idade: ${data[0].idade}`;
    }
});

const formularioExcluir = document.getElementById('formularioExcluir');
formularioExcluir.addEventListener('submit', async function(event) { event.preventDefault();
    const excluir = document.getElementById('excluir').value;
    const { error } = await supabase.from('pessoas').delete().eq('nome', excluir);

    if(error) console.error(error);

    console.log("Cadastro excluído.");
});

const formularioEditar = document.getElementById('formularioEditar');
formularioEditar.addEventListener('submit', async function(event) { event.preventDefault();
    const novoNome = document.getElementById('alterar').value;
    const nomeAntigo = document.getElementById('nomeEditar').value;
    const novaIdade = document.getElementById('idadeEditar').value;
    const { data, error: erroBusca } = await supabase.from('pessoas').select('*').eq('nome', nomeAntigo);
    const { error: erroUpdate } = await supabase.from('pessoas').update({ nome: novoNome, idade: novaIdade }).eq('nome', nomeAntigo);

    if(erroBusca || !data || data.length === 0) {
        resultado.innerHTML = "Pessoa não encontrada.";
        return;
    }

    if(erroUpdate) {
        resultado.innerHTML = "Erro ao atualizar.";
        console.error(erroUpdate);
    } else {
        console.log("Cadastro editado.");
    } 
});