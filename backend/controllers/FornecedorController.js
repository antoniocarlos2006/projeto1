const db = require('../database');
const Fornecedor = require('../models/Fornecedor');

const FornecedorController = {
  async getAll(req, res) {
    try {
      const fornecedores = await db.all('SELECT * FROM fornecedores');
      res.json(fornecedores);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar fornecedores' });
    }
  },

  async getById(req, res) {
    const { id } = req.params;
    try {
      const fornecedor = await db.get('SELECT * FROM fornecedores WHERE id = ?', id);
      if (!fornecedor) {
        return res.status(404).json({ error: 'Fornecedor não encontrado' });
      }
      res.json(fornecedor);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar fornecedor' });
    }
  },

  async create(req, res) {
    const { nome, cnpj, endereco, contato } = req.body;
    try {
      const result = await db.run(
        'INSERT INTO fornecedores (nome, cnpj, endereco, contato) VALUES (?, ?, ?, ?)',
        nome,
        cnpj,
        endereco,
        contato
      );
      const id = result.lastID;
      res.status(201).json({ id, message: 'Fornecedor criado com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar fornecedor' });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const { nome, cnpj, endereco, contato } = req.body;
    try {
      const result = await db.run(
        'UPDATE fornecedores SET nome = ?, cnpj = ?, endereco = ?, contato = ? WHERE id = ?',
        nome,
        cnpj,
        endereco,
        contato,
        id
      );
      if (result.changes === 0) {
        return res.status(404).json({ error: 'Fornecedor não encontrado' });
      }
      res.json({ message: 'Fornecedor atualizado com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar fornecedor' });
    }
  },

  async delete(req, res) {
    const { id } = req.params;
    try {
      const result = await db.run('DELETE FROM fornecedores WHERE id = ?', id);
      if (result.changes === 0) {
        return res.status(404).json({ error: 'Fornecedor não encontrado' });
      }
      res.json({ message: 'Fornecedor deletado com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao deletar fornecedor' });
    }
  },
};

module.exports = FornecedorController;