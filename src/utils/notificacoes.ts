import { toast } from 'react-toastify';

export const copiarParaAreaDeTransferencia = async (texto: string, label: string = 'Texto') => {
    try {
        await navigator.clipboard.writeText(texto);
        toast.success(`${label} copiado com sucesso!`, {
            position: 'top-right',
            autoClose: 3000,
            theme: 'colored',
        });
    } catch {
        toast.error(`Erro ao copiar o ${label.toLowerCase()}!`, {
            position: 'top-right',
            autoClose: 3000,
            theme: 'colored',
        });
    }
};

export const notificarSucesso = async (label: string = 'Texto') => {
    toast.success(`${label} com sucesso!`, {
        position: 'top-right',
        autoClose: 3000,
        theme: 'colored',
    });
}

export const notificarErro = async (label: string = 'Texto') => {
    toast.error(`Erro ao copiar o ${label.toLowerCase()}!`, {
        position: 'top-right',
        autoClose: 3000,
        theme: 'colored',
    });
}
