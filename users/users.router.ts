
import { ModelRouter } from "../common/model-router";
import * as restify from 'restify'
import { User } from "./users.model";
import { authenticate } from "../security/auth.handler";
import Mail from "../services/mail"





class UsersRouter extends ModelRouter<User>{

    
    constructor(){
        super(User)
        this.on('beforeRender', document => {
            document.password = undefined
        })
    }

    findByEmail = (req, resp, next) => {
        if(req.query.email){
            User.findByEmail(req.query.email)
            .then(user=>{
                if(user){
                    return [user]
                }else{
                    return []
                }
            })
            .then(this.renderAll(resp,next , {
                pageSize: this.pageSize,
                url: req.url
            }))
            .catch(next)
            
        }else{
            next()
        }
    }

    enviarEmail = ( req, res, next)=> {

        const { to, subject, message } = req.body;

        Mail.to  = to;
        Mail.subject = subject;
        Mail.message = message;

         Mail.sendMail();

        res.status(200).json({'message': "Email enviado com sucesso"})



    }
    


    applyRoutes(application:restify.Server){
        
        
        application.get({path: `${this.basePath}`}, [
            this.findByEmail, 
            this.findAll])
            
            application.get({path: `${this.basePath}/`}, [ this.findAll])
            application.get({path: `${this.basePath}/:id`}, [ this.validateId, this.findById])
            application.post({path: `${this.basePath}`}, [ this.save, this.enviarEmail])
            application.put({path: `${this.basePath}/:id`}, [ this.validateId, this.replace])
            application.patch({path: `${this.basePath}/:id`}, [this.validateId, this.update])
            application.del({path: `${this.basePath}/id`}, [ this.validateId, this.delete] )
            
            
            
            application.post(`${this.basePath}/authenticate`,authenticate)
           
        }
                                                
}

export const usersRouter = new UsersRouter()

