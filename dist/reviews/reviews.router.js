"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewsRouter = void 0;
const model_router_1 = require("../common/model-router");
const reviews_model_1 = require("./reviews.model");
class ReviewsRouter extends model_router_1.ModelRouter {
    constructor() {
        super(reviews_model_1.Review);
    }
    prepareOne(query) {
        return query.populate('user', 'name')
            .populate('restaurant', 'name');
    }
    envelope(document) {
        let resource = super.envelope(document);
        const restId = document.restaurant._id ? document.restaurant._id : document.restaurant;
        resource._links.restaurant = `/restaurants/${restId}`;
        return resource;
    }
    // findById = (req,resp,next) =>{
    //     this.model.findById(req.params.id)
    //             .populate('user', 'name')
    //             .populate('restaurant', 'name')
    //             .then(this.render( resp , next))
    //             .catch(next)
    // }
    applyRoutes(application) {
        application.get({ path: `${this.basePath}` }, this.findAll);
        application.get({ path: `${this.basePath}/` }, this.findAll);
        application.get({ path: `${this.basePath}/:id` }, [this.validateId, this.findById]);
        application.post({ path: `${this.basePath}` }, [this.save]);
    }
}
exports.reviewsRouter = new ReviewsRouter();
