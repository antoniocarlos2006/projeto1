const db = require('../database');
const Associacao = require('../models/Associacao');

const AssociacaoController = {
  async getAll(req, res) {
    try {
      const associacoes = await db.all('SELECT * FROM associacoes');
      res.json(associacoes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar associações' });
    }
  },

  async getById(req, res) {
    const { id } = req.params;
    try {
      const associacao = await db.get('SELECT * FROM associacoes WHERE id = ?', id);
      if (!associacao) {
        return res.status(404).json({ error: 'Associação não encontrada' });
      }
      res.json(associacao);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar associação' });
    }
  },

  async create(req, res) {
    const { produtoId, fornecedorId } = req.body;
    try {
      const result = await db.run(
        'INSERT INTO associacoes (produtoId, fornecedorId) VALUES (?, ?)',
        produtoId,
        fornecedorId
      );
      const id = result.lastID;
      res.status(201).json({ id, message: 'Associação criada com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar associação' });
    }
  },

  async delete(req, res) {
    const { id } = req.params;
    try {
      const result = await db.run('DELETE FROM associacoes WHERE id = ?', id);
      if (result.changes === 0) {
        return res.status(404).json({ error: 'Associação não encontrada' });
      }
      res.json({ message: 'Associação deletada com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao deletar associação' });
    }
  },
};

module.exports = AssociacaoController;