import { useState } from "react";
import "./detlhesProntuario.css";
import Header from "../../components/layout/header/header";
import InputLeitura from "../../components/commmon/Inputs/InputLeitura";

export default function DetalhesProntuario() {
    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        titulo: "Titulo teste",
        paciente: "Eu mesmo",
        consulta: "sessão #79 - 18/11/2005 ",
        psicologo: "André Olivira - CRP xx/xxxxx",
        conteudo: "O paciente compareceu à sessão relatando melhora significativa no quadro de ansiedade. Mencionou que as técnicas de respiração e mindfulness têm ajudado nos momentos de maior estresse, especialmente no ambiente de trabalho. Durante a sessão, trabalhamos na identificação de pensamentos automáticos negativos e suas origens. O paciente demonstrou boa capacidade de insight e conseguiu estabelecer conexões entre situações atuais e experiências passadas. Para a próxima semana, foi recomendado que continuasse com os exercícios de respiração diariamente e começasse a registrar seus pensamentos em um diário, especialmente quando sentir ansiedade. Próximos passos: aprofundar questões relacionadas à autoestima e reforçar estratégias de enfrentamento.",
        dataCriacao: "20/02/2020",
        dataEdicao: "21/02/2020"
    });

    const handleChange = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleEditar = () => {
        setIsEditing(true);
    };

    const handleCancelar = () => {
        // Você pode adicionar aqui uma lógica para restaurar os valores originais se necessário
        setIsEditing(false);    
    };

    const handleSalvar = () => {
        console.log("Salvando os dados:", formData);
        setIsEditing(false);
    };

    return (
        <>
            <Header fluxo="" headerPsicologo={true} />
            <main>
                <h1>Detalhes Do Prontuário</h1>
                <div className="info-linhas">
                    <div className="info-bloco">
                        {isEditing ? (
                            <input
                                className="conteudoDoInput"
                                type="text"
                                value={formData.titulo}
                                onChange={(e) => handleChange("titulo", e.target.value)}
                            />
                        ) : (
                            <InputLeitura titulo="Título" value={formData.titulo} isContent={false} />
                        )}
                    </div>
                    <div className="info-bloco">
                        {isEditing ? (
                            <input
                                className="conteudoDoInput"
                                type="text"
                                value={formData.paciente}
                                onChange={(e) => handleChange("paciente", e.target.value)}
                            />
                        ) : (
                            <InputLeitura titulo="Paciente" value={formData.paciente} isContent={false} />
                        )}
                    </div>
                    <div className="info-bloco">
                        {isEditing ? (
                            <input
                                className="conteudoDoInput"
                                type="text"
                                value={formData.consulta}
                                onChange={(e) => handleChange("consulta", e.target.value)}
                            />
                        ) : (
                            <InputLeitura titulo="Consulta" value={formData.consulta} isContent={false} />
                        )}
                    </div>
                </div>

                <div className="info-bloco">
                    {isEditing ? (
                        <input
                            className="conteudoDoInput"
                            type="text"
                            value={formData.psicologo}
                            onChange={(e) => handleChange("psicologo", e.target.value)}
                        />
                    ) : (
                        <InputLeitura titulo="Psicólogo" value={formData.psicologo} isContent={false} />
                    )}
                </div>

                <h2>Conteúdo</h2>
                <div className="conteudo-box">
                    {isEditing ? (
                        <textarea
                            className="conteudo-textarea"
                            value={formData.conteudo}
                            onChange={(e) => handleChange("conteudo", e.target.value)}
                        />
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
        </>
    );
}
