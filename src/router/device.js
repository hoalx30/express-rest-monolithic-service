const express = require('express');
const route = express.Router();

const { deviceController } = require('../controller');
const {
	validate: { idRule, pagingRule, validated },
} = require('../middleware');

route.post('/', deviceController.save);
route.get('/', pagingRule(), validated, deviceController.findAll);
route.get('/search', pagingRule(), validated, deviceController.findAllBy);
route.get('/archived', pagingRule(), validated, deviceController.findAllArchived);
route.get('/:id', idRule(), validated, deviceController.findById);
route.patch('/:id', idRule(), validated, deviceController.update);
route.delete('/:id', idRule(), validated, deviceController.remove);

module.exports = route;
