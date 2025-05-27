import { useState, useEffect } from "react";
import "./detlhesProntuario.css";
import Header from "../../components/layout/header/header";
import InputLeitura from "../../components/commmon/Inputs/InputLeitura";
import ProntuarioModel from "../../models/prontuario";
import { consultarProntuarioPorId } from "../../services/prontuarios.service";

export default function DetalhesProntuario() {
    const [isEditing, setIsEditing] = useState(false);

    const [prontuario, setProntuario] = useState<ProntuarioModel | null>(null);

    const [prontuarioOriginal, setProntuarioOriginal] = useState<ProntuarioModel | null>(null);

    const handleChange = (field: keyof ProntuarioModel, value: string) => {
        if (!prontuario) return;
        setProntuario({
            ...prontuario,
            [field]: value
        });
    };

    const handleEditar = () => {
        setProntuarioOriginal(prontuario);
        setIsEditing(true);
    };

    const handleCancelar = () => {
        setProntuario(prontuarioOriginal);
        setIsEditing(false);
    };

    const handleSalvar = () => {
        setIsEditing(false);
    };

    useEffect(() => {
        async function carregarProntuario(idPronturio: string) {
            const prontuario = await consultarProntuarioPorId(idPronturio);
            setProntuario(prontuario.dado);
        }

        carregarProntuario("teste");
    }, []);

    return (
        <div>
            <Header fluxo="" headerPsicologo={true} />
            <main className="container-principal">
                <h1>Detalhes Do Prontuário</h1>
                <div className="info-linhas">
                    <div className="info-bloco">
                        {isEditing && prontuario && (
                            <>
                                <h2 className="label-edicao">Título</h2>
                                <input
                                    className="conteudoDoInput"
                                    type="text"
                                    value={prontuario.titulo}
                                    onChange={(e) => handleChange("titulo", e.target.value)}
                                />
                            </>
                        )}

                        {!isEditing && prontuario && (
                            <InputLeitura titulo="Título" value={prontuario.titulo} isContent={false} />
                        )}

                    </div>
                    <div className="info-bloco">
                        {isEditing && prontuario && (
                            <>
                                <h2 className="label-edicao">Paciente</h2>
                                <input
                                    className="conteudoDoInput"
                                    type="text"
                                    value={prontuario.paciente.nome}
                                    onChange={(e) => handleChange("paciente", e.target.value)}
                                />
                            </>
                        )}

                        {!isEditing && prontuario && (
                            <InputLeitura titulo="Paciente" value={prontuario.paciente.nome} isContent={false} />
                        )}

                    </div>
                    <div className="info-bloco">
                        {isEditing && prontuario && (
                            <>
                                <h2 className="label-edicao">Consulta</h2>
                                <input
                                    className="conteudoDoInput"
                                    type="text"
                                    value={prontuario.consulta.id}
                                    onChange={(e) => handleChange("consulta", e.target.value)}
                                />
                            </>
                        )}

                        {!isEditing && prontuario && (
                            <InputLeitura titulo="Consulta" value={prontuario.consulta.id} isContent={false} />
                        )}

                    </div>
                </div>

                <div className="info-bloco">
                    {isEditing && prontuario && (
                        <>
                            <h2 className="label-edicao">Psicólogo</h2>
                            <input
                                className="conteudoDoInput"
                                type="text"
                                value={prontuario.psicologo.nome}
                                onChange={(e) => handleChange("psicologo", e.target.value)}
                            />
                        </>
                    )}

                    {!isEditing && prontuario && (
                        <InputLeitura titulo="Psicólogo" value={prontuario.psicologo.nome} isContent={false} />
                    )}
                </div>

                <h2>Conteúdo</h2>
                <div className="conteudo-box">
                    {isEditing && prontuario && (
                        <>
                            <textarea
                                className="conteudo-textarea"
                                value={prontuario.conteudo}
                                onChange={(e) => handleChange("conteudo", e.target.value)}
                            />
                        </>
                    )}

                    {!isEditing && prontuario && (
                        <p>
                            <InputLeitura titulo="" value={prontuario.conteudo} isContent={true} />
                        </p>
                    )}

                </div>

                {prontuario && (
                    <div className="dados-adicionais">
                        <div className="dados-data">
                            <p>Criado em: {prontuario.dataCriacao}</p>
                            <p>Editado em: {prontuario.dataEdicao}</p>
                        </div>

                        <div className="botoes-prontuario">
                            {isEditing ? (
                                <>
                                    <button onClick={handleSalvar} className="botao-editar">Salvar</button>
                                    <button onClick={handleCancelar} className="botao-voltar">Cancelar</button>
                                </>
                            ) : (
                                <>
                                    <button onClick={handleEditar} className="botao-editar">Editar</button>
                                    <button onClick={() => console.log("Voltar clicado")} className="botao-voltar">Voltar</button>
                                </>
                            )}
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
}
