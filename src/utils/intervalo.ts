export const nomesDias: Record<string, string> = {
  SEG: "Segunda-Feira",
  TER: "Terça-Feira",
  QUA: "Quarta-Feira",
  QUI: "Quinta-Feira",
  SEX: "Sexta-Feira",
  SAB: "Sábado",
  DOM: "Domingo",
};

export function gerarIntervalos(
  inicio: string,
  fim: string,
  duracao: number,
  intervalo: number
): string[] {
  const [startH, startM] = inicio.split(":").map(Number);
  const [endH, endM] = fim.split(":").map(Number);
  const intervalos: string[] = [];

  let start = startH * 60 + startM;
  const end = endH * 60 + endM;

  while (start + duracao <= end) {
    const hIni = String(Math.floor(start / 60)).padStart(2, "0");
    const mIni = String(start % 60).padStart(2, "0");
    const hFim = String(Math.floor((start + duracao) / 60)).padStart(2, "0");
    const mFim = String((start + duracao) % 60).padStart(2, "0");

    intervalos.push(`${hIni}:${mIni} - ${hFim}:${mFim}`);
    start += duracao + intervalo;
  }

  return intervalos;
}
