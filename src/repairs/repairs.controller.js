import { RepairService } from "./repairs.service.js"

const repairService = new RepairService()

export const findAllRepair = async(req, res) => {
    try {
        const repairs = await repairService.findAllWithllData()

        return res.status(200).json(repairs)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const createRepair = async(req,res) => {
    try {
        const repair = await repairService.create(req.body);

        return res.status(201).json(repair)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const findOneRepair = async(req,res) => {
    try {
        const {id} = req.params;

        const repair = await repairService.findOne(id)

        if(!repair){
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            })
        }

        return res.status(200).json(repair)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const updateRepair = async(req,res) => {
    try {
        const { id} = req.params;

        const repair = await repairService.findOne(id)

        if(!repair){
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            })
        }

        const repairUpdated = await repairService.update(repair, req.body);

        return res.status(200).json(repairUpdated)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const deleteRepair = async(req,res) => {
    try {
        const { id} = req.params;

        const repair = await repairService.findOne(id)

        if(!repair){
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            })
        }

        await repairService.delete(repair)

        return res.status(204).json(null)
    } catch (error) {
        return res.status(500).json(error)
    }
}