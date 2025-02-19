const express = require('express');
const router = express.Router();
const FornecedorController = require('../controllers/FornecedorController');

// Rotas para fornecedores
router.get('/', FornecedorController.getAll); // Rota para listar todos os fornecedores
router.get('/:id', FornecedorController.getById); // Rota para obter um fornecedor por ID
router.post('/', FornecedorController.create); // Rota para criar um novo fornecedor
router.put('/:id', FornecedorController.update); // Rota para atualizar um fornecedor
router.delete('/:id', FornecedorController.delete); // Rota para deletar um fornecedor

module.exports = router; // Exporta o roteador com as rotas