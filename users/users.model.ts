import * as mongoose from 'mongoose'
import {validateCPF} from '../common/validators'
import * as bcrypt from 'bcrypt'
import { enviroment } from '../common/enviroment'

export interface User extends mongoose.Document{
    _id: mongoose.Schema.Types.ObjectId,
    id: string,
    name: string,
    email: string,
    password: string,
    cpf: string,
    gender: string,
    matches(password: string): boolean,
    
}

export interface UserModel extends mongoose.Model<User>{
    findByEmail(email: string, projection?: string): Promise<User>
}


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 80,
        minlength: 3
    },
    email: {
        type: String,
        unique: true,
        match: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
        required: true

    },
    password: {
        type: String,
        select: false,
        required: true
    },
    gender: {
        type: String,
        required: false,
        enum: ['Male', 'Female']
    },
    cpf:{
        type: String,
        required: false,
        validate: {
            validator: validateCPF ,
            message: '{PATH} Invalid CPF ({VALUE})'
        }
    }
})


userSchema.statics.findByEmail = function(email: string, projection: string){
    return this.findOne({email}, projection) //{email:email}
}

userSchema.methods.matches = function(password: string): boolean {
    return bcrypt.compareSync(password, this.password)

}



const hashPassword = (obj, next) => {
    bcrypt.hash(obj.password, enviroment.security.saltRounds)
    .then(hash => {
        obj.password = hash
        next()
    }).catch(next)

}

const saveMiddleware = function(next){
    const user: User = this
    if(!user.isModified('password')){
        next()
    }else{
       hashPassword(user, next)
    }
}

const updateMiddleware = function(next){
    if(!this.getUpdate().password){
        next()
    }else{
        hashPassword(this.getUpdate(), next)

    }
}

userSchema.pre('save', saveMiddleware )
userSchema.pre('findOneAndUpdate', updateMiddleware )
userSchema.pre('findOneAndReplace', updateMiddleware)

export const User = mongoose.model<User, UserModel>('User', userSchema)