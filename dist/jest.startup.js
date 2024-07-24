"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const jestCli = require("jest-cli");
const server_1 = require("./server/server");
const enviroment_1 = require("./common/enviroment");
const users_router_1 = require("./users/users.router");
const users_model_1 = require("./users/users.model");
const reviews_model_1 = require("./reviews/reviews.model");
const reviews_router_1 = require("./reviews/reviews.router");
const restaurants_model_1 = require("./restaurants/restaurants.model");
const restaurants_router_1 = require("./restaurants/restaurants.router");
const orders_router_1 = require("./orders/orders.router");
let server;
const beforeAllTests = () => {
    enviroment_1.enviroment.db.url = process.env.DB_URL || 'mongodb://localhost/meat-api-test-db';
    enviroment_1.enviroment.server.port = process.env.SERVER_PORT || 3000;
    server = new server_1.Server();
    return server.bootstrap([users_router_1.usersRouter, restaurants_router_1.restaurantsRouter, reviews_router_1.reviewsRouter, orders_router_1.ordersRouter])
        .then(() => users_model_1.User.findOneAndDelete({}).exec())
        .then(() => {
        let admin = new users_model_1.User();
        admin.name = 'admin';
        admin.email = 'admin@email.com';
        admin.password = '123456';
        return admin.save();
    })
        .then(() => restaurants_model_1.Restaurant.findOneAndDelete({}).exec())
        .then(() => reviews_model_1.Review.findOneAndDelete({}).exec());
};
const afterAllTests = () => {
    return server.shutdown();
};
beforeAllTests()
    .then(() => jestCli.run())
    .then(() => afterAllTests())
    .catch(console.error);
