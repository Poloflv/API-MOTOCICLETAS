import { encryptedPassword, verifyPassword } from "../config/plugins/encripted.password.plugin.js"
import generateJWT from "../config/plugins/generate-jwt.plugin.js"
import { AppError,catchAsync } from "../errors/index.js"
import { UserService } from "./users.service.js"
import { validateLogin,validateRegister } from "./user.schema.js"


const userService = new UserService();

export const login = catchAsync(async(req,res,next) => {
    const {hasError,errorMessages,userData} = validateLogin(req.body)

    if(hasError){
        return res.status(422).json({
            status: 'error',
            message: errorMessages
        })
    }

    const user = await userService.findOneUserByEmail(userData.email)

    if(!user){
        return next(new AppError('This account does not exist',404))
    }

    const isCorrectPassword = await verifyPassword(
        userData.password,
        user.password
    )

    if(!isCorrectPassword){
        return next(new AppError('Incorrect email or password',401))
    }

    const token = await generateJWT(user.id)

    return res.status(200).json({
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        }
    })
})

export const register = catchAsync(async(req,res,next) => {
    const {hasError,errorMessages,userData} = validateRegister(req.body)

    if(hasError){
        return res.status(422).json({
            status: 'error',
            message: errorMessages
        })
    }

    const user = await userService.create(userData)

    const token = await generateJWT(user.id)

    return res.status(201).json({
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        }
    })
})
//TODO: si falla cambiar el findAllUser, el createUser y el findOneUser
export const findAllUser = catchAsync( async(req, res,next) => {
    // try {


        const users = await userService.findAll()

        return res.status(200).json(users)
    // } catch (error) {
    //     return res.status(500).json(error)
    // }
})

export const createUser = catchAsync( async(req,res,next) => {
    // try {
        const user = await userService.create(req.body);

        return res.status(201).json(user)
    // } catch (error) {
    //     return res.status(500).json(error)
    // }
})

export const findOneUser = catchAsync( async(req,res,next) => {
        const {user} = req;

        return res.status(200).json(user)
    // } catch (error) {
    //     return res.status(500).json(error)
    // }
})

export const updateUser = catchAsync( async(req,res,next) => {

        const {user} = req;

        const userUpdated = await userService.update(user, req.body);

        return res.status(200).json(userUpdated)
    // } catch (error) {
    //     return res.status(500).json(error)
    // }
})

export const deleteUser = catchAsync(async(req,res,next) => {

        const { user } = req;

        await userService.delete(user)

        return res.status(204).json(null)

})