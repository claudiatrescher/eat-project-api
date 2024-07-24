import 'jest'
import * as jestCli from 'jest-cli'

import {Server} from './server/server';
import { enviroment } from './common/enviroment';
import {usersRouter} from './users/users.router';
import { User } from './users/users.model';
import { Review } from './reviews/reviews.model';
import { reviewsRouter } from './reviews/reviews.router';
import { Restaurant } from './restaurants/restaurants.model';
import { restaurantsRouter } from './restaurants/restaurants.router';
import { ordersRouter } from './orders/orders.router';


let server: Server

const beforeAllTests = () => {
    enviroment.db.url = process.env.DB_URL || 'mongodb://localhost/meat-api-test-db'
    enviroment.server.port =process.env.SERVER_PORT || 3000
    server = new Server()
    return server.bootstrap([usersRouter, restaurantsRouter, reviewsRouter, ordersRouter])
            .then(() => User.findOneAndDelete({}).exec())
            .then(() => {
                let admin = new User()
                admin.name = 'admin'
                admin.email = 'admin@email.com'
                admin.password = '123456'
                
                return admin.save()
            })

            .then(() => Restaurant.findOneAndDelete({}).exec())
            .then(() => Review.findOneAndDelete({}).exec())

}


const afterAllTests = () => {
    return server.shutdown()
    
}

beforeAllTests()
.then(() => jestCli.run())
.then(() => afterAllTests())
.catch(console.error)