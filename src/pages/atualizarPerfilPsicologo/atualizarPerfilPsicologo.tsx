import React, { useState, useEffect } from 'react';
import './atualizarPerfilPsicologo.css';
import CardPerfilPsicologo from '../../components/layout/Cards/cardAtualizarPerfilPsicologo/cardPerfilPsicologo';
import PsicologoModel from '../../models/psicologo';
import Header from '../../components/layout/header/header';
import { atualizarPerfilPsicologo } from '../../services/atualizarperfil';


const AtualizarPerfilPsicologo: React.FC = () => {
    const [psicologo, setPsicologo] = useState<PsicologoModel | null>(null);
    const [valorSessao, setValorSessao] = useState<string>('');
    const [biografia, setBiografia] = useState<string>('');

    
    useEffect(() => {
        
        const dadosPsicologo: PsicologoModel = {
            id: '1',
            nome: 'Dr. João Silva',
            crp: '12345',
            cpf: '123.456.789-00',
            email: 'joao@exemplo.com',
            telefone: '(11) 99999-9999',
            dataNascimento: '1985-05-15',
            genero: 'Masculino',
            enderecoAtendimento: 'Rua das Flores, 123',
            biografia: '',
            status: 'Ativo',
            fotoUrl: ''
        };
        
        
        const valorSessaoInicial = 0; 
        
        setPsicologo(dadosPsicologo);
        setValorSessao(valorSessaoInicial > 0 ? valorSessaoInicial.toString() : '');
        setBiografia(dadosPsicologo.biografia);
    }, []);

    const handleValorSessaoChange = (valor: string) => {
        
        const numeroLimpo = valor.replace(/\D/g, '');
        
        
        const valorEmCentavos = parseInt(numeroLimpo) / 100;
        
        
        const valorFormatado = valorEmCentavos.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
        
        setValorSessao(valorFormatado);
    };

    const handleBiografiaChange = (novaBiografia: string) => {
        setBiografia(novaBiografia);
    };

    const handleEditar = async () => {
        if (!psicologo) return;
    
        const valorConvertido = parseFloat(valorSessao.replace(/[R$\s.]/g, '').replace(',', '.')) || 0;
    
        const dadosAtualizados = {
            biografia,
            valorSessao: valorConvertido
        };
    
        try {
            const psicologoAtualizado = await atualizarPerfilPsicologo(psicologo.id, dadosAtualizados);
            setPsicologo(psicologoAtualizado);
            alert('Perfil atualizado com sucesso!');
        } catch (error) {
            alert('Erro ao atualizar o perfil. Tente novamente mais tarde.');
        }
    };

    const handleVoltar = () => {
        
        window.history.back();
    };

    if (!psicologo) {
        return <div className="loading">Carregando...</div>;
    }

    const getBotaoTexto = () => {
        return (!valorSessao && !biografia) ? 'Salvar' : 'Editar';
    };

    return (
        <>
            <Header fluxo="atualizacaoPerfil" headerPsicologo={true} />
            
            <main className="main-content">
                <CardPerfilPsicologo
                    psicologo={psicologo}
                    valorSessao={valorSessao}
                    biografia={biografia}
                    onValorSessaoChange={handleValorSessaoChange}
                    onBiografiaChange={handleBiografiaChange}
                    onEditar={handleEditar}
                    onVoltar={handleVoltar}
                    botaoTexto={getBotaoTexto()}
                />
            </main>
        </>
    );
};

export default AtualizarPerfilPsicologo;