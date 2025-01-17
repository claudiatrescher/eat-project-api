
import { Router } from "./common/router";
import * as restify from 'restify';

class MainRouter extends Router{
    applyRoutes(application: restify.Server) {
        application.get('/', (req, resp, next)=>{
          resp.json({
            orders: '/orders',
            users: '/users',
            restaurants: '/restaurants',
            reviews: '/restaurants/:id/reviews'

          })
        })
      }

}

export const mainRouter = new MainRouter();