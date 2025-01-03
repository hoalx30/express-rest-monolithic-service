const express = require('express');
const route = express.Router();

const { userController } = require('../controller');
const {
	validate: { idRule, pagingRule, validated },
} = require('../middleware');

route.post('/', userController.save);
route.get('/', pagingRule(), validated, userController.findAll);
route.get('/search', pagingRule(), validated, userController.findAllBy);
route.get('/archived', pagingRule(), validated, userController.findAllArchived);
route.get('/:id', idRule(), validated, userController.findById);
route.patch('/:id', idRule(), validated, userController.update);
route.delete('/:id', idRule(), validated, userController.remove);

module.exports = route;
