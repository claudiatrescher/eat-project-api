import { NotFoundError } from "restify-errors";
import { ModelRouter } from "../common/model-router";
import * as restify from 'restify'
import { Restaurant, Restaurant1 } from "./restaurants.model";



class RestaurantsRouter extends ModelRouter<Restaurant1>{
    constructor(){
        super(Restaurant)
    }


    envelope(document){
        let resource = super.envelope(document)
        resource._links.menu = `${this.basePath}/${resource._id}/menu`
        resource._links.reviews = `${this.basePath}/${resource._id}/reviews`
        return resource
        
    }


    findReview =(req, resp, next) => {
        Restaurant.findById(req.params.id, "+reviews")
        .then(rest => {
            if(!rest){
                throw new NotFoundError('Restaurant not found')
            }else{
                resp.json(rest.reviews)
                return next()
            }
        }).catch(next)
    }

    replaceReview =(req, resp, next) => {
        Restaurant.findById(req.params.id).then(rest => {
            if(!rest){
                throw new NotFoundError('Restaurant not found')
            }else{
                rest.menu = req.body
                return rest.save()
            }

        }).then(rest => {
            resp.json(rest.reviews)
            return next()

        }).catch(next)
    }

    findMenu = (req, resp, next) => {
        Restaurant.findById(req.params.id, "+menu")
                .then(rest => {
                    if(!rest){
                        throw new NotFoundError('Restaurant not found')
                    }else{
                        resp.json(rest.menu)
                        return next()
                    }

                }).catch(next)
    }


    replaceMenu =(req, resp, next) => {
        Restaurant.findById(req.params.id).then(rest => {
            if(!rest){
                throw new NotFoundError('Restaurant not found')
            }else{
                rest.menu = req.body
                return rest.save()
            }

        }).then(rest => {
            resp.json(rest.menu)
            return next()

        }).catch(next)
    }

    applyRoutes(application: restify.Server){
        application.get({path: `${this.basePath}/`}, this.findAll)
        application.get({path: `${this.basePath}`}, this.findAll)
        application.get({path: `${this.basePath}/:id`}, [this.validateId, this.findById])

        application.post({path: `${this.basePath}`}, [this.save])
        application.post({path: `${this.basePath}/:id`}, [this.save])
        application.put({path: `${this.basePath}/:id`}, [ this.validateId, this.replace])
        application.patch({path: `${this.basePath}/:id`}, [ this.validateId, this.update])
        application.del({path: `${this.basePath}/:id`}, [ this.validateId, this.delete])
    
        application.get({path: `${this.basePath}/:id/menu`}, [this.validateId, this.findMenu])
        application.post({path: `${this.basePath}/:id/menu`}, [ this.save])
        application.patch({path: `${this.basePath}/:id/menu`}, [ this.validateId, this.replaceMenu])
        application.put({path: `${this.basePath}/:id/menu`}, [ this.validateId, this.replaceMenu])


        application.get({path: `${this.basePath}/:id/reviews`}, [this.validateId, this.findReview])
        application.post({path: `${this.basePath}/:id/reviews`}, [ this.save])
        application.patch({path: `${this.basePath}/:id/reviews`}, [this.validateId, this.replaceReview])
        application.put({path: `${this.basePath}/:id/reviews`}, [this.validateId, this.replaceReview])



        
      }
}


export const restaurantsRouter = new RestaurantsRouter()
