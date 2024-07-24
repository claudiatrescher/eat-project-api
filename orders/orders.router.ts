import * as restify from "restify";
import { ModelRouter } from "../common/model-router";
import { Order } from "./orders.model";




class OrderRouter extends ModelRouter<Order>{

    constructor(){
        super(Order)
    }


    envelope(document){
        let resource = super.envelope(document)
        resource._links.orderSummary = `${this.basePath}/order-summary`
        resource._links.restaurant = `${this.basePath}/restaurant`
        return resource
    }

    

   applyRoutes(application: restify.Server) {
       application.get({path: `${this.basePath}/`}, this.findAll)
       application.get({path: `${this.basePath}`}, this.findAll)
       application.get({path: `${this.basePath}/:id`}, [this.validateId, this.findById])
       application.post({path: `${this.basePath}`}, [this.save])
       application.put({path: `${this.basePath}`}, [ this.validateId, this.replace])
       application.patch({path: `${this.basePath}`}, [ this.validateId, this.update])
       application.del({path: `${this.basePath}`}, [ this.validateId, this.delete])


       application.get({path: `${this.basePath}/restaurant`}, this.findAll)
       application.post({path: `${this.basePath}/restaurant`}, this.save)

   }

}

export const ordersRouter = new OrderRouter();

