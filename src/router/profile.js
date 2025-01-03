const express = require('express');
const route = express.Router();

const { profileController } = require('../controller');
const {
	validate: { idRule, pagingRule, validated },
} = require('../middleware');

route.post('/', profileController.save);
route.get('/', pagingRule(), validated, profileController.findAll);
route.get('/search', pagingRule(), validated, profileController.findAllBy);
route.get('/archived', pagingRule(), validated, profileController.findAllArchived);
route.get('/:id', idRule(), validated, profileController.findById);
route.patch('/:id', idRule(), validated, profileController.update);
route.delete('/:id', idRule(), validated, profileController.remove);

module.exports = route;
