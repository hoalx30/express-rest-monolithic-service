const bcrypt = require('bcrypt');

const bcryptPattern = /^\$2[ayb]\$.{56}$/;

const doAssociation = (...args) => {
	const [privilege, role, user, device, profile] = args;

	privilege.belongsToMany(role, {
		through: 'privilege_roles',
		foreignKey: 'privilegeId',
		as: 'roles',
	});
	role.belongsToMany(privilege, {
		through: 'privilege_roles',
		foreignKey: 'roleId',
		as: 'privileges',
	});
	role.belongsToMany(user, {
		through: 'role_users',
		foreignKey: 'roleId',
		as: 'users',
	});
	user.belongsToMany(role, {
		through: 'role_users',
		foreignKey: 'userId',
		as: 'roles',
	});

	user.hasOne(profile, { foreignKey: 'userId', as: 'profile' });
	profile.belongsTo(user, { foreignKey: 'userId', as: 'user' });

	user.hasMany(device, { foreignKey: 'userId', as: 'device' });
	device.belongsTo(user, { foreignKey: 'userId', as: 'user' });
};

const doHooks = (...args) => {
	const [user] = args;

	user.beforeCreate(async (user, options) => {
		user.password = await bcrypt.hash(user.password, parseInt(process.env.BCRYPT_DEFAULT_SALT));
	});
	user.beforeUpdate(async (user, options) => {
		const isEncryptPassword = bcryptPattern.test(user.password);
		if (!isEncryptPassword) user.password = await bcrypt.hash(user.password, parseInt(process.env.BCRYPT_DEFAULT_SALT));
	});
};

module.exports = { doAssociation, doHooks };
