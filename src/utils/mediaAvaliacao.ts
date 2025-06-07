export default function calcularMedia(avaliacoes: {nota: number}[]): number {
  if (avaliacoes.length === 0) return 0;
  
  const soma = avaliacoes.reduce((acc, curr) => acc + curr.nota, 0);
  return parseFloat((soma / avaliacoes.length).toFixed(1));
}