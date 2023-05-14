export default function moedaParaNumero(valor: string): number | null {
  const numero = Number(valor.replace(/\./g, '').replace(',', '.'));
  return isNaN(numero) ? null : numero;
}
