import User from "./users.model.js";


export class UserService {
    async findOne(id){
        return await User.findOne({
            where: {
                status: 'activo',
                id,
            }
        })

    }

    async findAll(){
        return await User.findAll({
            where: {
                status: "activo"
            }
        })

    }

    async create(data) {
        return await User.create(data)
    }

    async update(user,data){
        return await user.update(data)
    }
    async delete(user){
        return await user.update({
            status: "deleted"
        })

    }
}