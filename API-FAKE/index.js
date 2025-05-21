const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 7000;
const DB_PATH = path.join(__dirname, 'db.json');

app.use(cors()); // Habilitar CORS para todas as origens
app.use(express.json()); // Middleware para parsear JSON no corpo das requisições

// Função auxiliar para ler o db.json
const readDb = () => {
    try {
        const data = fs.readFileSync(DB_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Erro ao ler db.json:', error);
        // Retorna uma estrutura vazia ou padrão em caso de erro ou se o arquivo não existir
        return { pacientes: [], psicologos: [], vinculos: [] }; 
    }
};

// Função auxiliar para escrever no db.json
const writeDb = (data) => {
    try {
        fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        console.error('Erro ao escrever no db.json:', error);
    }
};

// Rota GET /vinculos
app.get('/vinculos', (req, res) => {
    const db = readDb();
    let vinculosFiltrados = [...db.vinculos];

    const { pacienteId, _expand } = req.query;

    if (pacienteId) {
        vinculosFiltrados = vinculosFiltrados.filter(v => v.pacienteId === pacienteId);
    }

    if (_expand) {
        const expandParams = Array.isArray(_expand) ? _expand : [_expand];
        vinculosFiltrados = vinculosFiltrados.map(vinculo => {
            const vinculoExpandido = { ...vinculo };
            if (expandParams.includes('psicologo') && vinculo.psicologoId) {
                vinculoExpandido.psicologo = db.psicologos.find(p => p.id === vinculo.psicologoId) || null;
            }
            if (expandParams.includes('paciente') && vinculo.pacienteId) {
                vinculoExpandido.paciente = db.pacientes.find(p => p.id === vinculo.pacienteId) || null;
            }
            return vinculoExpandido;
        });
    }

    res.json(vinculosFiltrados);
});

// Rota PATCH /vinculos/:id
app.patch('/vinculos/:id', (req, res) => {
    const db = readDb();
    const { id } = req.params;
    const { status } = req.body; // Espera que o status venha no corpo da requisição

    const vinculoIndex = db.vinculos.findIndex(v => v.id === id);

    if (vinculoIndex === -1) {
        return res.status(404).json({ message: 'Vínculo não encontrado' });
    }

    // Atualiza apenas o status do vínculo
    db.vinculos[vinculoIndex].status = status;
    
    writeDb(db);
    res.json(db.vinculos[vinculoIndex]);
});

// Rota GET para retornar todo o db.json (conforme solicitado adicionalmente)
app.get('/db', (req, res) => {
    const db = readDb();
    res.json(db);
});

// Rota PUT/POST para atualizar todo o db.json (conforme solicitado adicionalmente)
// Usando PUT para substituir o conteúdo inteiro, POST seria mais para criar novo recurso
app.put('/db', (req, res) => {
    const novoDbConteudo = req.body;
    if (typeof novoDbConteudo !== 'object' || novoDbConteudo === null) {
        return res.status(400).json({ message: 'Corpo da requisição inválido. Esperado um objeto JSON.' });
    }
    // Validação básica da estrutura esperada (opcional, mas recomendado)
    if (!novoDbConteudo.pacientes || !novoDbConteudo.psicologos || !novoDbConteudo.vinculos) {
        return res.status(400).json({ message: 'Estrutura do JSON inválida. Faltando pacientes, psicologos ou vinculos.' });
    }
    writeDb(novoDbConteudo);
    res.json({ message: 'db.json atualizado com sucesso!' });
});


app.listen(PORT, () => {
    console.log(`Servidor API FAKE rodando em http://localhost:${PORT}`);
    // Verifica se o db.json existe, se não, cria um com estrutura básica
    if (!fs.existsSync(DB_PATH)) {
        console.log('db.json não encontrado. Criando um novo com estrutura básica.');
        const initialDb = {
            pacientes: [
                { id: "1", nome: "Paciente Exemplo 1", email: "paciente1@example.com" },
                { id: "2", nome: "Paciente Exemplo 2", email: "paciente2@example.com" }
            ],
            psicologos: [
                { id: "101", nome: "Dr. Exemplo Silva", especialidade: "TCC", idade: 35, crp: "06/00001", avaliacao: 4.7 },
                { id: "102", nome: "Dra. Exemplo Souza", especialidade: "Psicanálise", idade: 42, crp: "06/00002", avaliacao: 4.9 }
            ],
            vinculos: [
                { id: "v1", pacienteId: "1", psicologoId: "101", status: "PENDENTE", dataSolicitacao: "2024-07-20T10:00:00Z" },
                { id: "v2", pacienteId: "1", psicologoId: "102", status: "ATIVO", dataSolicitacao: "2024-07-15T14:30:00Z" },
                { id: "v3", pacienteId: "2", psicologoId: "101", status: "INATIVO", dataSolicitacao: "2024-06-01T09:00:00Z" }
            ]
        };
        writeDb(initialDb);
    }
});