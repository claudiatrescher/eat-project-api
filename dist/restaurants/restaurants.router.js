"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurantsRouter = void 0;
const restify_errors_1 = require("restify-errors");
const model_router_1 = require("../common/model-router");
const restaurants_model_1 = require("./restaurants.model");
class RestaurantsRouter extends model_router_1.ModelRouter {
    constructor() {
        super(restaurants_model_1.Restaurant);
        this.findReview = (req, resp, next) => {
            restaurants_model_1.Restaurant.findById(req.params.id, "+reviews")
                .then(rest => {
                if (!rest) {
                    throw new restify_errors_1.NotFoundError('Restaurant not found');
                }
                else {
                    resp.json(rest.reviews);
                    return next();
                }
            }).catch(next);
        };
        this.replaceReview = (req, resp, next) => {
            restaurants_model_1.Restaurant.findById(req.params.id).then(rest => {
                if (!rest) {
                    throw new restify_errors_1.NotFoundError('Restaurant not found');
                }
                else {
                    rest.menu = req.body;
                    return rest.save();
                }
            }).then(rest => {
                resp.json(rest.reviews);
                return next();
            }).catch(next);
        };
        this.findMenu = (req, resp, next) => {
            restaurants_model_1.Restaurant.findById(req.params.id, "+menu")
                .then(rest => {
                if (!rest) {
                    throw new restify_errors_1.NotFoundError('Restaurant not found');
                }
                else {
                    resp.json(rest.menu);
                    return next();
                }
            }).catch(next);
        };
        this.replaceMenu = (req, resp, next) => {
            restaurants_model_1.Restaurant.findById(req.params.id).then(rest => {
                if (!rest) {
                    throw new restify_errors_1.NotFoundError('Restaurant not found');
                }
                else {
                    rest.menu = req.body;
                    return rest.save();
                }
            }).then(rest => {
                resp.json(rest.menu);
                return next();
            }).catch(next);
        };
    }
    envelope(document) {
        let resource = super.envelope(document);
        resource._links.menu = `${this.basePath}/${resource._id}/menu`;
        resource._links.reviews = `${this.basePath}/${resource._id}/reviews`;
        return resource;
    }
    applyRoutes(application) {
        application.get({ path: `${this.basePath}/` }, this.findAll);
        application.get({ path: `${this.basePath}` }, this.findAll);
        application.get({ path: `${this.basePath}/:id` }, [this.validateId, this.findById]);
        application.post({ path: `${this.basePath}` }, [this.save]);
        application.post({ path: `${this.basePath}/:id` }, [this.save]);
        application.put({ path: `${this.basePath}/:id` }, [this.validateId, this.replace]);
        application.patch({ path: `${this.basePath}/:id` }, [this.validateId, this.update]);
        application.del({ path: `${this.basePath}/:id` }, [this.validateId, this.delete]);
        application.get({ path: `${this.basePath}/:id/menu` }, [this.validateId, this.findMenu]);
        application.post({ path: `${this.basePath}/:id/menu` }, [this.save]);
        application.patch({ path: `${this.basePath}/:id/menu` }, [this.validateId, this.replaceMenu]);
        application.put({ path: `${this.basePath}/:id/menu` }, [this.validateId, this.replaceMenu]);
        application.get({ path: `${this.basePath}/:id/reviews` }, [this.validateId, this.findReview]);
        application.post({ path: `${this.basePath}/:id/reviews` }, [this.save]);
        application.patch({ path: `${this.basePath}/:id/reviews` }, [this.validateId, this.replaceReview]);
        application.put({ path: `${this.basePath}/:id/reviews` }, [this.validateId, this.replaceReview]);
    }
}
exports.restaurantsRouter = new RestaurantsRouter();
