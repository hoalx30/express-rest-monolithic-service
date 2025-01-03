const {
	sequelize: { sequelize },
} = require('../context');
const { DataTypes } = require('sequelize');

const device = sequelize.define(
	'device',
	{
		ipAddress: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		userAgent: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		tableName: 'devices',
		paranoid: true,
		createdAt: 'createdAt',
		updatedAt: 'updatedAt',
		deletedAt: 'deletedAt',
	},
);

module.exports = device;
