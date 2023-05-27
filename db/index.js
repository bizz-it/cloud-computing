const { Sequelize } = require("sequelize");
const { DataTypes, UUIDV4 } = require("sequelize");

const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USERNAME,
	process.env.DB_PASSWORD,
	{
		host: process.env.DB_HOST,
		define: {
			freezeTableName: true,
			updatedAt: "updated_at",
			createdAt: "created_at",
		},
		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000,
		},

		dialect: "mysql",
	}
);

const User = sequelize.define("users", {
	id: {
		type: DataTypes.UUID,
		defaultValue: UUIDV4,
		primaryKey: true,
		allowNull: false,
	},
	nama: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING(100),
		allowNull: false,
		unique: true,
	},
	password: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
	no_telp: {
		type: DataTypes.STRING(15),
		allowNull: false,
	},
	tempat_lahir: {
		type: DataTypes.STRING(100),
	},
	tanggal_lahir: {
		type: DataTypes.DATEONLY,
	},
	foto: {
		type: DataTypes.STRING(100),
	},
	is_verified: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
	otp: {
		type: DataTypes.STRING(6),
		allowNull: true,
	},
});

const FranchiseCategory = sequelize.define("franchise_categories", {
	id: {
		type: DataTypes.UUID,
		defaultValue: UUIDV4,
		primaryKey: true,
		allowNull: false,
	},
	category: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
});

const Franchise = sequelize.define("franchises", {
	id: {
		type: DataTypes.UUID,
		defaultValue: UUIDV4,
		primaryKey: true,
		allowNull: false,
	},
	company: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
	foto: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
	total_gerai: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	deskripsi: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
	requirement: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
	dokumen: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
	is_verified: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
	otp: {
		type: DataTypes.STRING(6),
		allowNull: true,
	},
});

User.hasMany(Franchise, {
	foreignKey: "user_id",
	as: "franchises",
});

Franchise.belongsTo(User, {
	foreignKey: "user_id",
	as: "user",
});

Franchise.belongsTo(FranchiseCategory, {
	foreignKey: "franchise_category_id",
	as: "franchise_category",
});

FranchiseCategory.hasMany(Franchise, {
	foreignKey: "franchise_category_id",
	as: "franchises",
});

module.exports = { User, Franchise, sequelize };
