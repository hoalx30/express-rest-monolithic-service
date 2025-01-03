const {
	sequelize: { sequelize },
} = require('../context');
const { DataTypes } = require('sequelize');

const profile = sequelize.define(
	'profile',
	{
		fullName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		tableName: 'profile',
		paranoid: true,
		createdAt: 'createdAt',
		updatedAt: 'updatedAt',
		deletedAt: 'deletedAt',
	},
);

module.exports = profile;
