const express = require('express');
const route = express.Router();

const { roleController } = require('../controller');
const {
	validate: { idRule, pagingRule, validated },
} = require('../middleware');

route.post('/', roleController.save);
route.get('/', pagingRule(), validated, roleController.findAll);
route.get('/search', pagingRule(), validated, roleController.findAllBy);
route.get('/archived', pagingRule(), validated, roleController.findAllArchived);
route.get('/:id', idRule(), validated, roleController.findById);
route.patch('/:id', idRule(), validated, roleController.update);
route.delete('/:id', idRule(), validated, roleController.remove);

module.exports = route;
