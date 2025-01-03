const {
	sequelize: { sequelize },
} = require('../context');
const { DataTypes } = require('sequelize');

const role = sequelize.define(
	'role',
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		tableName: 'roles',
		paranoid: true,
		createdAt: 'createdAt',
		updatedAt: 'updatedAt',
		deletedAt: 'deletedAt',
	},
);

module.exports = role;
