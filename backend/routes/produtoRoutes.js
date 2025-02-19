const express = require('express');
const router = express.Router();
const ProdutoController = require('../controllers/ProdutoController');

// Rotas para produtos
router.get('/', ProdutoController.getAll); // Rota para listar todos os produtos
router.get('/:id', ProdutoController.getById); // Rota para obter um produto por ID
router.post('/', ProdutoController.create); // Rota para criar um novo produto
router.put('/:id', ProdutoController.update); // Rota para atualizar um produto
router.delete('/:id', ProdutoController.delete); // Rota para deletar um produto

module.exports = router; // Exporta o roteador com as rotas