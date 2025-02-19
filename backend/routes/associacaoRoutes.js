const express = require('express');
const router = express.Router();
const AssociacaoController = require('../controllers/AssociacaoController');

// Rotas para associações
router.get('/', AssociacaoController.getAll); // Rota para listar todas as associações
router.get('/:id', AssociacaoController.getById); // Rota para obter uma associação por ID
router.post('/', AssociacaoController.create); // Rota para criar uma nova associação
router.delete('/:id', AssociacaoController.delete); // Rota para deletar uma associação

module.exports = router; // Exporta o roteador com as rotas