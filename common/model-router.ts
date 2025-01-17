import { Router } from "./router";
import { NotFoundError } from "restify-errors";
import * as mongoose from 'mongoose';



export abstract class ModelRouter<D extends mongoose.Document> extends Router{

    basePath: string

    pageSize: number



    constructor(protected model: mongoose.Model<D>){
        super()
        this.basePath = `/${model.collection.name}` 

    }

    //VERSÃO DE AGORA NÃO POSSUI MAIS O DOCUMENTQUERY

    protected prepareOne(query: mongoose.Query<D,D>): mongoose.Query<D,D>{
        return query
      }


    envelope(document: any): any{
        let resource = Object.assign({_links:{}}, document.toJSON())
        resource._links.self = `${this.basePath}/${resource._id}` 
        return resource
        

    }  

    envelopeAll(documents: any[],  options: any= {}): any {
        const resource: any ={
            _links: {
                self: `${options.url}`
            },
            item: documents

        }

        if(options.page && options.count && options.pageSize){
            if(options.page > 1){
                resource._links.previous = `${this.basePath}?_page=${options.page-1}`
            }
            const remaining  =  options.count - (options.page * options.pageSize)
            if(remaining > 0){
                resource._links.next = `${this.basePath}?_page=${options.page+1}`
            }
        }
        return resource

    }

    validateId = (req, resp, next) => {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            next(new NotFoundError('Document not found'))
        }else{
            next();
        }
    }

   findAll = (req, resp, next)=>{
    let page = parseInt(req.query._page || 1)
    page = page > 0 ? page : 1

    const skip = (page - 1) * this.pageSize

    this.model.countDocuments({}).exec()
              .then(count =>this.model.find()
                     .skip(skip)
                     .limit(this.pageSize)
                     .then(this.renderAll( resp , next, {page, count, pageSize: this.pageSize, url: req.url

                     })))

    } 


    
    





    
    findById = (req,resp,next) =>{
        this.prepareOne(this.model.findById(req.params.id))
                .then(this.render( resp , next))
                .catch(next)

    }

    save = (req, resp,next)=>{
        let document = new this.model(req.body)
        document.save().then(this.render( resp , next))
        .catch(next)

    }

    replace = (req, resp, next) =>{
        const options = {runValidators: true, overwrite: true}
        this.model.findOneAndReplace({_id: req.params.id}, req.body, options)
            .exec().then((result: any)=> {
                if(result && result.n){
                    return this.model.findById(req.params.id).exec();
                } else{
                    throw new NotFoundError('Documento não encontrado')
                }
            }).then(this.render( resp , next))
            .catch(next)
    }

    update = (req ,resp ,next) =>{
        const options = {runValidators: true, new: true}
        this.model.findByIdAndUpdate(req.params.id, req.body, options)
                    .then(this.render( resp , next))
                    .catch(next)
    }

    delete = (req, resp, next)=>{
        this.model.findOneAndDelete({_id:req.params.id}).exec().then((cmdResult: any)=>{
          if(cmdResult.result.n){
            resp.send(204)
          }else{
            throw new NotFoundError('Documento não encontrado')
          }
          return next()
        }).catch(next)
      }

}

