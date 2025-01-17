import * as restify from 'restify'
import * as mongoose from 'mongoose'
import { ModelRouter } from '../common/model-router'
import { Review } from './reviews.model'




class ReviewsRouter extends ModelRouter<Review>{
    constructor(){
        super(Review)
    }


    protected prepareOne(query: mongoose.Query<Review,Review>): mongoose.Query<Review,Review>{
        return query.populate('user', 'name')
                .populate('restaurant', 'name')
      }


      envelope(document){
        let resource = super.envelope(document)
        const restId = document.restaurant._id ? document.restaurant._id :   document.restaurant
        resource._links.restaurant = `/restaurants/${restId}`
        return resource
        
    }  


   

    // findById = (req,resp,next) =>{
    //     this.model.findById(req.params.id)
    //             .populate('user', 'name')
    //             .populate('restaurant', 'name')
    //             .then(this.render( resp , next))
    //             .catch(next)

    // }

    applyRoutes(application:restify.Server){
        
        application.get({path: `${this.basePath}`}, this.findAll)
        application.get({path: `${this.basePath}/`}, this.findAll)
        application.get({path: `${this.basePath}/:id`}, [this.validateId, this.findById])
        application.post({path: `${this.basePath}`}, [ this.save])
    }

}
        export const reviewsRouter = new ReviewsRouter()