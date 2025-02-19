const db = require('../database');
const Produto = require('../models/Produto');

const ProdutoController = {
  async getAll(req, res) {
    try {
      const produtos = await db.all('SELECT * FROM produtos');
      res.json(produtos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar produtos' });
    }
  },

  async getById(req, res) {
    const { id } = req.params;
    try {
      const produto = await db.get('SELECT * FROM produtos WHERE id = ?', id);
      if (!produto) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }
      res.json(produto);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar produto' });
    }
  },

  async create(req, res) {
    const { nome, descricao, preco, codigoBarras } = req.body;
    try {
      const result = await db.run(
        'INSERT INTO produtos (nome, descricao, preco, codigoBarras) VALUES (?, ?, ?, ?)',
        nome,
        descricao,
        preco,
        codigoBarras
      );
      const id = result.lastID;
      res.status(201).json({ id, message: 'Produto criado com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar produto' });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const { nome, descricao, preco, codigoBarras } = req.body;
    try {
      const result = await db.run(
        'UPDATE produtos SET nome = ?, descricao = ?, preco = ?, codigoBarras = ? WHERE id = ?',
        nome,
        descricao,
        preco,
        codigoBarras,
        id
      );
      if (result.changes === 0) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }
      res.json({ message: 'Produto atualizado com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar produto' });
    }
  },

  async delete(req, res) {
    const { id } = req.params;
    try {
      const result = await db.run('DELETE FROM produtos WHERE id = ?', id);
      if (result.changes === 0) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }
      res.json({ message: 'Produto deletado com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao deletar produto' });
    }
  },
};

module.exports = ProdutoController;