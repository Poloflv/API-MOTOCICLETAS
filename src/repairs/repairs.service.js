import User from "../users/users.model.js";
import Repair from "./repairs.model.js";


export class RepairService {
    async findOne(id){
        return await Repair.findOne({
            where: {
                status: 'pending',
                id,
            },
            include: [
                {
                    model: User,
                    attributes: ['name', 'email','id']
                }
            ]
        })

    }

    async findAll(){
        return await Repair.findAll({
            where: {
                status: "pending"
            }
        })
    }

    async findAllWithllData(){
        return await Repair.findAll({
            where: {
                status: ["pending","completed"],
            },
            include: [
                {
                    model: User,
                    attributes: ['name', 'email','id']
                }
            ]
        })
    }

    async create(data) {
        return await Repair.create(data)
    }

    async update(repair,data){
        return await repair.update(data)
    }
    async delete(repair){
        return await repair.update({
            status: "cancelled"
        })

    }
}