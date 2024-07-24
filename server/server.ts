
import * as restify from 'restify'
import mongoose, { ConnectOptions } from 'mongoose'

import { enviroment } from '../common/enviroment'
import {Router} from '../common/router'
import { mergePatchBodyParser } from './merge-patch.parser'
import { handleError } from './error.handler'
import * as corsMiddleware from 'restify-cors-middleware'
import Mail = require('nodemailer/lib/mailer')

export class Server{

    application: restify.Server
    
    initializeDb() {
        mongoose.Promise = global.Promise
        return mongoose.connect(enviroment.db.url, {
         
        } as ConnectOptions)


    }

    initRoutes(routers: Router[]): Promise<any>{
        return new Promise((resolve, reject) =>{
            try{

                this.application =  restify.createServer({
                    name: 'meat-api',
                    version: '1.0.0',
                })
                

                

                const corsOptions: corsMiddleware.Options = {
                    preflightMaxAge: 10, 
                    origins: ['http://localhost:4200'],
                    allowHeaders: [ 'Content-Type', 'Authorization'],
                    exposeHeaders: ['x-custom-header']  
                };

                const cors: corsMiddleware.CorsMiddleware = corsMiddleware(corsOptions)

                this.application.pre(cors.preflight)
                
              

              
                this.application.use(cors.actual)
                this.application.use(restify.plugins.queryParser())
                this.application.use(restify.plugins.bodyParser())
                this.application.use(mergePatchBodyParser)
        

                for(let router of routers){
                    router.applyRoutes(this.application)
                }

                this.application.listen(enviroment.server.port, ()=>{
                    resolve(this.application)
                })

                this.application.on('restifyError', handleError )
                

            }catch(error){
                reject(error)
            }
        })
    }
    bootstrap(routers: Router[] = []): Promise<Server>{
        return this.initializeDb().then(()=> 
            this.initRoutes(routers).then(() => this)) 
    }

    shutdown(){
        return mongoose.disconnect().then(() => this.application.close())
    }

    
}




