"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enviroment = void 0;
const users_model_1 = require("../users/users.model");
exports.enviroment = {
    server: { port: process.env.SERVER_PORT || 3000 },
    db: { url: process.env.DB_URL || 'mongodb://localhost/meat-api' },
    security: {
        saltRounds: process.env.SALT_ROUNDS || 10,
        apiSecret: process.env.API_SECRET || 'meat-api-secret',
    },
    user: {
        user: process.env.USER || users_model_1.User["email"],
        password: process.env.PASSWORD || users_model_1.User["password"]
    }
};
