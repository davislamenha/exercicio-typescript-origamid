import Estatisticas from './Estatisticas.js';
import { ItensContados } from './contadorDeItens.js';
import fetchDados from './fetchDados.js';
import normalizarTransacao from './normalizarTransacao.js';

async function pegarDados() {
  const dados = await fetchDados<TransacaoAPI[]>(
    'https://api.origamid.dev/json/transacoes.json?',
  );
  if (!dados) return;

  const transacoes = dados.map(normalizarTransacao);
  preencherTabela(transacoes);
  preencherEstatisticas(transacoes);
}

function preencherLista(lista: ItensContados, divId: string): void {
  const div = document.getElementById(divId);
  if (div) {
    Object.keys(lista).forEach((chave) => {
      div.innerHTML += `<p>${chave}: ${lista[chave]}</p>`;
    });
  }
}

function preencherEstatisticas(transacoes: Transacao[]): void {
  const dados = new Estatisticas(transacoes);

  const total = document.querySelector<HTMLElement>('#total span');
  if (total)
    total.innerText = dados.total.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

  preencherLista(dados.pagamento, 'pagamentos');
  preencherLista(dados.status, 'status');

  const dia = document.querySelector<HTMLElement>('#dia span');
  if (dia) {
    dia.innerText = `${dados.melhorDia.dia} com ${dados.melhorDia.vendas} vendas.`;
  }
}

function preencherTabela(transacoes: Transacao[]): void {
  const corpoDaTabela = document.querySelector('#transacoes tbody');
  if (!corpoDaTabela) return;
  transacoes.forEach((transacao) => {
    corpoDaTabela.innerHTML += `
<tr>
<td>${transacao.nome}</td>
<td>${transacao.email}</td>
<td>${'R$ ' + transacao.moeda}</td>
<td>${transacao.pagamento}</td>
<td>${transacao.status}</td>
</tr>
`;
  });
}

pegarDados();
