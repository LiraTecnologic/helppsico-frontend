export default function calcular(dataNascimento: string) {
    const [ano, mes, dia] = dataNascimento.split("-").map(Number);
    const hoje = new Date();
    const nascimento = new Date(ano, mes - 1, dia);

    let idade = hoje.getFullYear() - nascimento.getFullYear();

    const mesAtual = hoje.getMonth();
    const diaAtual = hoje.getDate();

    if (mesAtual < mes - 1 || (mesAtual === mes - 1 && diaAtual < dia)) {
        idade--;
    }

    return idade;
}