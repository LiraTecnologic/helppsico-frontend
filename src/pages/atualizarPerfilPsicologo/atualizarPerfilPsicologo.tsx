import React, { useState, useEffect } from 'react';
import './atualizarPerfilPsicologo.css';
import CardPerfilPsicologo from '../../components/layout/Cards/cardAtualizarPerfilPsicologo/cardPerfilPsicologo';
import PsicologoModel from '../../models/psicologo';
import Header from '../../components/layout/header/header';
import { atualizarPerfilPsicologo } from '../../services/atualizarperfil';
import axios from 'axios';
import { apresentarErro, notificarSucesso } from '../../utils/notificacoes';
import Response from '../../models/response';


export default function AtualizarPerfilPsicologo() {
    const [psicologo, setPsicologo] = useState<PsicologoModel | null>(null);
    const [valorSessao, setValorSessao] = useState<string>('');
    const [biografia, setBiografia] = useState<string>('');
    const [carregando, setCarregando] = useState<boolean>(true);
    const [erro, setErro] = useState<string | null>(null);


    useEffect(() => {
        const carregarDadosPsicologo = async () => {
            setCarregando(true);
            setErro(null);

            const idPsicologo = localStorage.getItem('id-psicologo');

            if (!idPsicologo) {
                setErro('Usuário não identificado. Faça login novamente.');
                setCarregando(false);
                return;
            }

            try {
                const response = await axios.get<Response<PsicologoModel>>(
                    `http://localhost:8080/psicologos/${idPsicologo}`
                );

                if (response.data.dado) {
                    const dadosPsicologo = response.data.dado;
                    setPsicologo(dadosPsicologo);


                    if (dadosPsicologo.valorSessao) {
                        const valorFormatado = dadosPsicologo.valorSessao.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        });
                        setValorSessao(valorFormatado);
                    }

                    setBiografia(dadosPsicologo.biografia || '');
                }

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

        // const idPsicologo = getUserId();
        const idPsicologo = localStorage.getItem('id-psicologo')

        if (!idPsicologo) {
            apresentarErro("Usuario não encontrado. Faça o login novamente")
            return;
        }

        const valorConvertido = parseFloat(valorSessao.replace(/[R$\s.]/g, '').replace(',', '.')) || 0;

        const dadosAtualizados: PsicologoModel = {
            id: psicologo.id,
            nome: psicologo.nome,
            crp: psicologo.crp,
            cpf: psicologo.cpf,
            email: psicologo.email,
            telefone: psicologo.telefone,
            dataNascimento: psicologo.dataNascimento,
            genero: psicologo.genero,
            enderecoAtendimento: psicologo.enderecoAtendimento,
            biografia,
            status: psicologo.status,
            fotoUrl: psicologo.fotoUrl,
            valorSessao: valorConvertido,
            tempoSessao: psicologo.tempoSessao
        };

        try {
            const psicologoAtualizado = await atualizarPerfilPsicologo(idPsicologo, dadosAtualizados);
            setPsicologo(psicologoAtualizado.dado);
            notificarSucesso("Perfil atualizado");
        } catch (error) {
            apresentarErro('Erro ao atualizar o perfil. Tente novamente mais tarde.');
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