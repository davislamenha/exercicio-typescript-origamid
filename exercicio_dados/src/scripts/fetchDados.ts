export default async function fetchDados<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Erro: ${response.status}`);
    const json = await response.json();
    return json;
  } catch (erro) {
    if (erro instanceof Error) console.error(`fetchDados: ${erro.message}`);
    return null;
  }
}
