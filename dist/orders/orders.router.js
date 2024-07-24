"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordersRouter = void 0;
const model_router_1 = require("../common/model-router");
const orders_model_1 = require("./orders.model");
class OrderRouter extends model_router_1.ModelRouter {
    constructor() {
        super(orders_model_1.Order);
    }
    envelope(document) {
        let resource = super.envelope(document);
        resource._links.orderSummary = `${this.basePath}/order-summary`;
        resource._links.restaurant = `${this.basePath}/restaurant`;
        return resource;
    }
    applyRoutes(application) {
        application.get({ path: `${this.basePath}/` }, this.findAll);
        application.get({ path: `${this.basePath}` }, this.findAll);
        application.get({ path: `${this.basePath}/:id` }, [this.validateId, this.findById]);
        application.post({ path: `${this.basePath}` }, [this.save]);
        application.put({ path: `${this.basePath}` }, [this.validateId, this.replace]);
        application.patch({ path: `${this.basePath}` }, [this.validateId, this.update]);
        application.del({ path: `${this.basePath}` }, [this.validateId, this.delete]);
        application.get({ path: `${this.basePath}/restaurant` }, this.findAll);
        application.post({ path: `${this.basePath}/restaurant` }, this.save);
    }
}
exports.ordersRouter = new OrderRouter();
