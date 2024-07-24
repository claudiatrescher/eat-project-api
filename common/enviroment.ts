import { User } from "../users/users.model";


export const enviroment ={
    server: {port: process.env.SERVER_PORT || 3000 },
    db: {url: process.env.DB_URL || 'mongodb://localhost/meat-api'},
    security: {
        saltRounds: process.env.SALT_ROUNDS || 10,
        apiSecret: process.env.API_SECRET || 'meat-api-secret',
        
    },
    user: {
        user: process.env.USER || User["email"],
        password: process.env.PASSWORD || User["password"]
    }
   
}





