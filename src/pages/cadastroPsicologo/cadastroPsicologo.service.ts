import { cpf as cpfValidator } from 'cpf-cnpj-validator';

export function formatarCPF(valor: string): string {
    return valor
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

export function validarCPF(cpf: string): boolean {
    const cpfSemMascara = cpf.replace(/\D/g, '');
    return cpfValidator.isValid(cpfSemMascara);
}

export async function buscarEnderecoPorCEP(cep: string) {
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
            throw new Error('CEP não encontrado.');
        }

        return {
            endereco: data.logradouro || '',
            cidade: data.localidade || '',
            estado: data.uf || '',
            pais: 'Brasil'
        };
    } catch (error) {
        console.error('Erro ao buscar CEP:', error);
        throw new Error('Erro ao buscar endereço.');
    }
}

export function validarCRP(crp: string): boolean {
    const crpRegex = /^(CRP\s*)?\d{2}\/\d{1,6}$/;
    return crpRegex.test(crp.trim().toUpperCase());
}

export function formatarCRP(valor: string): string {
    const numeros = valor.replace(/\D/g, ''); // remove tudo que não for número
    const parteRegional = numeros.slice(0, 2);
    const parteRegistro = numeros.slice(2, 8); // até 6 dígitos
    return parteRegistro ? `${parteRegional}/${parteRegistro}` : parteRegional;
}
