const express = require('express');
const route = express.Router();

const { privilegeController } = require('../controller');
const {
	validate: { idRule, pagingRule, validated },
} = require('../middleware');

route.post('/', privilegeController.save);
route.get('/', pagingRule(), validated, privilegeController.findAll);
route.get('/search', pagingRule(), validated, privilegeController.findAllBy);
route.get('/archived', pagingRule(), validated, privilegeController.findAllArchived);
route.get('/:id', idRule(), validated, privilegeController.findById);
route.patch('/:id', idRule(), validated, privilegeController.update);
route.delete('/:id', idRule(), validated, privilegeController.remove);

module.exports = route;
