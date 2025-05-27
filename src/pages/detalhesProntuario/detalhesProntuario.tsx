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

    const handleChange = (field: string, value: string) => {
        setProntuario({ ...prontuario, [field]: value });
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
                        {isEditing ? (
                            <>
                                <h2 className="label-edicao">Paciente</h2>
                                <input
                                    className="conteudoDoInput"
                                    type="text"
                                    value={formData.paciente}
                                    onChange={(e) => handleChange("paciente", e.target.value)}
                                />
                            </>
                        ) : (
                            <InputLeitura titulo="Paciente" value={formData.paciente} isContent={false} />
                        )}
                    </div>
                    <div className="info-bloco">
                        {isEditing ? (
                            <>
                                <h2 className="label-edicao">Consulta</h2>
                                <input
                                    className="conteudoDoInput"
                                    type="text"
                                    value={formData.consulta}
                                    onChange={(e) => handleChange("consulta", e.target.value)}
                                />
                            </>
                        ) : (
                            <InputLeitura titulo="Consulta" value={formData.consulta} isContent={false} />
                        )}
                    </div>
                </div>

                <div className="info-bloco">
                    {isEditing ? (
                        <>
                            <h2 className="label-edicao">Psicólogo</h2>
                            <input
                                className="conteudoDoInput"
                                type="text"
                                value={formData.psicologo}
                                onChange={(e) => handleChange("psicologo", e.target.value)}
                            />
                        </>
                    ) : (
                        <InputLeitura titulo="Psicólogo" value={formData.psicologo} isContent={false} />
                    )}
                </div>

                <h2>Conteúdo</h2>
                <div className="conteudo-box">
                    {isEditing ? (
                        <>
                            <textarea
                                className="conteudo-textarea"
                                value={formData.conteudo}
                                onChange={(e) => handleChange("conteudo", e.target.value)}
                            />
                        </>
                    ) : (
                        <p>
                            <InputLeitura titulo="" value={formData.conteudo} isContent={true} />
                        </p>
                    )}
                </div>

                <div className="dados-adicionais">
                    <div className="dados-data">
                        <p>Criado em: {formData.dataCriacao}</p>
                        <p>Editado em: {formData.dataEdicao}</p>
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
            </main>
        </div>
    );
}
