const express = require('express');
const app = express();
const db = require('./database');
const produtoRoutes = require('./routes/produtoRoutes');
const fornecedorRoutes = require('./routes/fornecedorRoutes');
const associacaoRoutes = require('./routes/associacaoRoutes');
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use('/api/produtos', produtoRoutes); // Rotas para produtos
app.use('/api/fornecedores', fornecedorRoutes); // Rotas para fornecedores
app.use('/api/associacoes', associacaoRoutes); // Rotas para associações

const PORT = process.env.PORT || 3003;

async function startServer() {
  try {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
  }
}

startServer();