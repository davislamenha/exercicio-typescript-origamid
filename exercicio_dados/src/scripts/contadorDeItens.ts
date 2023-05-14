export interface ItensContados {
  [key: string]: number;
}

export default function contadorDeItens(arr: (string | number)[]) {
  return arr.reduce((acc: ItensContados, item) => {
    if (acc[item]) {
      acc[item] += 1;
    } else acc[item] = 1;
    return acc;
  }, {});
}
