import { useState, useEffect } from "react";
import "./verPsicologos.css";
import { useLocation } from "react-router-dom";
import Header from "../../components/layout/header/header";
import CardPsicologo from "../../components/layout/Cards/cardPsicologo/cardPsicologo";
import Pesquisa from "../../components/layout/pesquisa/pesquisa";
import Carrossel from "../../components/layout/carrossel/carrossel";
import { listarPsicologos } from "../../services/listarPsicologos.service";
import { listarAvaliacoesPorPsicologo } from "../../services/listarAvaliacoesPorPsicologo";
import { PsicologoCompilado } from "../../models/psicologo.compilado";

import calcular from "../../utils/calculoData";
import calcularMedia from "../../utils/mediaAvaliacao";
import qtdeAvaliacao from "../../utils/qtdeAvaliacao";

type ProfissionalCard = {
    idPsicologo: string;
    urlFoto: string;
    nome: string;
    idade: number;
    crp: string;
    mediaAvaliacoes: number;
    quantidadeAvaliacoes: number;
    biografia: string;
};

export default function VerPsicologos() {
    const [pesquisaTermo, setPesquisaTermo] = useState("");
    const [profissionais, setProfissionais] = useState<ProfissionalCard[]>([]);

    

    useEffect(() => {
        async function carregarPsicologos() {
            const listaPsicologos = await listarPsicologos(0);

            console.log(listaPsicologos);

            const compiladoPromises = listaPsicologos.dado?.content.map(async (psicologo) => {
                const avaliacoes = await listarAvaliacoesPorPsicologo(psicologo.id, 0);
                return {
                    psicologo,
                    avaliacao: avaliacoes.dado?.content,
                } as PsicologoCompilado;
            });

            if (compiladoPromises) {
                const compilado = await Promise.all(compiladoPromises);

                const profissionaisMapeados: ProfissionalCard[] = compilado.map(
                    (item) => ({
                        idPsicologo: item.psicologo.id,
                        urlFoto: item.psicologo.fotoUrl,
                        nome: item.psicologo.nome,
                        idade: calcular(item.psicologo.dataNascimento),
                        crp: item.psicologo.crp,
                        mediaAvaliacoes: calcularMedia(item.avaliacao),
                        quantidadeAvaliacoes: qtdeAvaliacao(item.avaliacao),
                        biografia: item.psicologo.biografia,
                    })
                );

                setProfissionais(profissionaisMapeados);
            }
            
        }

        carregarPsicologos();
    }, []);

    const profissionaisFiltrados = profissionais.filter((profissional) =>
        profissional.nome.toLowerCase().includes(pesquisaTermo.toLowerCase())
    );

    const handlePesquisar = (termo: string) => {
        setPesquisaTermo(termo);
    };

    const location = useLocation();
    const headerPsicologo = location.state.headerPsicologo;

    return (
        <>
            <Header fluxo="verProfissionais" headerPsicologo={headerPsicologo} />
            <Carrossel
                profissionais={profissionais}
                headerPsicologo={headerPsicologo}
            />

            <Pesquisa onPesquisar={handlePesquisar} />
            {profissionaisFiltrados.length === 0 ? (
                <p className="mensagem-nenhum-psicologo">
                    Nenhum psicólogo com esse nome foi encontrado.
                </p>
            ) : (
                <CardPsicologo
                    profissionais={profissionaisFiltrados}
                    headerPsicologo={headerPsicologo}
                />
            )}
        </>
    );
}
