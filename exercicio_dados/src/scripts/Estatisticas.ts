import contadorDeItens from './contadorDeItens.js';

type TransacaoValor = Transacao & { valor: number };
function filtrarValor(transacao: Transacao): transacao is TransacaoValor {
  return transacao.valor !== null;
}

export default class Estatisticas {
  private transacoes;
  total;
  pagamento;
  status;
  semana;
  melhorDia;

  constructor(transacoes: Transacao[]) {
    this.transacoes = transacoes;
    this.total = this.setTotal();
    this.pagamento = this.setPagamento();
    this.status = this.setStatus();
    this.semana = this.setSemana();
    this.melhorDia = this.setMelhorDia();
  }

  private setTotal() {
    return this.transacoes.filter(filtrarValor).reduce((acum, atual) => {
      return acum + atual.valor;
    }, 0);
  }

  private setPagamento() {
    const pagamentos = this.transacoes.map(({ pagamento }) => pagamento);
    return contadorDeItens(pagamentos);
  }

  private setStatus() {
    const status = this.transacoes.map(({ status }) => status);
    return contadorDeItens(status);
  }

  private setSemana() {
    const datas = this.transacoes.map(({ data }) => data.getDay());
    return contadorDeItens(datas);
  }

  private setMelhorDia() {
    const diasDaSemana = [
      'Segunda',
      'Terça',
      'Quarta',
      'Quinta',
      'Sexta',
      'Sábado',
      'Domingo',
    ];
    let diaComMaisVendas = 0;
    let qtdVendas = 0;
    for (const [dia, vendasDoDia] of Object.entries(this.semana)) {
      if (qtdVendas < vendasDoDia) {
        qtdVendas = vendasDoDia;
        diaComMaisVendas = +dia;
      }
    }

    return { dia: diasDaSemana[diaComMaisVendas - 1], vendas: qtdVendas };
  }
}
