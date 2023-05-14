import moedaParaNumero from './moedaParaNumero.js';
import stringParaData from './stringParaData.js';

declare global {
  type FormasDePagamento = 'Cartão de Crédito' | 'Boleto';
  type StatusDaCompra =
    | 'Paga'
    | 'Aguardando pagamento'
    | 'Recusada pela operadora de cartão'
    | 'Estornada';

  interface TransacaoAPI {
    Status: StatusDaCompra;
    ID: number;
    Data: string;
    Nome: string;
    ['Forma de Pagamento']: FormasDePagamento;
    Email: string;
    ['Valor (R$)']: string;
    ['Cliente Novo']: number;
  }

  interface Transacao {
    status: StatusDaCompra;
    id: number;
    data: Date;
    nome: string;
    pagamento: FormasDePagamento;
    email: string;
    moeda: string;
    valor: number | null;
    novo: boolean;
  }
}

export default function normalizarTransacao(
  transacao: TransacaoAPI,
): Transacao {
  return {
    status: transacao.Status,
    id: transacao.ID,
    data: stringParaData(transacao.Data),
    nome: transacao.Nome,
    pagamento: transacao['Forma de Pagamento'],
    email: transacao.Email,
    moeda: transacao['Valor (R$)'],
    valor: moedaParaNumero(transacao['Valor (R$)']),
    novo: Boolean(transacao['Cliente Novo']),
  };
}
