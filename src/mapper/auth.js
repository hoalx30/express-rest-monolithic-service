const asUserCreation = (request) => ({ username: request.username, password: request.password, roleIds: request.roleIds });

const asUserResponse = (user) => ({ id: user.id, username: user.username, roles: user.roles });

module.exports = { asUserCreation, asUserResponse };
