export function converterDiaSemana(abreviado: string): string {
  const mapaDias: { [chave: string]: string } = {
    SEG: 'SEGUNDA_FEIRA',
    TER: 'TERÇA_FEIRA',
    QUA: 'QUARTA_FEIRA',
    QUI: 'QUINTA_FEIRA',
    SEX: 'SEXTA_FEIRA',
    SAB: 'SABADO',
    DOM: 'DOMINGO',
  };

  return mapaDias[abreviado] || abreviado;
}