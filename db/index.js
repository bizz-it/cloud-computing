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

const User = sequelize.define(
	"users",
	{
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
	},
	{ indexes: [{ unique: true, fields: ["email"] }] }
);

const Otp = sequelize.define("otps", {
	id: {
		type: DataTypes.UUID,
		defaultValue: UUIDV4,
		primaryKey: true,
		allowNull: false,
	},
	otp: {
		type: DataTypes.STRING(100),
		allowNull: false,
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
	nama: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
	logo: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
	foto: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
	total_gerai: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
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
});

const FranchisePackage = sequelize.define("franchise_packages", {
	id: {
		type: DataTypes.UUID,
		defaultValue: UUIDV4,
		primaryKey: true,
		allowNull: false,
	},
	package: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
	price: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
});

const Agreement = sequelize.define("agreements", {
	id: {
		type: DataTypes.UUID,
		defaultValue: UUIDV4,
		primaryKey: true,
		allowNull: false,
	},
	franchise_id: {
		type: DataTypes.UUID,
		allowNull: false,
	},
	user_id: {
		type: DataTypes.UUID,
		allowNull: false,
	},
	franchise_package_id: {
		type: DataTypes.UUID,
		allowNull: false,
	},
	users_location: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
	users_photo_location: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
	agreement_document: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
});

const ForumDiscussion = sequelize.define("forum_discussions", {
	id: {
		type: DataTypes.UUID,
		defaultValue: UUIDV4,
		primaryKey: true,
		allowNull: false,
	},
	user_id: {
		type: DataTypes.UUID,
		allowNull: false,
	},
	discussion: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
});

const ForumReply = sequelize.define("forum_replies", {
	id: {
		type: DataTypes.UUID,
		defaultValue: UUIDV4,
		primaryKey: true,
		allowNull: false,
	},
	user_id: {
		type: DataTypes.UUID,
	},
	franchise_id: {
		type: DataTypes.UUID,
	},
	forum_discussion_id: {
		type: DataTypes.UUID,
		allowNull: false,
	},
	reply: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
});

User.hasMany(Agreement, {
	foreignKey: "user_id",
	as: "agreements",
});

Agreement.belongsTo(User, {
	foreignKey: "user_id",
	as: "user",
});

Franchise.hasMany(Agreement, {
	foreignKey: "franchise_id",
	as: "agreements",
});

Agreement.belongsTo(Franchise, {
	foreignKey: "franchise_id",
	as: "franchise",
});

FranchisePackage.hasMany(Agreement, {
	foreignKey: "franchise_package_id",
	as: "agreements",
});

Agreement.belongsTo(FranchisePackage, {
	foreignKey: "franchise_package_id",
	as: "franchise_package",
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

Franchise.hasMany(FranchisePackage, {
	foreignKey: "franchise_id",
	as: "franchise_packages",
});

FranchisePackage.belongsTo(Franchise, {
	foreignKey: "franchise_id",
	as: "franchise",
});

ForumDiscussion.hasMany(ForumReply, {
	foreignKey: "forum_discussion_id",
	as: "forum_replies",
});

ForumReply.belongsTo(ForumDiscussion, {
	foreignKey: "forum_discussion_id",
	as: "forum_discussion",
});

User.hasMany(ForumDiscussion, {
	foreignKey: "user_id",
	as: "forum_discussions",
});

ForumDiscussion.belongsTo(User, {
	foreignKey: "user_id",
	as: "user",
});

User.hasMany(ForumReply, {
	foreignKey: "user_id",
	as: "forum_replies",
});

ForumReply.belongsTo(User, {
	foreignKey: "user_id",
	as: "user",
});

Franchise.hasMany(ForumReply, {
	foreignKey: "franchise_id",
	as: "forum_replies",
});

ForumReply.belongsTo(Franchise, {
	foreignKey: "franchise_id",
	as: "franchise",
});

User.hasMany(Otp, {
	foreignKey: "user_id",
	as: "otps",
});

Otp.belongsTo(User, {
	foreignKey: "user_id",
	as: "user",
});

module.exports = {
	User,
	Otp,
	Franchise,
	FranchiseCategory,
	FranchisePackage,
	Agreement,
	ForumDiscussion,
	ForumReply,
	sequelize,
};
