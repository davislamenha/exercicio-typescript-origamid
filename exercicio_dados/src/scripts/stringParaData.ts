export default function stringParaData(texto: string): Date {
  const [data, horario] = texto.split(' ');
  const [dia, mes, ano] = data.split('/').map(Number);
  const [hora, minuto] = horario.split(':').map(Number);
  return new Date(ano, mes - 1, dia, hora, minuto);
}
