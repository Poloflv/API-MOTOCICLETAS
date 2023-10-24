import Repair from "../../repairs/repairs.model.js";
import User from "../../users/users.model.js";

export const initModel = () => {

    User.hasMany(Repair,{foreignKey: 'userId', as:'userIdRepair'})
    Repair.belongsTo(User, {foreignKey: 'userId'})
}