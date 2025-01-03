const { badCredential } = require('../model');

const save = async (model) => await badCredential.create(model);

const existsByAccessTokenId = async (accessTokenId) => (await badCredential.count({ where: { accessTokenId } })) > 0;

module.exports = { save, existsByAccessTokenId };
