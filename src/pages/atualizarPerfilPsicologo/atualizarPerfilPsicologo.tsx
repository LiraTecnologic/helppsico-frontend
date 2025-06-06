import React, { useState, useEffect } from 'react';
import './atualizarPerfilPsicologo.css';
import CardPerfilPsicologo from '../../components/layout/Cards/cardAtualizarPerfilPsicologo/cardPerfilPsicologo';
import PsicologoModel from '../../models/psicologo';
import Header from '../../components/layout/header/header';
import { atualizarPerfilPsicologo } from '../../services/atualizarperfil';
import { getUserId } from '../../services/auth.service';
import axios from 'axios';


const AtualizarPerfilPsicologo: React.FC = () => {
    const [psicologo, setPsicologo] = useState<PsicologoModel | null>(null);
    const [valorSessao, setValorSessao] = useState<string>('');
    const [biografia, setBiografia] = useState<string>('');
    const [carregando, setCarregando] = useState<boolean>(true);
    const [erro, setErro] = useState<string | null>(null);

    
    useEffect(() => {
        const carregarDadosPsicologo = async () => {
            setCarregando(true);
            setErro(null);
            
            const idPsicologo = getUserId();
            
            if (!idPsicologo) {
                setErro('Usuário não identificado. Faça login novamente.');
                setCarregando(false);
                return;
            }
            
            try {
                const response = await axios.get<PsicologoModel>(
                    `http://localhost:8080/psicologo/${idPsicologo}`
                );
                
                const dadosPsicologo = response.data;
                setPsicologo(dadosPsicologo);
                
                
                if (dadosPsicologo.valorSessao) {
                    const valorFormatado = dadosPsicologo.valorSessao.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    });
                    setValorSessao(valorFormatado);
                }
                
                setBiografia(dadosPsicologo.biografia || '');
            } catch (error) {
                console.error('Erro ao carregar dados do psicólogo:', error);
                setErro('Não foi possível carregar seus dados. Tente novamente mais tarde.');
            } finally {
                setCarregando(false);
            }
        };
        
        carregarDadosPsicologo();
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
        
        const idPsicologo = getUserId();
        
        if (!idPsicologo) {
            alert('Usuário não identificado. Faça login novamente.');
            return;
        }
    
        const valorConvertido = parseFloat(valorSessao.replace(/[R$\s.]/g, '').replace(',', '.')) || 0;
    
        const dadosAtualizados = {
            biografia,
            valorSessao: valorConvertido
        };
    
        try {
            const psicologoAtualizado = await atualizarPerfilPsicologo(idPsicologo, dadosAtualizados);
            setPsicologo(psicologoAtualizado);
            alert('Perfil atualizado com sucesso!');
        } catch (error) {
            alert('Erro ao atualizar o perfil. Tente novamente mais tarde.');
        }
    };

    const handleVoltar = () => {
        
        window.history.back();
    };

    if (carregando) {
        return <div className="loading">Carregando...</div>;
    }
    
    if (erro) {
        return <div className="erro">{erro}</div>;
    }

    if (!psicologo) {
        return <div className="erro">Não foi possível carregar os dados do perfil.</div>;
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