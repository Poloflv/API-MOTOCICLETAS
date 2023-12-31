import { DataTypes } from "sequelize";
import sequelize from "../config/database/database.js";
import { encryptedPassword } from "../config/plugins/encripted.password.plugin.js";


const User = sequelize.define('users', {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM("jefe", "empleado", "usuario"),
        defaultValue: "usuario"
    },
    status: {
        type: DataTypes.ENUM("activo","inactivo", "deleted"),
        defaultValue: "activo",
        allowNull: false
    }
    
},{
    hooks: {
        beforeCreate: async(user) => {
            user.password = await encryptedPassword(user.password)
        },
    }
})

export default User